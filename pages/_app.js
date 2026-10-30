import "../styles/globals.css";
import Error from "../components/error/Error";
import { RecoilRoot } from "recoil";
import { SkeletonTheme } from "react-loading-skeleton";
import Head from "next/head";
import useTheme from "../components/theme/useTheme";

function ThemeAwareApp({ Component, pageProps }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <SkeletonTheme
      duration={0.8}
      baseColor={isDark ? "#333333" : "#ebebeb"}
      highlightColor={isDark ? "#444444" : "#f5f5f5"}>
      <Component {...pageProps} />
    </SkeletonTheme>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Anuj Singh</title>
      </Head>
      <RecoilRoot>
        <Error>
          <ThemeAwareApp Component={Component} pageProps={pageProps} />
        </Error>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
