import {useRecoilValue, useSetRecoilState} from "recoil";
import {filesPreviewData, previewFilesList} from "../../state/atom";
import useSWR from "swr";
import {Repository} from "../../network/repository";
import {useEffect} from "react";
import useNetwork from "../../network/useNetwork";

const useAbout = () => {

    const getPreviewFilesList = useRecoilValue(previewFilesList)
    const setFilePreviewData = useSetRecoilState(filesPreviewData)


    const {
        data: previewContent,
        error: previewContentError
    } = useSWR(getPreviewFilesList.length !== 0 ? "repositoryPreviewFileContent" : null, () => Repository.getRepositoryFileContent(getPreviewFilesList));


    useEffect(() => {
        if (previewContent !== undefined && previewContent.length !== 0) {
            setFilePreviewData(previewContent);
        }
    }, [previewContent])

    return {}
}

export default useAbout;