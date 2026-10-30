import styles from "./Header.module.css";
import Link from "next/link";
import useHeader from "./useHeader";

const SunIcon = () => (
  <svg
    className={styles.theme__icon}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg
    className={styles.theme__icon}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true">
    <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3a7 7 0 0 0 11.5 11.5z" />
  </svg>
);

const Header = props => {
  const { theme, toggleTheme, replaceSectionNav } = useHeader();
  const isDark = theme === "dark";

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.author}>
            <Link href={"/"} className={styles.author__link}>
              <h3 className={styles.author__name}>Anuj Singh</h3>
            </Link>
          </div>
          <div className={styles.navigation}>
            <Link
              href={"/projects"}
              replace={replaceSectionNav}
              className={styles.nav__link}>
              Projects
            </Link>
            <Link
              href={"/discoveries"}
              replace={replaceSectionNav}
              className={styles.nav__link}>
              Discoveries
            </Link>
            <button
              type="button"
              className={styles.theme__toggle}
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              title={isDark ? "Switch to light theme" : "Switch to dark theme"}>
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>
        {props.children}
      </div>
    </>
  );
};

export default Header;
