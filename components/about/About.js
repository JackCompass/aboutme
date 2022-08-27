import styles from "./About.module.css";
import Image from "next/image";
import Projects from "../projects/Projects";
import Discoveries from "../discoveries/Discoveries";
import {useRecoilValue} from "recoil";
import {filesPreviewData} from "../../state/atom";
import useAbout from "./useAbout";

const About = () => {

    const {} = useAbout()
    const getFilePreviewData = useRecoilValue(filesPreviewData);

    return (
        <>
            <div className={styles.author}>
                <div className={styles.image_container}>
                    <Image
                        className={styles.image}
                        src={"/author_metro.jpg"}
                        height={"120px"}
                        width={"120px"}
                        alt={"author image"}/>

                </div>
                <p className={styles.author__description}>
                    Hey, I am Anuj Singh. I am a software engineer by profession.
                    I build neat things and sometimes I write about them too.
                </p>
            </div>
            <div className={styles.author__work}>
                <h2 className={styles.author__section_title}>Work</h2>
                <ul>
                    <li>Software Engineer @Roro - Present</li>
                    <li>Techops Engineer @PayTm - 1/2022 - 3/2022</li>
                    <li>Freelancing - 2021-2022</li>
                    <li>The Spark foundation - 6/2021 - 7/2021</li>
                </ul>
            </div>
            <div>
                <h2 className={styles.author__section_title}>Projects</h2>
                <Projects fileContents={getFilePreviewData} />
            </div>

            <div>
                <h2 className={styles.author__section_title}>Discoveries</h2>
                <Discoveries />
            </div>
        </>
    )
}

export default About;