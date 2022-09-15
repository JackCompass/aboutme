import {useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {discoveryFilesData} from "../../state/atom";
import useDiscoveries from "../discoveries/useDiscoveries";

const useDiscovery = (discoveryFile) => {

    const {} = useDiscoveries();
    const getDiscoveryFilesData = useRecoilValue(discoveryFilesData);
    const [discoveryDetail, setDiscoveryDetail] = useState(null);

    useEffect(() => {
        if (getDiscoveryFilesData.length !== 0) {
            let searchFileName = discoveryFile + '.discovery.md';
            const fileDetail = getDiscoveryFilesData.find( (file) => file.filename.split('/').at(-1) === searchFileName)
            if (fileDetail) {
                setDiscoveryDetail(fileDetail);
            }
        }
    }, [getDiscoveryFilesData])

    return {
        discoveryDetail,
    }
}

export default useDiscovery;