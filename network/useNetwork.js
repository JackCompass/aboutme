import {useEffect} from "react";
import useSWR from "swr";
import {Repository} from "./repository";
import {useSetRecoilState} from "recoil";
import {contentFilesList, discoveryFilesList, filesData, previewFilesList} from "../state/atom";

const UseNetwork = () => {

    const fileData = useSetRecoilState(filesData);
    const setPreviewFilesList = useSetRecoilState(previewFilesList);
    const setContentFilesList = useSetRecoilState(contentFilesList);
    const setDiscoveryFilesList = useSetRecoilState(discoveryFilesList);

    // Fetching the file names from the repository
    const {
        data: fileNames,
        error: fileNamesError
    } = useSWR("repositoryFileName", () => Repository.getRepositoryFileNames());


    useEffect(() => {
        if (fileNames !== undefined && fileNames.length !== 0) {
            const segregateFile = Repository.extractFileNameUsingRegex(fileNames, [".preview.md$", ".md$", "discovery.md"])
            setPreviewFilesList(segregateFile.previewFiles);
            setContentFilesList(segregateFile.contentFiles);
            setDiscoveryFilesList(segregateFile.discoveryFiles);
        }
    }, [fileNames])


    return {
    }
}

export default UseNetwork;