import { useRouter } from "next/router";
import useNetwork from "../../network/useNetwork";
import useTheme from "../theme/useTheme";

const useHeader = () => {
  const {} = useNetwork();
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useRouter();

  const replaceSectionNav =
    pathname.startsWith("/projects") || pathname.startsWith("/discoveries");

  return { theme, toggleTheme, replaceSectionNav };
};

export default useHeader;
