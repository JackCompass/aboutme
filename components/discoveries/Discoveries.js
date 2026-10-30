import styles from "./Discoveries.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { extractFileName } from "../../state/utility";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Discoveries = ({ fileContents, fileError }) => {
  if (fileError) {
    throw new Error("Error while fetching discoveries data");
  }

  // TEMP DEBUG: always show skeleton so gap can be verified without racing a fast load. REVERT THIS.
  return (
    <div className={styles.author__discoveries}>
      <Skeleton height={200} />
      <Skeleton height={200} />
    </div>
  );

  if (fileContents === undefined) {
    return (
      <div className={styles.author__discoveries}>
        <Skeleton height={200} />
        <Skeleton height={200} />
      </div>
    );
  }

  return (
    <>
      <div className={styles.author__discoveries}>
        {fileContents.length !== 0 ? (
          <>
            {fileContents.map((fileContent, index) => {
              return (
                <div key={index}>
                  <div className={styles.author__discovery}>
                    <Link
                      href={`/discoveries/${extractFileName(
                        fileContent.filename,
                      )}`}>
                      <a>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {fileContent.length !== 0 ? fileContent.data : ""}
                        </ReactMarkdown>
                      </a>
                    </Link>
                  </div>
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
};

export default Discoveries;
