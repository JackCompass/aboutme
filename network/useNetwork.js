import {useEffect} from "react";
import useSWR from "swr";
import {Repository} from "./repository";
import {useSetRecoilState} from "recoil";
import {contentFilesList, filesData, previewFilesList} from "../state/atom";

const UseNetwork = () => {

    const fileData = useSetRecoilState(filesData);
    const setPreviewFilesList = useSetRecoilState(previewFilesList);
    const setContentFilesList = useSetRecoilState(contentFilesList);

    // Fetching the file names from the repository
    const {
        data: fileNames,
        error: fileNamesError
    } = useSWR("repositoryFileName", () => Repository.getRepositoryFileNames());


    useEffect(() => {
        if (fileNames !== undefined && fileNames.length !== 0) {
            const segregateFile = Repository.extractFileNameUsingRegex(fileNames, [".preview.md$", ".md$"])
            setPreviewFilesList(segregateFile.previewFiles);
            setContentFilesList(segregateFile.contentFiles);
        }
    }, [fileNames])


    return {
    }
}

export default UseNetwork;