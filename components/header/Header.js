import styles from "./Header.module.css";

const Header = (props) => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.author}>
                        <h3>Anuj Singh</h3>
                    </div>
                    <div className={styles.navigation}>
                        <h4>Projects</h4>
                        <h4>Discoveries</h4>
                    </div>
                </div>
                {props.children}
            </div>
        </>
    )
}

export default Header;