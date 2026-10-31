import { useEffect, useState } from "react";

/* Page ids (used as keys and for the active nav state) and their URLs:
   about-alfred → /   specialization → /specialization   and so on. */
export const ROUTES = [
  { path: "about-alfred", label: "About" },
  { path: "specialization", label: "Specialization" },
  { path: "credentials", label: "Credentials" },
  { path: "publications", label: "Publications" },
  { path: "patents-books", label: "Patents & Books" },
  { path: "contact", label: "Contact" },
];

const HOME = "about-alfred";
const known = (id) => ROUTES.some((r) => r.path === id);

export const hrefTo = (id) => (id === HOME ? "/" : `/${id}`);

const idFromPathname = (pathname) => {
  const id = pathname.replace(/^\/+|\/+$/g, "");
  return known(id) ? id : HOME;
};

/* Old links such as /#/publications are rewritten to /publications. */
function upgradeLegacyHash() {
  const m = window.location.hash.match(/^#\/?([\w-]*)$/);
  if (m && (m[1] === "" || known(m[1]))) {
    window.history.replaceState(null, "", hrefTo(m[1] || HOME));
  }
}
/* Unknown URLs fall back to the About page; show its real address, and drop a trailing slash. */
function canonicalizePath() {
  const { pathname, search, hash } = window.location;
  const want = hrefTo(idFromPathname(pathname));
  if (pathname !== want) window.history.replaceState(null, "", want + search + hash);
}

if (typeof window !== "undefined") {
  upgradeLegacyHash();
  canonicalizePath();
}

export function navigate(url) {
  const current = window.location.pathname + window.location.search;
  if (url !== current) window.history.pushState(null, "", url);
  window.dispatchEvent(new Event("routechange"));
}

export default function useRoute() {
  const [route, setRoute] = useState(() => idFromPathname(window.location.pathname));

  useEffect(() => {
    const sync = () => setRoute(idFromPathname(window.location.pathname));
    const onHash = () => { upgradeLegacyHash(); sync(); };
    window.addEventListener("popstate", sync);
    window.addEventListener("routechange", sync);
    window.addEventListener("hashchange", onHash);

    /* Turn clicks on internal links into client-side navigation. Modified clicks,
       new-tab links and anchors such as #main keep their normal behaviour. */
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest && e.target.closest("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const href = a.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//")) return;
      e.preventDefault();
      navigate(href);
    };
    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("routechange", sync);
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return route;
}
