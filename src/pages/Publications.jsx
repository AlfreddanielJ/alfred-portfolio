import { memo, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { Icon, Breadcrumb } from "../components/ui.jsx";
import { WORKS as RAW_WORKS, COUNTS, publisherOf, toBibtex } from "../lib/pubs.js";
import { IDS } from "../lib/profile.js";
import { buildIndex, buildHighlighters, parseQuery, score } from "../lib/search.js";

const TABS = [
  { id: "ALL", label: "All Works", test: () => true },
  { id: "SCIE", label: "SCIE-Indexed", test: (p) => p.kind === "sci" },
  { id: "IDX", label: "Web of Science & Scopus", test: (p) => p.kind === "idx" },
  { id: "OTH", label: "Other Journals", test: (p) => p.kind === "oth" },
  { id: "CONF", label: "Conferences", test: (p) => p.kind === "conf" },
];

/* Newest first. Records without a year sort last and simply show no year. */
const WORKS = [...RAW_WORKS].sort((a, b) => (b.year || 0) - (a.year || 0));
const LIFT = "transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 motion-reduce:hover:translate-y-0";

/* Normalised once at load; searching never re-processes the data. */
const INDEX = buildIndex(WORKS);

/* Wraps each search match in <mark>. */
function Highlight({ text, re }) {
  if (!re || !text) return text;
  const parts = text.split(re);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    i % 2 ? <mark key={i} className="bg-secondary-fixed-dim text-on-surface rounded-sm px-0.5">{part}</mark> : part
  );
}

const YEARS = [...new Set(WORKS.map((p) => p.year).filter(Boolean))].sort((a, b) => b - a);

function kindBadge(p) {
  if (p.kind === "sci") return ["bg-error-container text-on-error-container font-bold", "SCIE Indexed"];
  if (p.kind === "idx") return ["bg-surface-container-high text-on-surface-variant", "Web of Science / Scopus"];
  if (p.kind === "conf") {
    const org = /IEEE/.test(p.venue) ? "IEEE " : /ACM/.test(p.venue) ? "ACM " : "";
    return ["bg-secondary-container text-on-secondary-container font-bold", `${org}Conference`];
  }
  return ["bg-surface-container text-on-surface-variant", "Journal"];
}

const Card = memo(function Card({ p, onCite, hl }) {
  const [badgeCls, badge] = kindBadge(p);
  const publisher = publisherOf(p.venue);
  return (
    <article className={`bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-sm ${LIFT}`}>
      <div className="flex flex-wrap items-center justify-between gap-space-xs">
        <div className="flex flex-wrap items-center gap-space-xs">
          <span className={`px-space-sm py-[2px] ${badgeCls} font-label-badge text-label-badge uppercase rounded`}>{badge}</span>
          {publisher && (
            <span className="px-space-sm py-[2px] bg-secondary-fixed text-on-secondary-fixed font-label-badge text-label-badge uppercase rounded">{publisher}</span>
          )}
        </div>
        {p.year && <span className="font-code-doi text-code-doi text-on-surface-variant font-semibold">{p.year}</span>}
      </div>
      <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
        {p.link ? (
          <a href={p.link} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors"><Highlight text={p.title} re={hl.title} /></a>
        ) : (
          <Highlight text={p.title} re={hl.title} />
        )}
      </h2>
      {p.authors && <p className="font-body-md text-body-md text-on-surface-variant"><Highlight text={p.authors} re={hl.authors} /></p>}
      <p className="font-body-citation text-body-citation text-on-surface-variant italic"><Highlight text={p.venue} re={hl.venue} /></p>
      <div className="pt-space-sm flex flex-wrap items-center justify-between gap-space-sm bg-surface-container-low/40 p-space-sm rounded">
        {p.doi && (
          <div className="flex items-center gap-space-xs text-on-surface-variant font-code-doi text-code-doi break-all">
            <span>DOI: {p.doi}</span>
          </div>
        )}
        <div className="flex flex-wrap items-center justify-end gap-space-sm ml-auto">
          <button type="button" onClick={() => onCite(p)} className="flex items-center gap-space-xs px-space-sm py-1 bg-surface-container text-on-surface rounded font-label-md text-label-md hover:bg-surface-container-high transition-colors">
            <span>Cite BibTeX</span>
          </button>
          {p.link && (
            <a href={p.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-space-xs px-space-sm py-1 bg-primary text-on-primary rounded font-label-md text-label-md hover:bg-surface-tint transition-colors">
              <span>View record</span>
              <Icon name="arrow_outward" className="text-[14px]" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
});

function BibtexModal({ text, onClose }) {
  const [copied, setCopied] = useState(false);
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the text stays selectable in the dialog */
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-gutter" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-labelledby="bib-title" className="bg-surface-container-lowest w-full max-w-2xl rounded-xl shadow-2xl p-space-lg flex flex-col gap-space-md">
        <div className="flex items-center justify-between pb-space-xs">
          <div className="flex items-center gap-space-xs">
            <h3 id="bib-title" className="font-headline-sm text-headline-sm text-on-surface">BibTeX Citation Entry</h3>
          </div>
          <button ref={closeRef} type="button" aria-label="Close dialog" onClick={onClose} className="p-space-xs text-on-surface-variant hover:text-on-surface transition-colors">
            <Icon name="close" className="text-[20px]" />
          </button>
        </div>
        <pre className="bg-surface-container-low p-space-md rounded font-code-doi text-code-doi text-on-surface overflow-x-auto max-h-80 whitespace-pre-wrap break-words select-all"><code>{text}</code></pre>
        <div className="flex items-center justify-between pt-space-xs">
          <span role="status" className={`text-secondary font-label-md text-label-md transition-opacity ${copied ? "opacity-100" : "opacity-0"}`}>Copied to clipboard</span>
          <button type="button" onClick={copy} className="flex items-center gap-space-xs px-space-md py-2 bg-primary text-on-primary rounded font-label-md text-label-md hover:bg-surface-tint transition-colors shadow-sm">
            <span>Copy to Clipboard</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Publications() {
  const [input, setInput] = useState("");
  const [year, setYear] = useState("ALL");
  const [tab, setTab] = useState("ALL");
  const [cite, setCite] = useState(null);
  const searchRef = useRef(null);

  /* The box updates instantly; the (cheap) filtering follows on a deferred value so typing never stalls. */
  const query = useDeferredValue(input);
  const stale = input !== query;
  const terms = useMemo(() => parseQuery(query), [query]);
  const hl = useMemo(() => buildHighlighters(terms), [terms]);
  const tabDef = TABS.find((t) => t.id === tab);

  /* Records matching the search + year. With a search, best matches first; otherwise newest first. */
  const base = useMemo(() => {
    const hits = [];
    for (const rec of INDEX) {
      if (year !== "ALL" && String(rec.p.year) !== year) continue;
      const s = terms.length ? score(rec, terms) : 0;
      if (s >= 0) hits.push({ p: rec.p, s });
    }
    if (terms.length) hits.sort((a, b) => b.s - a.s); /* stable: ties stay newest first */
    return hits.map((h) => h.p);
  }, [terms, year]);
  const shown = useMemo(() => base.filter(tabDef.test), [base, tabDef]);

  /* "/" jumps to the search box from anywhere on the page. */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = document.activeElement;
      if (el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;
      e.preventDefault();
      searchRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const exportBib = () => {
    const blob = new Blob([shown.map(toBibtex).join("\n\n") + "\n"], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "alfred-daniel-publications.bib";
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const reset = () => { setInput(""); setYear("ALL"); setTab("ALL"); searchRef.current?.focus(); };

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="w-full py-space-xl relative overflow-hidden bg-gradient-to-br from-[#1A1A1A] via-[#222222] to-[#3A3A3A] text-white">
        <div className="max-w-7xl mx-auto px-gutter lg:px-gutter-desktop flex flex-col gap-space-md relative z-10">
          <Breadcrumb current="Publications" variant="slash" light />
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-space-sm mb-space-xs">
                <span className="px-space-sm py-[2px] bg-secondary-fixed text-on-secondary-fixed font-label-badge text-label-badge uppercase rounded">Scopus ID: {IDS.scopus}</span>
                <span className="px-space-sm py-[2px] bg-surface-container-high text-on-surface-variant font-label-badge text-label-badge uppercase rounded">ORCID: {IDS.orcid}</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-white tracking-tight">Research Publications &amp; Archival Papers</h1>
              <p className="justify-prose font-body-lg text-body-lg text-white/80 mt-space-xs leading-relaxed">
                Journal articles and conference papers on vehicular networks, intelligent transportation, autonomous vehicles, IoT, machine learning and immersive reality.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-space-xs sm:flex sm:items-center sm:gap-space-md w-full sm:w-auto bg-surface-container-lowest p-space-sm sm:p-space-md rounded-xl shadow-sm self-start lg:self-auto">
              <div className="px-space-sm sm:px-0 sm:pr-space-md">
                <span className="block font-headline-md text-headline-md text-on-surface">{WORKS.length}</span>
                <span className="font-label-badge text-label-badge text-on-surface-variant uppercase max-sm:text-[0.625rem] max-sm:tracking-tight">Listed Works</span>
              </div>
              <div className="px-space-sm sm:pl-space-md sm:pr-space-md bg-surface-container-low/50 py-space-xs rounded">
                <span className="block font-headline-md text-headline-md text-secondary">{COUNTS.sci}</span>
                <span className="font-label-badge text-label-badge text-on-surface-variant uppercase max-sm:text-[0.625rem] max-sm:tracking-tight">SCIE Journals</span>
              </div>
              <div className="px-space-sm sm:px-0 sm:pl-space-md">
                <span className="block font-headline-md text-headline-md text-on-surface">{COUNTS.conf}</span>
                <span className="font-label-badge text-label-badge text-on-surface-variant uppercase max-sm:text-[0.625rem] max-sm:tracking-tight">Conferences</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters + list */}
      <section className="max-w-7xl mx-auto w-full px-gutter lg:px-gutter-desktop py-space-xl">
        <div className="flex flex-col gap-space-lg">
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-md">
            <div className="flex flex-col md:flex-row gap-space-md items-center justify-between">
              <div className="relative w-full md:max-w-md">
                <label htmlFor="publication-search" className="sr-only">Search publications by title, author, venue or year</label>
                <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]" />
                <input
                  ref={searchRef}
                  id="publication-search" type="search" autoComplete="off" spellCheck="false" value={input} aria-describedby="search-help"
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Escape" && input) { e.preventDefault(); setInput(""); } }}
                  placeholder="Search title, author, venue, year..."
                  className="w-full pl-10 pr-10 py-2 bg-surface-container-low border border-outline-variant hover:border-outline text-on-surface placeholder:text-outline text-body-md font-body-md rounded focus:outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all [&::-webkit-search-cancel-button]:hidden"
                />
                {input && (
                  <button type="button" aria-label="Clear search" onClick={() => { setInput(""); searchRef.current?.focus(); }}
                    className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-on-surface-variant hover:text-on-surface rounded transition-colors">
                    <Icon name="close" className="text-[18px]" />
                  </button>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-x-space-md gap-y-space-sm w-full md:w-auto justify-between md:justify-end">
                <div className="flex items-center gap-space-xs">
                  <label className="font-label-md text-label-md text-on-surface-variant whitespace-nowrap" htmlFor="year-select">Year:</label>
                  <select id="year-select" value={year} onChange={(e) => setYear(e.target.value)} className="bg-surface-container-low text-on-surface text-label-md font-label-md px-3 py-2 rounded focus:outline-none cursor-pointer">
                    <option value="ALL">All Years ({YEARS[YEARS.length - 1]}–{YEARS[0]})</option>
                    {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <button type="button" onClick={exportBib} disabled={!shown.length} className="flex items-center gap-space-xs px-space-md py-2 bg-primary text-on-primary rounded font-label-md text-label-md shadow-sm hover:bg-surface-tint transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                  <span>Export BibTeX</span>
                </button>
              </div>
            </div>
            <div className="flex items-center gap-space-xs overflow-x-auto pb-1 min-w-0 max-w-full" role="group" aria-label="Filter by publication type">
              {TABS.map((t) => (
                <button key={t.id} type="button" aria-pressed={tab === t.id} onClick={() => setTab(t.id)}
                  className={`px-space-md py-2 rounded text-label-md font-label-md transition-all whitespace-nowrap ${tab === t.id ? "bg-primary text-on-primary font-semibold shadow-sm" : "bg-surface-container-low text-on-surface hover:bg-surface-container-high"}`}>
                  {t.label} ({base.filter(t.test).length})
                </button>
              ))}
            </div>
            <p id="search-help" className="font-body-citation text-body-citation text-on-surface-variant">
              Every word must match, in any order. Use <span className="font-semibold text-on-surface">"quotes"</span> for an exact phrase, or
              {" "}<span className="font-semibold text-on-surface">author:paul</span>, <span className="font-semibold text-on-surface">year:2023</span>,
              {" "}<span className="font-semibold text-on-surface">venue:ieee</span> to search one field. Press <kbd className="px-1.5 py-0.5 rounded border border-outline-variant bg-surface-container-low font-code-doi text-code-doi">/</kbd> to jump here.
            </p>
          </div>

          <div className="flex items-center justify-between text-label-md font-label-md text-on-surface-variant px-space-xs">
            <span role="status" aria-live="polite">
              {shown.length
                ? `Showing ${shown.length} of ${WORKS.length} publications${terms.length ? ` matching ${query.trim()}` : ""}`
                : "No records matching current filters"}
            </span>
            <span className="font-code-doi text-code-doi text-outline hidden sm:block">{terms.length ? "Best match first" : "Newest first"}</span>
          </div>

          <div className={`flex flex-col gap-space-md transition-opacity duration-150 ${stale ? "opacity-70" : ""}`} aria-busy={stale}>
            {shown.map((p) => <Card key={p.id} p={p} onCite={setCite} hl={hl} />)}
            {!shown.length && (
              <div className="flex flex-col items-center justify-center p-space-2xl bg-surface-container-lowest rounded-xl shadow-sm text-center">
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">{terms.length ? `No publications match "${query.trim()}"` : "No matching publications found"}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-md mb-space-md">Try fewer or shorter words, another spelling, or a different publication type or year.</p>
                <button type="button" onClick={reset} className="px-space-md py-2 bg-primary text-on-primary rounded font-label-md text-label-md hover:bg-surface-tint transition-colors">Reset Filters</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {cite && <BibtexModal text={toBibtex(cite)} onClose={() => setCite(null)} />}
    </div>
  );
}
