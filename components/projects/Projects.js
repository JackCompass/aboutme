import styles from "./Projects.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useProjects from "./useProjects";
import Link from "next/link";

const Projects = ({fileContents}) => {
    const {} = useProjects()
    return (
        <>
            <div className={styles.author__projects}>
                {fileContents.length !== 0 ?
                    <>
                        {fileContents.map((fileContent, index) => {
                            return (
                                <div key={index}>
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {fileContent.length !== 0 ? fileContent.data : ""}
                                    </ReactMarkdown>
                                    <Link href={`/projects/${extractFileName(fileContent.filename)}`}><a>[...]</a></Link>
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

const extractFileName = (filePath) => {
    const filename = filePath.split('/').at(-1).split('.').at(0);
    console.log(filename);
    return filename;
}