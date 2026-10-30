import useNetwork from "../../network/useNetwork";
import useTheme from "../theme/useTheme";

const useHeader = () => {
  const {} = useNetwork();
  const { theme, toggleTheme } = useTheme();

  return { theme, toggleTheme };
};

export default useHeader;
