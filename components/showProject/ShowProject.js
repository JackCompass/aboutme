import styles from "./ShowProject.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ShowProject = ({fileContent}) => {
    return (
        <>
            <div className={styles.author__project}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {fileContent.data}
                </ReactMarkdown>
            </div>
        </>
    )
}

export default ShowProject;