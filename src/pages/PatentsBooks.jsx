import { Icon, Breadcrumb, Ext } from "../components/ui.jsx";
import Section, { card } from "../components/Section.jsx";
import { PATENTS, BOOKS, CHAPTERS } from "../lib/pubs.js";
import { PATENT_META } from "../lib/profile.js";

const CHAPTER_META = {
  "Fuzzy-Based": { book: "Cloud IoT Systems for Smart Agricultural Engineering", publisher: "Chapman & Hall / CRC", pages: "pp. 147–162", year: 2022 },
  "Decentralized Edge": { book: "AI, IoT, and Blockchain Breakthroughs in E-Governance", publisher: "IGI Global", pages: "pp. 154–168", year: 2023 },
  "Machine Vision": { book: "Drone Data Analytics in Aerial Computing", publisher: "Springer Nature Singapore", pages: "pp. 145–162", year: 2023 },
  "Revolutionizing Medical": { book: "Cyber Space and Outer Space Security", publisher: "River Publishers", pages: "pp. 151–169", year: 2024 },
};
const chapterMeta = (title) => Object.entries(CHAPTER_META).find(([k]) => title.startsWith(k))?.[1] || {};

const BOOK_PUBLISHER = { "Fundamental of Intelligent Vehicular Network": "Elsevier", "The Convergence of Self-Sustaining Systems with AI and IoT": "IGI Global" };
const scholar = (t) => `https://scholar.google.com/scholar?q=${encodeURIComponent(`"${t}"`)}`;

/* Patents grouped by status: the two lists are different things (granted rights vs. filed applications). */
const PATENT_ITEMS = PATENTS.map((p) => {
  const m = PATENT_META.find(({ number }) => p.venue.includes(number));
  if (!m) throw new Error(`Missing patent metadata for ${p.title}`);
  return { p, m };
});
const GRANTED = PATENT_ITEMS.filter((x) => x.m.granted);
const APPLICATIONS = PATENT_ITEMS.filter((x) => !x.m.granted);

const GroupLabel = ({ children }) => (
  <h3 className="font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant mb-space-md">{children}</h3>
);

function PatentCard({ p, m }) {
  return (
    <li className={`p-space-lg flex flex-col ${card()}`}>
      <div className="flex items-center justify-between gap-space-sm mb-space-md">
        <span className="px-space-sm py-0.5 rounded bg-surface-container-high text-on-surface font-label-badge text-label-badge uppercase tracking-wider">{m.country}</span>
        <span className="font-code-doi text-code-doi text-on-surface-variant">{m.number}</span>
      </div>
      <h4 className="font-headline-sm text-headline-sm text-on-surface mb-space-sm">{p.title}</h4>
      {p.authors && <p className="font-body-md text-body-md text-on-surface-variant">Inventors: {p.authors}</p>}
      <dl className="mt-auto pt-space-md">
        <div className="pt-space-md border-t border-surface-container-high grid grid-cols-2 gap-space-md">
          <div>
            <dt className="font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant mb-1">{m.granted ? "Granted" : "Published"}</dt>
            <dd className="font-body-md text-body-md text-on-surface">{m.date}</dd>
          </div>
          <div>
            <dt className="font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant mb-1">{m.reg ? "Registration no." : "Type"}</dt>
            <dd className="font-body-md text-body-md text-on-surface">{m.reg ? m.reg.replace("Reg. No. ", "") : m.office}</dd>
          </div>
        </div>
      </dl>
    </li>
  );
}

export default function PatentsBooks() {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#1A1A1A] via-[#222222] to-[#3A3A3A] text-white">
        <div className="max-w-7xl mx-auto px-gutter-desktop py-space-xl">
          <Breadcrumb current="Patents & Books" light />
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded bg-white/10 text-white font-label-badge text-label-badge tracking-wider uppercase mb-space-sm">
              Intellectual Property &amp; Scholarly Books
            </span>
            <h1 className="font-headline-lg text-headline-lg text-white tracking-tight mb-space-xs">Patents &amp; Authored Books</h1>
            <p className="font-body-lg text-body-lg text-white/80 leading-relaxed">
              Patents and patent applications, books and book chapters, spanning vehicular networks, IoT and intelligent systems.
            </p>
          </div>
        </div>
      </section>

      {/* 1. Patents */}
      <Section id="patents" title="Patents" text={`${GRANTED.length} granted patents and ${APPLICATIONS.length} published applications, in South Korea, Australia and India.`}>
        <GroupLabel>Granted</GroupLabel>
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-space-md mb-space-xl">
          {GRANTED.map((x) => <PatentCard key={x.p.id} {...x} />)}
        </ul>
        <GroupLabel>Published applications</GroupLabel>
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-space-md">
          {APPLICATIONS.map((x) => <PatentCard key={x.p.id} {...x} />)}
        </ul>
      </Section>

      {/* 2. Books */}
      <Section id="books" tone="soft" title="Books" text="Books co-authored with Elsevier and IGI Global.">
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-space-md">
          {BOOKS.map((b) => (
            <li key={b.id} className={`p-space-lg flex flex-col sm:flex-row gap-space-lg ${card()}`}>
              {/* Typographic cover: no real cover artwork is available */}
              <div className="w-full sm:w-40 shrink-0 aspect-[3/4] rounded-lg overflow-hidden shadow-md bg-gradient-to-b from-[#1A1A1A] to-[#3A3A3A] text-inverse-on-surface flex flex-col justify-between p-space-md" aria-hidden="true">
                <span className="font-label-badge text-label-badge uppercase tracking-wider text-on-primary-fixed-variant">{BOOK_PUBLISHER[b.title]}</span>
                <span className="font-headline-md text-base font-semibold leading-snug">{b.title}</span>
              </div>
              <div className="flex flex-col flex-1">
                <span className="font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant mb-space-xs">{b.venue}</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-sm">{b.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant flex-1">{b.authors}</p>
                <div className="pt-space-md">
                  <Ext href={scholar(b.title)} className="px-space-md py-1.5 rounded bg-surface-container text-on-surface font-label-md text-label-md font-semibold hover:bg-primary hover:text-on-primary transition-colors inline-flex items-center gap-1.5">
                    <span>Find on Google Scholar</span>
                  </Ext>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* 3. Chapters */}
      <Section id="chapters" title="Book Chapters" text="Chapters contributed to edited volumes.">
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-space-md">
          {CHAPTERS.map((c) => {
            const m = chapterMeta(c.title);
            return (
              <li key={c.id} className={`p-space-lg flex flex-col ${card()}`}>
                <div className="flex items-center justify-between gap-space-sm mb-space-md">
                  <span className="px-space-sm py-0.5 rounded bg-surface-container text-on-surface-variant font-label-badge text-label-badge uppercase tracking-wider">{m.publisher}</span>
                  <span className="font-code-doi text-code-doi text-on-surface-variant">{m.year}</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-sm">{c.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-space-xs">
                  In <span className="italic text-on-surface">{m.book}</span>
                </p>
                <p className="font-body-citation text-body-citation text-on-surface-variant flex-1">{c.authors}</p>
                {m.pages && <p className="mt-space-md pt-space-md border-t border-surface-container-high font-code-doi text-code-doi text-on-surface-variant">{m.pages}</p>}
              </li>
            );
          })}
        </ul>
      </Section>
    </div>
  );
}
