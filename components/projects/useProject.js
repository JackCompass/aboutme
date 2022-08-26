import {useEffect} from "react";
import useSWR from "swr";
import {Repository} from "../../network/repository";
import {useSetRecoilState} from "recoil";
import {filesData} from "../../state/atom";

const UseProject = () => {

    const fileData = useSetRecoilState(filesData);

    // Fetching the file names from the repository
    const {
        data: fileNames,
        error: fileNamesError
    } = useSWR("repositoryFileName", () => Repository.getRepositoryFileNames());

    // Fetching the content of all the files from the repository
    const {
        data: fileContents,
        error: fileContentsError
    } = useSWR(fileNames !== undefined ? "repositoryFileContent" : null, () => Repository.getRepositoryFileContent(fileNames));

    useEffect( () => {
        console.log("fileContents: ", fileContents)
        if (fileContents && fileContents.length !== 0) {
            fileData(fileContents);
        }
    }, [fileContents])


    return {
    }
}

export default UseProject;