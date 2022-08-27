import styles from "../../styles/ProjectModels.module.css";
import Header from "../../components/header/Header";
import Projects from "../../components/projects/Projects";
import {useRecoilValue} from "recoil";
import {filesData} from "../../state/atom";

const ProjectModels = () => {
    const getFilesData = useRecoilValue(filesData);
    return (
        <>
            <Header>
                <div className={styles.section__info}>
                    <h1 className={styles.section__title}>Projects</h1>
                    <p className={styles.section__description}>
                        Take a look at some of the projects I have developed. Few of them still might be in development.
                        Most of the projects I developed in my free time.
                        Feel free to raise a PR or an Issue. If you have any suggestions, feel free to reach out to me.
                    </p>
                </div>
                <Projects fileContents={getFilesData}/>
            </Header>
        </>
    )
}

export default ProjectModels;