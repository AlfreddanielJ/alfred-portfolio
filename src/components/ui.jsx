import { hrefTo } from "../hooks/useRoute.js";

export const Icon = ({ name, className = "", fill = false }) => (
  <span
    className={`material-symbols-outlined ${className}`}
    aria-hidden="true"
    style={fill ? { fontVariationSettings: "'FILL' 1" } : undefined}
  >
    {name}
  </span>
);

/* Breadcrumb used at the top of every inner page. */
export function Breadcrumb({ current, variant = "chevron", light = false }) {
  const base = light ? "text-white/70" : "text-on-surface-variant";
  const link = light ? "hover:text-white" : "hover:text-secondary";
  const here = light ? "text-white" : "text-on-surface";
  const sep = light ? "text-white/40" : "text-outline-variant";
  if (variant === "slash") {
    return (
      <nav aria-label="Breadcrumb" className={`flex items-center gap-space-xs font-label-md text-label-md ${base} mb-space-sm`}>
        <a className={`${link} transition-colors`} href={hrefTo("about-alfred")}>Home</a>
        <span className={sep} aria-hidden="true">/</span>
        <span className={`${here} font-semibold`} aria-current="page">{current}</span>
      </nav>
    );
  }
  return (
    <nav aria-label="Breadcrumb" className={`mb-space-md flex items-center gap-space-xs font-label-md text-label-md ${base}`}>
      <a className={`${link} transition-colors`} href={hrefTo("about-alfred")}>Home</a>
      <Icon name="chevron_right" className="text-[14px]" />
      <span className={`${here} font-semibold`} aria-current="page">{current}</span>
    </nav>
  );
}

export const Ext = ({ href, children, className = "" }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
    {children}
  </a>
);
