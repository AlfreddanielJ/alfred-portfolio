import { useEffect, useRef } from "react";
import useRoute, { ROUTES } from "./hooks/useRoute.js";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import About from "./pages/About.jsx";
import Specialization from "./pages/Specialization.jsx";
import Credentials from "./pages/Credentials.jsx";
import Publications from "./pages/Publications.jsx";
import PatentsBooks from "./pages/PatentsBooks.jsx";
import Contact from "./pages/Contact.jsx";

const PAGES = {
  "about-alfred": About,
  specialization: Specialization,
  credentials: Credentials,
  publications: Publications,
  "patents-books": PatentsBooks,
  contact: Contact,
};

export default function App() {
  const route = useRoute();
  const main = useRef(null);
  const first = useRef(true);
  const Page = PAGES[route];

  /* On navigation: update the title, return to the top and move focus to the page for screen readers. */
  useEffect(() => {
    const label = ROUTES.find((r) => r.path === route).label;
    document.title = route === "about-alfred" ? "Dr. J. Alfred Daniel – Academic Portfolio" : `${label} – Dr. J. Alfred Daniel`;
    window.scrollTo({ top: 0, behavior: "instant" });
    if (first.current) { first.current = false; return; }
    main.current?.focus({ preventScroll: true });
  }, [route]);

  return (
    <>
      <a href="#main" onClick={(e) => { e.preventDefault(); main.current?.focus(); }} className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-surface-container-lowest focus:text-on-surface focus:px-space-md focus:py-space-sm focus:rounded focus:shadow-lg">
        Skip to content
      </a>
      <Header route={route} />
      <main id="main" ref={main} tabIndex={-1} className="w-full pt-20 bg-background min-h-screen outline-none">
        <Page />
      </main>
      <Footer />
    </>
  );
}
