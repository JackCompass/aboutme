import useDiscovery from "./useDiscovery";
import styles from "./Discovery.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";

const Discovery = ({ discoveryFile }) => {
  const { discoveryDetail } = useDiscovery(discoveryFile);
  return (
    <>
      <div className={styles.author__discovery}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}>
          {discoveryDetail?.data}
        </ReactMarkdown>
      </div>
    </>
  );
};

export default Discovery;
