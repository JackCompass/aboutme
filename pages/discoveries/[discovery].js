import { useRouter } from "next/router";
import Header from "../../components/header/Header";
import Discovery from "../../components/discovery/Discovery";

const DiscoveryPost = () => {
  const router = useRouter();
  const { discovery } = router.query;

  return (
    <>
      <Header>
        <Discovery discoveryFile={discovery} />
      </Header>
    </>
  );
};

export default DiscoveryPost;
