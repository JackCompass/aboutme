import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  discoveryFilesData,
  discoveryFilesList,
  filesPreviewData,
  previewFilesList,
} from "../../state/atom";
import useSWR from "swr";
import { Repository } from "../../network/repository";
import { useEffect } from "react";

const useAbout = () => {
  const getPreviewFilesList = useRecoilValue(previewFilesList);
  const getDiscoverFilesList = useRecoilValue(discoveryFilesList);
  const setFilePreviewData = useSetRecoilState(filesPreviewData);
  const setDiscoveryFilesData = useSetRecoilState(discoveryFilesData);

  const { data: previewContent, error: previewContentError } = useSWR(
    getPreviewFilesList.length !== 0 ? "repositoryPreviewFileContent" : null,
    () => Repository.getRepositoryFileContent(getPreviewFilesList),
  );

  const { data: discoveriesContent, error: discoveriesContentError } = useSWR(
    getDiscoverFilesList.length !== 0 ? "repositoryDiscoveryRepoContent" : null,
    () => Repository.getRepositoryFileContent(getDiscoverFilesList),
  );

  useEffect(() => {
    if (previewContent !== undefined && previewContent.length !== 0) {
      setFilePreviewData(previewContent);
    }
  }, [previewContent]);

  useEffect(() => {
    if (discoveriesContent !== undefined && discoveriesContent.length !== 0) {
      setDiscoveryFilesData(discoveriesContent);
    }
  }, [discoveriesContent]);

  return {
    previewContent,
    previewContentError,
    discoveriesContent,
    discoveriesContentError,
  };
};

export default useAbout;
