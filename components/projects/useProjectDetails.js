import {useRecoilValue} from "recoil";
import {filesData} from "../../state/atom";
import {useEffect, useState} from "react";
import {mutate} from "swr";
import useProjects from "./useProjects";
import projectDetails from "./ProjectDetails";

const useProjectDetails = (projectTitle) => {

    const [projectDetail, setProjectDetail] = useState(null);
    const getFilesData = useRecoilValue(filesData);
    const {} = useProjects();

    useEffect( () => {
        // If getFilesData is empty, fetch the data.
        if (getFilesData.length !== 0) {
            let searchFileName = projectTitle + '.md';
            const fileDetail = getFilesData.find( (file) => file.filename.split('/').at(-1) === searchFileName)
            if (fileDetail) {
                setProjectDetail([fileDetail, ]);
            }
        }
    }, [getFilesData])

    return {
        projectDetail
    }
}

export default useProjectDetails;