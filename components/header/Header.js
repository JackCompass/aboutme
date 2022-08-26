import styles from "./Header.module.css";
import Link from "next/link";

const Header = (props) => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.author}>
                        <Link href={"/"}><h3 className={"link"}>Anuj Singh</h3></Link>
                    </div>
                    <div className={styles.navigation}>
                        <Link href={"/projects"}><h4 className={"link"}>Projects</h4></Link>
                        <Link href={"/discoveries"}><h4 className={"link"}>Discoveries</h4></Link>
                    </div>
                </div>
                {props.children}
            </div>
        </>
    )
}

export default Header;