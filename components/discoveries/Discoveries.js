import styles from './Discoveries.module.css';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import {extractFileName} from "../../state/utility";

const Discoveries = ({fileContents}) => {
    return (
        <>
            <div className={styles.author__discoveries}>
                {fileContents.length !== 0 ?
                    <>
                        {fileContents.map((fileContent, index) => {
                            return (
                                // eslint-disable-next-line react/jsx-key
                                <div key={index}>
                                    <div className={styles.author__discovery} >
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {fileContent.length !== 0 ? fileContent.data : ""}
                                        </ReactMarkdown>
                                    </div>
                                    <Link
                                        href={`/discoveries/${extractFileName(fileContent.filename)}`}><a>[...]</a></Link>
                                </div>
                            )
                        })}

                    </>
                    : ""}
            </div>
        </>
    )
}

export default Discoveries;