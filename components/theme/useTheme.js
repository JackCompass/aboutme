import { useEffect } from "react";
import { flushSync } from "react-dom";
import { useRecoilState } from "recoil";
import { themeState } from "../../state/atom";

export const THEME_STORAGE_KEY = "theme";

export const resolveTheme = () => {
  if (typeof window === "undefined") {
    return "dark";
  }

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return "dark";
};

const applyTheme = theme => {
  document.documentElement.setAttribute("data-theme", theme);
};

const useTheme = () => {
  const [theme, setTheme] = useRecoilState(themeState);

  useEffect(() => {
    const initialTheme = resolveTheme();
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, [setTheme]);

  const toggleTheme = event => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    const commit = () => {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      applyTheme(nextTheme);
      flushSync(() => setTheme(nextTheme));
    };

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!document.startViewTransition || reduceMotion || !event) {
      commit();
      return;
    }

    // Wipe outward from the toggle's center so keyboard presses work too.
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    // Set the wipe geometry before the transition starts so the CSS animation
    // clips the new snapshot from its very first frame (no flash of new theme).
    const root = document.documentElement;
    root.style.setProperty("--wipe-x", `${x}px`);
    root.style.setProperty("--wipe-y", `${y}px`);
    root.style.setProperty("--wipe-r", `${radius}px`);
    root.dataset.themeWipe = "";

    document.startViewTransition(commit).finished.finally(() => {
      delete root.dataset.themeWipe;
    });
  };

  return { theme, toggleTheme };
};

export default useTheme;
