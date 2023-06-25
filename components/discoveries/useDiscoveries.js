import useAbout from "../about/useAbout";
import { useRecoilValue } from "recoil";
import { discoveryFilesData } from "../../state/atom";

const useDiscoveries = () => {
  const {} = useAbout();
  const getDiscoveryFilesData = useRecoilValue(discoveryFilesData);

  return {
    getDiscoveryFilesData,
  };
};

export default useDiscoveries;
