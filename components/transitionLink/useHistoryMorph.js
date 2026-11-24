import { useEffect } from "react";
import { useRouter } from "next/router";
import { canMorph, navigateWithMorph, pathOf } from "./useTransitionLink";

// Upper bound on how long the transition waits for Next to finish the route.
const ROUTE_TIMEOUT_MS = 3000;

const waitForRouteChange = router =>
  new Promise(resolve => {
    const done = () => {
      clearTimeout(timer);
      router.events.off("routeChangeComplete", done);
      router.events.off("routeChangeError", done);
      resolve();
    };
    const timer = setTimeout(done, ROUTE_TIMEOUT_MS);
    router.events.on("routeChangeComplete", done);
    router.events.on("routeChangeError", done);
  });

// Animates browser back/forward (including mouse back buttons) with the same
// morph as TransitionLink. pages/_document.js registers a popstate listener
// before Next's router and forwards to window.__onPopStateMorph, so we can hold
// the event back, start the view transition, and re-dispatch it inside the
// transition. Next then handles the navigation unchanged, including scroll
// restoration.
const useHistoryMorph = () => {
  const router = useRouter();

  useEffect(() => {
    let replaying = false;

    const onPopState = event => {
      const { state } = event;
      if (
        replaying ||
        !canMorph() ||
        !state?.__N ||
        pathOf(state.as) === pathOf(router.asPath)
      ) {
        return;
      }

      event.stopImmediatePropagation();
      navigateWithMorph(router.asPath, state.as, () => {
        const routeChanged = waitForRouteChange(router);
        replaying = true;
        window.dispatchEvent(new PopStateEvent("popstate", { state }));
        replaying = false;
        return routeChanged;
      });
    };

    window.__onPopStateMorph = onPopState;
    return () => {
      if (window.__onPopStateMorph === onPopState) {
        delete window.__onPopStateMorph;
      }
    };
  }, [router]);
};

export default useHistoryMorph;
