import styles from "./About.module.css";
import Projects from "../projects/Projects";
import Discoveries from "../discoveries/Discoveries";
import useAbout from "./useAbout";
import Link from "next/link";

const About = () => {
  const {
    previewContent,
    previewContentError,
    discoveriesContent,
    discoveriesContentError,
  } = useAbout();

  return (
    <>
      <div className={styles.author}>
        <div className={styles.image_container} />
        <div>
          <p className={styles.author__description}>
            Hey, I am Anuj Singh. I am a software engineer by profession. I either build or break stuff all the time
            and sometimes I write about them too.
          </p>
          <div className={styles.author__social_links}>
            <Link href={"https://linkedin.com/in/anujsingh1729/"}>
              <a target={"_blank"}>Linkedin</a>
            </Link>
            <Link href={"https://github.com/JackCompass"}>
              <a target={"_blank"}>GitHub</a>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.author__work}>
        <h2 className={styles.author__section_title}>Work</h2>
        <ul>
          <li>Software Engineer @Roro - Present</li>
          <li>Techops Engineer @PayTm - 2021 - 2022</li>
          <li>Freelancing - 2021-2022</li>
          <li>The Spark foundation - 6/2021 - 7/2021</li>
        </ul>
      </div>
      <div>
        <h2 className={styles.author__section_title}>Projects</h2>
        <Projects
          fileContents={previewContent}
          fileError={previewContentError}
        />
      </div>

      <div>
        <h2 className={styles.author__section_title}>Discoveries</h2>
        <Discoveries
          fileContents={discoveriesContent}
          fileError={previewContentError}
        />
      </div>
    </>
  );
};

export default About;
