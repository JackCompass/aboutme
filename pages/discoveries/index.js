import Header from "../../components/header/Header";
import styles from "../../styles/Posts.module.css";
import Discoveries from "../../components/discoveries/Discoveries";
import useDiscoveries from "../../components/discoveries/useDiscoveries";

const Posts = () => {
  const { getDiscoveryFilesData } = useDiscoveries();

  return (
    <>
      <Header>
        <div className={styles.section__info}>
          <h1 className={styles.section__title}>Discoveries</h1>
          <p className={styles.section__description}>
            In my free time I like to read, create and tinker with new
            technologies. Sometimes I find myself finding some patterns,
            techniques and ideas that I can leverage in my work. I like to share
            them with others so that they can benefit from them.
          </p>
          <p>P.S. My future self can also remember it. 😶</p>
        </div>
        <Discoveries fileContents={getDiscoveryFilesData} fileError={null} />
      </Header>
    </>
  );
};

export default Posts;
