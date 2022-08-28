import styles from "./About.module.css";
import Image from "next/image";
import Projects from "../projects/Projects";
import Discoveries from "../discoveries/Discoveries";
import {useRecoilValue} from "recoil";
import {discoveryFilesData, filesPreviewData} from "../../state/atom";
import useAbout from "./useAbout";
import Link from "next/link";

const About = () => {

    const {} = useAbout()
    const getFilePreviewData = useRecoilValue(filesPreviewData);
    const getDiscoverFilesData = useRecoilValue(discoveryFilesData);

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
                <div>
                    <p className={styles.author__description}>
                        Hey, I am Anuj Singh. I am a software engineer by profession.
                        I build neat things and sometimes I write about them too.
                    </p>
                    <div className={styles.author__social_links}>
                        <Link href={"https://linkedin.com/in/anujsingh1729/"}><a target={"_blank"}>Linkedin</a></Link>
                        <Link href={"https://github.com/JackCompass"}><a target={"_blank"}>GitHub</a></Link>

                    </div>
                </div>
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
                <Projects fileContents={getFilePreviewData}/>
            </div>

            <div>
                <h2 className={styles.author__section_title}>Discoveries</h2>
                <Discoveries fileContents={getDiscoverFilesData}/>
            </div>
        </>
    )
}

export default About;