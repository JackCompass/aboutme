import useProjectDetails from "./useProjectDetails";
import Projects from "./Projects";

const ProjectDetails = ({projectTitle}) => {

    const {projectDetail} = useProjectDetails(projectTitle);

    if (projectDetail === null) {
        return <h2>Loading...</h2>
    } else {
        return (
            <>
                <Projects fileContents={projectDetail} />
            </>
        )

    }

}

export default ProjectDetails;