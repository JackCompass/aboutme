import { useEffect } from "react";
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

  const toggleTheme = () => {
    setTheme(current => {
      const nextTheme = current === "dark" ? "light" : "dark";
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      applyTheme(nextTheme);
      return nextTheme;
    });
  };

  return { theme, toggleTheme };
};

export default useTheme;
