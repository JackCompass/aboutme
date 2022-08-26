import styles from "./About.module.css";
import Image from "next/image";
import Projects from "../projects/Projects";
import Discoveries from "../discoveries/Discoveries";

const About = () => {
    return (
        <>
            <div className={styles.author}>
                <div className={styles.image_container}>
                    <Image
                        src={"/bruce_wayne.webp"}
                        height={"120px"}
                        width={"120px"}
                        alt={"author image"}/>

                </div>
                <p className={styles.author__description}>
                    lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua.
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
                <Projects />
            </div>

            <div>
                <h2 className={styles.author__section_title}>Discoveries</h2>
                <Discoveries />
            </div>
        </>
    )
}

export default About;