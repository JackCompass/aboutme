import Header from "../../components/header/Header";
import styles from "../../styles/Posts.module.css";
import Discoveries from "../../components/discoveries/Discoveries";

const Posts = () => {
    return (
        <>
            <Header>
                <div className={styles.section__info}>
                    <h1 className={styles.section__title}>Discoveries</h1>
                    <p className={styles.section_description}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos enim exercitationem fugit ipsum magnam nihil recusandae sed vitae voluptates. Asperiores corporis debitis eos id inventore placeat tenetur voluptate. Deleniti, impedit.</p>
                </div>
                <Discoveries/>
            </Header>
        </>
    )
}

export default Posts;