import styles from "./Projects.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useProjects from "./useProjects";

const Projects = ({fileContents}) => {
    const {} = useProjects()
    console.log("Here is the fileContents: ", fileContents);
    return (
        <>
            <div className={styles.author__projects}>
                {fileContents.length !== 0 ?
                    <>
                        {fileContents.map((fileContent, index) => {
                            return (
                                <div key={index}>
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {fileContents.length !== 0 ? fileContents[index].data : ""}
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