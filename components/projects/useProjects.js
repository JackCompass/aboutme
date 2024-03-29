import { useRecoilValue, useSetRecoilState } from "recoil";
import { contentFilesList, filesData } from "../../state/atom";
import { useEffect } from "react";
import useSWR, { mutate } from "swr";
import { Repository } from "../../network/repository";
import useAbout from "../about/useAbout";

const useProjects = () => {
  const getContentFilesList = useRecoilValue(contentFilesList);
  const setFilesData = useSetRecoilState(filesData);
  const {} = useAbout();

  const { data: fileContent, error: fileContentError } = useSWR(
    getContentFilesList.length !== 0 ? "repositoryFileContent" : null,
    () => Repository.getRepositoryFileContent(getContentFilesList),
  );

  useEffect(() => {
    if (fileContent !== undefined && fileContent.length !== 0) {
      setFilesData(fileContent);
    }
  }, [fileContent]);

  return {
    fileContent,
  };
};

export default useProjects;
