import styles from "./Projects.module.css";
import useProject from "./useProject";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {useRecoilValue} from "recoil";
import {filesData} from "../../state/atom";

const Projects = () => {

    const {} = useProject();
    const fileContents = useRecoilValue(filesData);

    return (
        <>
            <div className={styles.author__projects}>
                {fileContents.length !== 0 ?
                    <>
                        {fileContents.map((fileContent, index) => {
                            return (
                                <div key={index}>
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {fileContents.length !== 0 ? fileContents[index] : ""}
                                    </ReactMarkdown>
                                </div>
                            )
                        })}

                    </>
                    : ""}
            </div>
        </>
    )
}

export default Projects;