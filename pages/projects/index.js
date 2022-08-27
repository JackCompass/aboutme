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
                    <p className={styles.section__description}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos enim exercitationem fugit ipsum magnam nihil recusandae sed vitae voluptates. Asperiores corporis debitis eos id inventore placeat tenetur voluptate. Deleniti, impedit.</p>
                </div>
                <Projects fileContents={getFilesData}/>
            </Header>
        </>
    )
}

export default ProjectModels;