import {useRouter} from "next/router";
import Header from "../../components/header/Header";
import ProjectDetails from "../../components/projects/ProjectDetails";

const Post = () => {

    const router = useRouter();
    const {post} = router.query

    return (
        <>
            <Header>
                <ProjectDetails projectTitle={post} />
            </Header>
        </>
    )
}

export default Post;