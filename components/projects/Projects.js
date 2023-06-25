import styles from "./Projects.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useProjects from "./useProjects";
import Link from "next/link";
import { extractFileName } from "../../state/utility";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Projects = ({ fileContents, fileError }) => {
  const {} = useProjects();

  if (fileContents === undefined && fileError === undefined) {
    // if both the parameters are undefined, then the data is still loading.
    // In such case we will show shimmer effect.
    return (
      <div className={styles.author__projects}>
        <Skeleton height={200} count={2} />
        <Skeleton height={200} count={2} />
      </div>
    );
  } else if (fileError) {
    throw new Error("Error while fetching projects data");
  } else {
    return (
      <>
        <div className={styles.author__projects}>
          {fileContents.length !== 0 ? (
            <>
              {fileContents.map((fileContent, index) => {
                return (
                  <div key={index}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {fileContent.length !== 0 ? fileContent.data : ""}
                    </ReactMarkdown>
                    <Link
                      className={"navigate-link"}
                      href={`/projects/${extractFileName(
                        fileContent.filename,
                      )}`}>
                      <a>[...]</a>
                    </Link>
                  </div>
                );
              })}
            </>
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
};

export default Projects;
