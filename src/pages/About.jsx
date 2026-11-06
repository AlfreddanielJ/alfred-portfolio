import { useRef, useState } from "react";
import portrait from "../assets/alfred-daniel-profile.jpg";
import { Icon, Ext } from "../components/ui.jsx";
import RecordLogo from "../components/RecordLogo.jsx";
import { hrefTo } from "../hooks/useRoute.js";
import { COUNTS } from "../lib/pubs.js";
import { RESEARCH_INTERESTS, PROFILES } from "../lib/profile.js";

const PILLARS = [
  {
    figure: String(COUNTS.journals + COUNTS.conf),
    figureLabel: "journal articles and conference papers",
    title: "Research",
    text: "Vehicular networks, intelligent transportation, IoT, AI and immersive reality, published in international journals and conferences since 2015.",
    to: "publications",
    cta: "Browse publications",
  },
  {
    figure: String(COUNTS.patents + COUNTS.books + COUNTS.chapters),
    figureLabel: "patents, books and book chapters",
    title: "Patents & Books",
    text: "A granted Korean patent (2016) and Australian patent (2021), two published Indian patent applications, plus books and book chapters with Elsevier, IGI Global, Springer and others.",
    to: "patents-books",
    cta: "See patents & books",
  },
  {
    figure: "2",
    figureLabel: "outstanding-reviewer recognitions",
    title: "Peer Review",
    text: "Reviewer for IEEE, Elsevier, Springer, Hindawi, Inderscience and ACM venues, with outstanding-reviewer recognition from two Elsevier journals in 2017.",
    to: "credentials",
    cta: "View credentials",
  },
];

const MILESTONES = [
  { badge: "Academic appointment", range: "2022 – Now", label: "2022", title: "Assistant Professor & Head, CIRG", text: "Karpagam Academy of Higher Education, Coimbatore, India. Leading academic activities and interdisciplinary research at the Centre for Immersive Reality and Gaming.", side: "KAHE", sub: "Faculty, research leadership" },
  { badge: "Funded research", range: "", label: "2023", title: "Co-Principal Investigator – ₹30 Lakh Project", text: "Immersive Game Prototypes – Conquest of Chola Dynasty. A two-year completed research project supported by the Gaming Research Initiative, New Delhi, under SERB-INAE.", side: "Co-PI", sub: "Funded project, immersive gaming" },
  { badge: "Present", range: "Current", label: "Now", title: "Assistant Professor, Computer Science and Engineering", text: "Karpagam Academy of Higher Education, Coimbatore. Also heads the Centre for Immersive Reality and Gaming (CIRG).", side: "Karpagam Academy of Higher Education", sub: "Faculty" },
  { badge: "Research internship", range: "February – March 2017", label: "2017", title: "Research Scholar Intern, CCMP Lab", text: "Internship at the Connected Computing and Media Processing Lab, Kyungpook National University, South Korea.", side: "Kyungpook National University", sub: "Korea" },
  { badge: "Recognition", range: "2015 – 2016", label: "2015", title: "Best Paper Award, Korean Patent and Elsevier Book", text: "Best Paper Award at ICSNS 2015. Korean patent on Cooperative Cognitive Intelligence for the Internet of Vehicles (2016). Co-authored book with Elsevier (2016).", side: "ICSNS 2015 • KIPO", sub: "Award, patent, book" },
  { badge: "Early research", range: "March – September 2014", label: "2014", title: "Intel Labs Internship and ACM Student Research Competition", text: "Intern at the Intel Lab, National Taiwan University (August – September). ACM Travel Grant for ACM SAC 2014, plus ACM Student Research Competition recognition sponsored by Microsoft Research.", side: "National Taiwan University • ACM", sub: "Internship, competition" },
];

export default function About() {
  const [expanded, setExpanded] = useState(false);
  const profileCard = useRef(null);

  /* Collapsing a long, scrolled-past bio would leave the reader mid-page: bring the card back into view. */
  const toggleProfile = () => {
    const card = profileCard.current;
    if (expanded && card && card.getBoundingClientRect().top < 0) {
      requestAnimationFrame(() => card.scrollIntoView({ block: "start" }));
    }
    setExpanded((v) => !v);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Main profile & biographical essay */}
      <section className="relative w-full pt-space-xl pb-space-2xl" style={{ background: "linear-gradient(180deg, #1A1A1A 0px, #222222 360px, #F6F6F6 840px)" }}>
        <div className="relative max-w-7xl mx-auto px-gutter-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
            {/* Left column */}
            <div className="lg:col-span-5 flex flex-col gap-space-lg">
              <div className="relative bg-surface-container-lowest p-space-md rounded-xl border border-surface-container-high">
                {/* Full photo, never cropped. From laptop width up it scales with the window height (0.75 = its width/height), so the first screen ends on a complete card. */}
                <div className="relative w-full aspect-[1086/1448] overflow-hidden rounded-lg bg-surface-container lg:mx-auto lg:max-w-full lg:w-[calc(clamp(19rem,calc(100svh_-_26rem),37.8rem)_*_0.75)]">
                  <img alt="Portrait of Dr. J. Alfred Daniel" className="w-full h-full object-cover" src={portrait} width="1086" height="1448" fetchpriority="high" />
                </div>
                <div className="mt-space-md pt-space-md bg-surface-container-lowest">
                  <div className="flex items-center justify-between mb-space-xs">
                    <div>
                      <h1 className="font-headline-sm text-headline-sm text-on-surface">Dr. J. Alfred Daniel</h1>
                      <p className="font-label-md text-label-md text-on-surface-variant font-medium">Assistant Professor | SMIEEE</p>
                    </div>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed text-left sm:text-justify [hyphens:auto]">
                    Senior Member of the IEEE and Head of the Centre for Immersive Reality and Gaming (CIRG) at Karpagam Academy of Higher Education. His research focuses on Artificial Intelligence, Intelligent Transportation Systems, Vehicular Networks, Internet of Things, and Immersive Technologies (AR/VR/XR).
                  </p>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
                <h3 className="font-label-badge text-label-badge text-secondary uppercase tracking-wider mb-space-sm">Profiles</h3>
                <ul className="divide-y divide-surface-container">
                  {PROFILES.map((r) => (
                    <li key={r.label}>
                      <Ext href={r.href} className="group flex items-center gap-space-md min-h-[48px] py-space-sm">
                        <RecordLogo name={r.label} />
                        <span className="min-w-0 flex-1">
                          <span className="font-label-md text-label-md text-on-surface group-hover:text-secondary transition-colors block">{r.label}</span>
                          <span className="font-code-doi text-code-doi text-on-surface-variant block truncate">{r.detail}</span>
                        </span>
                        <Icon name="arrow_outward" className="text-[18px] text-outline group-hover:text-secondary transition-colors shrink-0" />
                      </Ext>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-md">
                <h3 className="font-label-badge text-label-badge text-secondary uppercase tracking-wider">Academic Appointments &amp; Professional Distinctions</h3>
                <ul className="divide-y divide-surface-container-high font-body-md text-body-md">
                  <li className="py-space-sm first:pt-0 last:pb-0">
                      <p className="font-semibold text-on-surface">Assistant Professor – Department of Computer Science &amp; Engineering</p>
                      <p className="text-on-surface-variant font-code-doi text-code-doi">Karpagam Academy of Higher Education (KAHE) • Coimbatore, India</p>
                    </li>
                  <li className="py-space-sm first:pt-0 last:pb-0">
                      <p className="font-semibold text-on-surface">Head – Centre for Immersive Reality and Gaming (CIRG)</p>
                      <p className="text-on-surface-variant font-code-doi text-code-doi">Leading research and innovation in AI, AR/VR/XR, and immersive technologies</p>
                    </li>
                  <li className="py-space-sm first:pt-0 last:pb-0">
                      <p className="font-semibold text-on-surface">Editorial &amp; Academic Service</p>
                      <p className="text-on-surface-variant font-code-doi text-code-doi">Editorial Board Member / Associate Editor / Guest Editor; peer reviewer for IEEE, Elsevier, Springer Nature and ACM venues</p>
                    </li>
                </ul>
              </div>

              <div className="bg-surface-container-low p-space-lg rounded-xl">
                <h3 className="font-label-badge text-label-badge text-secondary uppercase tracking-wider mb-space-md">Publication Record</h3>
                <div className="grid grid-cols-3 max-[359px]:grid-cols-1 gap-space-sm sm:gap-space-md text-center">
                  {[
                    [COUNTS.journals, "Journals"],
                    [COUNTS.conf, "Conferences"],
                    [COUNTS.patents, "Patents"],
                  ].map(([n, l]) => (
                    <div key={l} className="bg-surface-container-lowest px-1 py-space-sm sm:p-space-sm rounded">
                      <span className="font-headline-md text-headline-md text-secondary block lining-nums">{n}</span>
                      <span className="font-label-badge text-label-badge text-on-surface-variant uppercase max-sm:text-[0.625rem] max-sm:tracking-tight">{l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="lg:col-span-7 flex flex-col gap-space-xl">
              <div ref={profileCard} className="scroll-mt-24 bg-surface-container-lowest p-space-lg sm:p-space-xl rounded-xl border border-surface-container-high">
                <div className="mb-space-md">
                  <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Academic Profile</h2>
                  <div className="flex flex-wrap items-center gap-space-sm mt-space-md">
                    <a className="inline-flex items-center gap-space-xs px-space-md py-space-sm rounded bg-secondary text-on-secondary font-label-md text-label-md hover:bg-surface-tint shadow-sm transition-all" href={hrefTo("publications")}>
                      <span>Browse Publications</span>
                    </a>
                    <a className="inline-flex items-center gap-space-xs px-space-md py-space-sm rounded bg-surface-container-high text-on-surface font-label-md text-label-md hover:bg-surface-container-highest transition-all" href={hrefTo("contact")}>
                      <span>Get in Touch</span>
                    </a>
                  </div>
                </div>
                {/* The bio opens collapsed so the first screen ends on a finished card; the button reveals the rest. On laptop width up the open height follows the window height, matching the photo card. */}
                <div id="profile-full" className={`relative ${expanded ? "" : "overflow-hidden max-h-[26rem] lg:max-h-[clamp(19.75rem,calc(100svh_-_25.25rem),38.5rem)]"}`}>
                {/* Justified from tablet width up. On phones the column is too narrow: justified lines get wide word gaps, so it stays left-aligned there. */}
                <div className="space-y-space-md font-body-md text-body-md text-on-surface-variant leading-relaxed text-left sm:text-justify [hyphens:auto]">
                  <p>
                    Dr. J. Alfred Daniel is an Assistant Professor in the Department of Computer Science and Engineering at Karpagam Academy of Higher Education (KAHE), Coimbatore, India, where he also serves as the Head of the Centre for Immersive Reality and Gaming (CIRG). He is a Senior Member of the Institute of Electrical and Electronics Engineers (IEEE), with research contributions spanning intelligent computing, emerging technologies, and interdisciplinary innovation.
                  </p>
                  <p>
                    He holds a B.Tech. in Information Technology and an MBA in Software Enterprise Management from Anna University, India, and a Master's degree in Computer Engineering from Kyungpook National University, South Korea, where he was associated with the Connected Computing and Media Processing Laboratory. In 2014, he undertook an international research internship at Intel Lab, National Taiwan University, Taiwan, gaining research exposure in advanced computing and intelligent technologies.
                  </p>
                  <p>
                    His research journey began with vehicular networks and Intelligent Transportation Systems and has progressively expanded into the Internet of Things (IoT), big data analytics, Cooperative Cognitive Intelligence, autonomous and connected vehicles, artificial intelligence, machine learning, computer vision, biometric recognition, and Augmented, Virtual, and Extended Reality (AR/VR/XR). His current research interests particularly focus on AI-driven immersive systems, intelligent human–computer interaction, emotion-aware virtual environments, digital heritage visualization, adaptive learning, and intelligent rehabilitation technologies.
                  </p>
                  <p>
                    Since 2015, he has contributed to the international research community through journal and conference publications, patents, books, and book chapters. According to his Google Scholar profile, his research has received 1,335 citations, with an h-index of 21 and an i10-index of 30. His Scopus profile records 67 documents, 800 citations, and an h-index of 16. His Google Scholar journal-ranking overview identifies 14 Q1 and 5 Q2 publications among the classified recent journal papers.
                  </p>
                  <p>
                    His intellectual property portfolio comprises two granted patents and two published patent applications across Australia, South Korea, and India. His granted patents include <em>User-Friendly Navigation System through Voice Commands for the Visually Impaired as well as Elder People</em> (Australian patent, 2021) and <em>Cooperative Cognitive Intelligence for Internet of Vehicles</em> (South Korean patent, 2016). His published Indian patent applications address an IoT-based municipal water delivery and water contamination monitoring system with an automatic cutoff mechanism, and a fingerprint-based automotive vehicle starting and security system (2019).
                  </p>
                  <p>
                    He has also contributed to externally funded research initiatives, serving as Co-Principal Investigator (Co-PI) of a ₹30 lakh funded research project titled <em>Immersive Game Prototypes – Conquest of Chola Dynasty</em>, supported by the Gaming Research Initiative, New Delhi, under SERB-INAE. Implemented over a two-year period, the completed project focused on developing immersive, historically inspired gaming experiences using interactive technologies and digital content creation.
                  </p>
                  <p>
                    He co-edited the book <em>Intelligent Vehicular Communications: Fundamentals, Architectures, and Solutions</em> (Elsevier, 2016). His research contributions have been recognized through the Best Paper Award at ICSNS 2015 and an ACM Travel Grant for ACM SAC 2014.
                  </p>
                  <p>
                    As Head of the Centre for Immersive Reality and Gaming at KAHE, he promotes interdisciplinary research, innovation, and industry–academia collaboration in immersive technologies, AI-powered interactive systems, game-based learning, and emerging XR applications. Through his academic and research activities, he aims to translate advanced computing innovations into practical solutions addressing challenges across education, healthcare, transportation, cultural heritage, and sustainable development.
                  </p>
                </div>
                <div className="mt-space-lg p-space-lg bg-surface-container-low rounded-lg">
                  <p className="font-label-badge text-label-badge text-secondary uppercase tracking-wider mb-space-sm">Research Interests</p>
                  <ul className="flex flex-wrap gap-space-sm">
                    {RESEARCH_INTERESTS.map((r) => (
                      <li key={r} className="px-space-sm py-1 bg-surface-container-lowest rounded shadow-sm font-label-md text-label-md text-on-surface">{r}</li>
                    ))}
                  </ul>
                </div>
                {!expanded && <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface-container-lowest to-transparent" />}
                </div>
                <button type="button" onClick={toggleProfile} aria-expanded={expanded} aria-controls="profile-full" className="mt-space-md inline-flex items-center px-space-md py-space-sm rounded bg-surface-container-high text-on-surface font-label-md text-label-md hover:bg-surface-container-highest transition-all">
                  {expanded ? "Show less" : "Read full profile"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="w-full bg-surface-container-low py-space-2xl">
        <div className="max-w-7xl mx-auto px-gutter-desktop">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl">
            <div>
              <span className="font-label-badge text-label-badge text-secondary uppercase tracking-wider block mb-space-xs">Chronology</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Academic &amp; Research Milestones</h2>
            </div>
          </div>
          <ol className="space-y-space-md">
            {MILESTONES.map((m) => (
              <li key={m.title} className="group bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:translate-y-0">
                <div className="flex items-start gap-space-lg">
                  <div className="w-16 h-12 rounded bg-secondary-fixed group-hover:bg-primary flex items-center justify-center shrink-0 transition-colors duration-200">
                    <span className="font-headline-sm text-headline-sm text-on-secondary-fixed-variant group-hover:text-on-primary font-semibold transition-colors duration-200">{m.label}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-space-sm mb-1 flex-wrap">
                      <span className="px-space-sm py-[2px] bg-secondary-fixed text-on-secondary-fixed-variant font-label-badge text-label-badge uppercase rounded">{m.badge}</span>
                      {m.range && <span className="font-label-md text-label-md text-on-surface-variant">{m.range}</span>}
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">{m.title}</h3>
                    <p className="lg:text-justify [hyphens:auto] font-body-md text-body-md text-on-surface-variant max-w-2xl mt-1">{m.text}</p>
                  </div>
                </div>
                <div className="shrink-0 lg:text-right lg:w-64">
                  <span className="font-code-doi text-code-doi text-on-surface-variant block">{m.side}</span>
                  <span className="font-label-badge text-label-badge text-on-surface-variant uppercase">{m.sub}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Core pillars */}
      <section className="w-full py-space-2xl">
        <div className="max-w-7xl mx-auto px-gutter-desktop">
          <div className="max-w-2xl mb-space-xl">
            <span className="font-label-badge text-label-badge text-secondary uppercase tracking-wider block mb-space-xs">At a Glance</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Research, Intellectual Property &amp; Service</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">Three strands of work, summarised from the publication and credential records on this site.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop">
            {PILLARS.map((p) => (
              <a key={p.title} href={hrefTo(p.to)} className="group min-w-0 break-words bg-surface-container-lowest p-space-lg sm:p-space-xl rounded-xl shadow-sm flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg motion-reduce:hover:translate-y-0">
                <div>
                  <p className="font-headline-lg text-[3.5rem] leading-none font-semibold text-on-surface tabular-nums lining-nums">{p.figure}</p>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs mb-space-xl">{p.figureLabel}</p>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-sm">{p.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-lg">{p.text}</p>
                </div>
                <div className="pt-space-md border-t border-surface-container-high">
                  <span className="inline-flex items-center gap-space-xs text-on-surface font-label-md text-label-md">
                    {p.cta}
                    <Icon name="arrow_forward" className="text-[16px] transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Outreach */}
      <section className="w-full py-space-2xl bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-gutter-desktop">
          <div className="relative overflow-hidden bg-gradient-to-br from-[#1A1A1A] via-[#222222] to-[#3A3A3A] text-inverse-on-surface rounded-xl p-space-xl md:p-space-2xl flex flex-col md:flex-row items-center justify-between gap-space-xl shadow-xl">
            <div className="relative max-w-2xl">
              <span className="font-label-badge text-label-badge text-on-primary-fixed-variant uppercase tracking-widest block mb-space-xs">Collaboration</span>
              <h2 className="font-headline-lg text-headline-lg text-inverse-on-surface tracking-tight">Collaborate on Research</h2>
              <p className="lg:text-justify [hyphens:auto] font-body-lg text-body-lg text-inverse-on-surface/80 mt-space-sm leading-relaxed">
                For research collaboration, student projects or reviewing requests, write to Dr.&nbsp;Daniel directly or browse the full publication record.
              </p>
            </div>
            <div className="relative flex flex-col sm:flex-row gap-space-md shrink-0 w-full md:w-auto">
              <a className="inline-flex items-center justify-center gap-space-xs px-space-lg py-space-md rounded bg-surface-container-lowest text-primary font-label-md text-label-md hover:bg-surface-container-high transition-all" href={hrefTo("contact")}>
                <span>Contact</span>
              </a>
              <a className="inline-flex items-center justify-center gap-space-xs px-space-lg py-space-md rounded border border-white/30 text-inverse-on-surface font-label-md text-label-md hover:bg-white/10 transition-all" href={hrefTo("publications")}>
                <span>Browse Publications</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
