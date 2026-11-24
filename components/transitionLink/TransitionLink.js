import Link from "next/link";
import useTransitionLink from "./useTransitionLink";

// Drop-in replacement for next/link on internal links: navigates inside a view
// transition so shared titles (data-morph) morph between pages.
const TransitionLink = ({ href, replace, ...props }) => {
  const { handleClick } = useTransitionLink(href, replace);

  return (
    <Link href={href} replace={replace} {...props} onClick={handleClick} />
  );
};

export default TransitionLink;
