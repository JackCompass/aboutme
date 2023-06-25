import styles from "./Discoveries.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { extractFileName } from "../../state/utility";
import Skeleton from "react-loading-skeleton";

const Discoveries = ({ fileContents, fileError }) => {
  if (fileContents === undefined && fileError === undefined) {
    return (
      <div className={styles.author__discoveries}>
        <Skeleton height={200} count={2} />
      </div>
    );
  } else if (fileError) {
    throw new Error("Error while fetching discoveries data");
  } else {
    return (
      <>
        <div className={styles.author__discoveries}>
          {fileContents.length !== 0 ? (
            <>
              {fileContents.map((fileContent, index) => {
                return (
                  <div key={index}>
                    <div className={styles.author__discovery}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {fileContent.length !== 0 ? fileContent.data : ""}
                      </ReactMarkdown>
                    </div>
                    <Link
                      className={"navigate"}
                      href={`/discoveries/${extractFileName(
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

export default Discoveries;
