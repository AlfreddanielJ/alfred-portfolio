import { PROFILE, PROFILES } from "../lib/profile.js";
import { ROUTES, hrefTo } from "../hooks/useRoute.js";
import { Icon, Ext } from "./ui.jsx";

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low text-on-surface py-space-2xl shadow-[0_-1px_8px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-gutter-desktop">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-gutter-desktop gap-y-space-xl mb-space-2xl">
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-1">
            <h3 className="font-headline-md text-headline-md mb-space-xs text-on-surface">Dr. J. Alfred Daniel</h3>
            <p className="font-label-md text-label-md text-secondary font-semibold tracking-wide">
              Assistant Professor | SMIEEE
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mt-space-md max-w-2xl">
              Senior Member of the IEEE and Head of the Centre for Immersive Reality and Gaming (CIRG) at Karpagam Academy of Higher Education. His research focuses on Artificial Intelligence, Intelligent Transportation Systems, Vehicular Networks, Internet of Things, and Immersive Technologies (AR/VR/XR).
            </p>
          </div>

          <div>
            <h4 className="font-headline-sm text-headline-sm text-on-surface mb-space-md tracking-tight">Explore</h4>
            <ul className="space-y-space-sm font-body-md text-body-md text-on-surface-variant">
              {ROUTES.map(({ path, label }) => (
                <li key={path}>
                  <a className="hover:text-secondary transition-colors" href={hrefTo(path)}>{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-headline-sm text-headline-sm text-on-surface mb-space-md tracking-tight">Profiles</h4>
            <ul className="space-y-space-sm font-body-md text-body-md text-on-surface-variant">
              {PROFILES.map(({ label, href }) => (
                <li key={label}>
                  <Ext href={href} className="hover:text-secondary transition-colors flex items-center gap-space-xs">
                    <span>{label}</span>
                    <Icon name="arrow_outward" className="text-[16px]" />
                  </Ext>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 md:col-span-1">
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

        <div className="text-on-surface-variant font-label-md text-label-md bg-surface-container-high/40 p-space-md rounded-xl">
          <p>© {new Date().getFullYear()} Dr. J. Alfred Daniel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
