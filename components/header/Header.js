import styles from "./Header.module.css";
import Link from "next/link";
import useHeader from "./useHeader";

const Header = props => {
  const {} = useHeader();

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
            <Link href={"/projects"} className={styles.nav__link}>
              Projects
            </Link>
            <Link href={"/discoveries"} className={styles.nav__link}>
              Discoveries
            </Link>
          </div>
        </div>
        {props.children}
      </div>
    </>
  );
};

export default Header;
