import "../styles/globals.css";
import Error from "../components/error/Error";
import { RecoilRoot } from "recoil";
import { SkeletonTheme } from "react-loading-skeleton";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Anuj Singh</title>
      </Head>
      <RecoilRoot>
        <Error>
          <SkeletonTheme duration={0.8}>
            <Component {...pageProps} />
          </SkeletonTheme>
        </Error>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
