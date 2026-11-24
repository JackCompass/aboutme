import { Html, Head, Main, NextScript } from "next/document";

const themeInitScript = `
(function () {
  try {
    var theme = localStorage.getItem("theme");
    if (theme !== "light" && theme !== "dark") {
      theme = "dark";
    }
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();
`;

// Registered before Next's router so useHistoryMorph can run first on
// back/forward and hold Next's popstate handler until the view transition starts.
const popStateMorphScript = `
window.addEventListener("popstate", function (event) {
  if (window.__onPopStateMorph) window.__onPopStateMorph(event);
});
`;

const Document = () => {
  return (
    <Html data-theme="dark">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
        <link rel={"icon"} type="image/x-icon" href={"/favicon.svg"} />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: popStateMorphScript }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
