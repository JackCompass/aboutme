import { useRouter } from "next/router";

// Elements tagged with data-morph="<path>" are shared between pages: the card
// or section title pointing at a path on one page morphs into the element with
// the same key on the next page. Cards and articles resolve to their first
// heading, so only the title moves.
const NEW_ELEMENT_TIMEOUT_MS = 300;

export const pathOf = url => url.split(/[?#]/)[0] || "/";

const isInViewport = el => {
  const { top, bottom } = el.getBoundingClientRect();
  return bottom > 0 && top < window.innerHeight;
};

const findMorphTarget = key => {
  const el = document.querySelector(`[data-morph="${CSS.escape(key)}"]`);
  if (!el) return null;
  const target = el.matches("h1, h2, h3") ? el : el.querySelector("h1, h2, h3");
  return target && isInViewport(target) ? target : null;
};

// Detail pages render their content a moment after the route commits, so poll
// briefly. setTimeout still runs while the view transition pauses rendering.
const waitForMorphTarget = key =>
  new Promise(resolve => {
    const start = performance.now();
    const check = () => {
      const target = findMorphTarget(key);
      if (target || performance.now() - start > NEW_ELEMENT_TIMEOUT_MS) {
        resolve(target);
      } else {
        setTimeout(check, 16);
      }
    };
    check();
  });

export const canMorph = () =>
  Boolean(document.startViewTransition) &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Runs `navigate` (which resolves once the new page has rendered) inside a
// view transition, morphing elements shared between `fromPath` and `toPath`.
export const navigateWithMorph = (fromPath, toPath, navigate) => {
  const root = document.documentElement;
  const keys = [...new Set([pathOf(toPath), pathOf(fromPath)])];
  const named = [];
  const name = (el, index) => {
    el.style.viewTransitionName = `page-morph-${index}`;
    named.push(el);
  };

  const shared = keys
    .map(key => ({ key, old: findMorphTarget(key) }))
    .filter(({ old }) => old);
  shared.forEach(({ old }, index) => name(old, index));

  root.dataset.pageMorph = "";
  const transition = document.startViewTransition(async () => {
    named.forEach(el => (el.style.viewTransitionName = ""));
    await navigate();
    const targets = await Promise.all(
      shared.map(({ key }) => waitForMorphTarget(key)),
    );
    targets.forEach((el, index) => el && name(el, index));
  });

  transition.ready.catch(() => {});
  transition.finished
    .catch(() => {})
    .finally(() => {
      named.forEach(el => (el.style.viewTransitionName = ""));
      delete root.dataset.pageMorph;
    });
};

const useTransitionLink = (href, replace) => {
  const router = useRouter();

  const handleClick = event => {
    const isModified =
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey;

    // Let next/link handle anything we don't animate.
    if (
      event.defaultPrevented ||
      isModified ||
      !canMorph() ||
      pathOf(href) === pathOf(router.asPath)
    ) {
      return;
    }

    event.preventDefault();
    navigateWithMorph(router.asPath, href, () =>
      replace ? router.replace(href) : router.push(href),
    );
  };

  return { handleClick };
};

export default useTransitionLink;
