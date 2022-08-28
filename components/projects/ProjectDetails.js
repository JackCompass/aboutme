import useProjectDetails from "./useProjectDetails";
import Projects from "./Projects";
import ShowProject from "../showProject/ShowProject";

const ProjectDetails = ({projectTitle}) => {

    const {projectDetail} = useProjectDetails(projectTitle);

    if (projectDetail === null || projectDetail === undefined) {
        return <h2>Loading...</h2>
    } else {
        return (
            <>
                <ShowProject fileContent={projectDetail} />
            </>
        )

    }

}

export default ProjectDetails;