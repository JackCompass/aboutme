import "../styles/globals.css";
import Error from "../components/error/Error";
import { RecoilRoot } from "recoil";
import { SkeletonTheme } from "react-loading-skeleton";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Error>
        <SkeletonTheme duration={0.8}>
          <Component {...pageProps} />
        </SkeletonTheme>
      </Error>
    </RecoilRoot>
  );
}

export default MyApp;
