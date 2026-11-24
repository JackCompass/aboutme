import styles from "./Projects.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useProjects from "./useProjects";
import TransitionLink from "../transitionLink/TransitionLink";
import { extractFileName } from "../../state/utility";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Projects = ({ fileContents, fileError }) => {
  const {} = useProjects();

  if (fileError) {
    throw new Error("Error while fetching projects data");
  }

  // The data has not arrived yet, so show the shimmer effect.
  if (fileContents === undefined) {
    return (
      <div className={styles.author__projects}>
        <Skeleton height={200} />
        <Skeleton height={200} />
        <Skeleton height={200} />
        <Skeleton height={200} />
      </div>
    );
  } else {
    return (
      <>
        <div className={styles.author__projects}>
          {fileContents.length !== 0 ? (
            <>
              {fileContents.map((fileContent, index) => {
                const href = `/projects/${extractFileName(
                  fileContent.filename,
                )}`;
                return (
                  <div key={index}>
                    <TransitionLink
                      className={"navigate-link"}
                      href={href}
                      data-morph={href}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {fileContent.length !== 0 ? fileContent.data : ""}
                      </ReactMarkdown>
                    </TransitionLink>
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
