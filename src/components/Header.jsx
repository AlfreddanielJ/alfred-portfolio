import { useEffect, useState } from "react";
import { ROUTES, hrefTo } from "../hooks/useRoute.js";
import { Icon } from "./ui.jsx";

const base =
  "relative py-space-xs font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-center";
const active =
  "relative py-space-xs transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-primary after:transition-transform after:origin-center text-on-surface font-semibold after:scale-x-100";

export default function Header({ route }) {
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [route]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-7xl mx-auto px-gutter-desktop flex items-center justify-between">
        <a className="flex flex-col group" href={hrefTo("about-alfred")}>
          <span className="font-headline-md text-headline-md text-on-surface tracking-tight group-hover:text-secondary transition-colors">
            Dr. J. Alfred Daniel
          </span>
          <span className="font-label-badge text-label-badge text-on-surface-variant uppercase tracking-wider">
            Assistant Professor • Computer Science &amp; Engineering
          </span>
        </a>

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-space-lg">
          {ROUTES.map((r) => (
            <a key={r.path} href={hrefTo(r.path)} aria-current={route === r.path ? "page" : undefined} className={route === r.path ? active : base}>
              {r.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-space-md">
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden flex items-center justify-center w-11 h-11 text-on-surface-variant hover:text-on-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded"
          >
            <Icon name={open ? "close" : "menu"} className="text-[24px]" />
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="lg:hidden bg-surface-container-lowest border-t border-surface-container-high shadow-lg">
          <ul className="max-w-7xl mx-auto px-gutter-desktop py-space-sm">
            {ROUTES.map((r) => (
              <li key={r.path}>
                <a
                  href={hrefTo(r.path)}
                  aria-current={route === r.path ? "page" : undefined}
                  className={`flex items-center min-h-[48px] font-label-md text-label-md ${route === r.path ? "text-on-surface font-semibold" : "text-on-surface-variant"}`}
                >
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
