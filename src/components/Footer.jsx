import { PROFILE, SCHOLARLY_RECORDS } from "../lib/profile.js";
import { COUNTS } from "../lib/pubs.js";
import { hrefTo } from "../hooks/useRoute.js";
import { Icon, Ext } from "./ui.jsx";

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low text-on-surface py-space-2xl shadow-[0_-1px_8px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-gutter-desktop">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter-desktop mb-space-2xl">
          <div className="md:col-span-2 pr-gutter-desktop">
            <h3 className="font-headline-md text-headline-md mb-space-xs text-on-surface">Dr. J. Alfred Daniel</h3>
            <p className="font-label-md text-label-md text-secondary mb-space-md font-semibold tracking-wide">
              Senior Member IEEE • Computer Science &amp; Engineering
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md mb-space-lg leading-relaxed">
              Assistant Professor at Karpagam Academy of Higher Education. Research in vehicular networks, intelligent transportation systems,
              AI, IoT and extended reality.
            </p>
            <div className="flex flex-wrap items-center gap-space-sm">
              <span className="font-label-badge text-label-badge text-on-surface-variant uppercase tracking-wider">Record:</span>
              <span className="px-space-sm py-[2px] bg-surface-container text-on-surface rounded font-code-doi text-code-doi">Journal articles: {COUNTS.journals}</span>
              <span className="px-space-sm py-[2px] bg-surface-container text-on-surface rounded font-code-doi text-code-doi">Conference papers: {COUNTS.conf}</span>
              <span className="px-space-sm py-[2px] bg-surface-container text-on-surface rounded font-code-doi text-code-doi">Patents: {COUNTS.patents}</span>
            </div>
          </div>

          <div>
            <h4 className="font-headline-sm text-headline-sm text-on-surface mb-space-md tracking-tight">Scholarly Records</h4>
            <ul className="space-y-space-sm font-body-md text-body-md text-on-surface-variant">
              {SCHOLARLY_RECORDS.map(({ label, href }) => (
                <li key={label}>
                  <Ext href={href} className="hover:text-secondary transition-colors flex items-center gap-space-xs">
                    <span>{label}</span>
                    <Icon name="arrow_outward" className="text-[16px]" />
                  </Ext>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-headline-sm text-headline-sm text-on-surface mb-space-md tracking-tight">Institutional Address</h4>
            <address className="not-italic font-body-md text-body-md text-on-surface-variant space-y-space-xs leading-relaxed">
              <p className="font-semibold text-on-surface">Department of Computer Science and Engineering</p>
              <p>{PROFILE.institution}</p>
              <p>{PROFILE.city}</p>
              <p className="mt-space-md pt-space-xs font-code-doi text-code-doi text-on-surface break-all">
                <a className="hover:text-secondary transition-colors" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
              </p>
            </address>
          </div>
        </div>

        <div className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md text-on-surface-variant font-label-md text-label-md bg-surface-container-high/40 p-space-md rounded-xl">
          <p>© {new Date().getFullYear()} Dr. J. Alfred Daniel. All rights reserved.</p>
          <div className="flex items-center gap-space-lg">
            <a className="hover:text-on-surface transition-colors" href={hrefTo("publications")}>Publications</a>
            <a className="hover:text-on-surface transition-colors" href={hrefTo("patents-books")}>Patents &amp; Books</a>
            <a className="hover:text-on-surface transition-colors" href={hrefTo("contact")}>Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
