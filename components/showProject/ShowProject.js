import styles from "./ShowProject.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ShowProject = ({ fileContent, morphKey }) => {
  return (
    <>
      <div className={styles.author__project} data-morph={morphKey}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {fileContent.data}
        </ReactMarkdown>
      </div>
    </>
  );
};

export default ShowProject;
