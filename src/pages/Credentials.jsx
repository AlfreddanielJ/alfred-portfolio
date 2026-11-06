import { Icon, Breadcrumb, Ext } from "../components/ui.jsx";
import RecordLogo from "../components/RecordLogo.jsx";
import Section, { card } from "../components/Section.jsx";
import { PROFILES, EDUCATION, TRAINING, RECOGNITION, REVIEWER_FOR, AWARDS } from "../lib/profile.js";

const STANDING = [
  { figure: "SMIEEE", tag: "Professional standing", title: "Senior Member, IEEE", text: "Senior Member of the Institute of Electrical and Electronics Engineers, with an active profile on IEEE Collabratec." },
  { figure: "2015", tag: "Best paper", title: AWARDS[0].title, text: AWARDS[0].detail + "." },
  { figure: "2014", tag: "Travel grant", title: AWARDS[1].title, text: `Awarded a travel grant for the ACM Symposium on Applied Computing (${AWARDS[1].detail}).` },
];

export default function Credentials() {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#1A1A1A] via-[#222222] to-[#3A3A3A] text-white">
        <div className="max-w-7xl mx-auto px-gutter-desktop py-space-xl">
          <Breadcrumb current="Research Credentials" light />
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-[2px] bg-white/10 text-white rounded-full mb-space-sm">
              <span className="font-label-badge text-label-badge uppercase tracking-wider">Credentials &amp; Recognition</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-white tracking-tight mb-space-sm">Academic Credentials &amp; Professional Distinctions</h1>
            <p className="justify-prose font-body-lg text-body-lg text-white/80 leading-relaxed">
              Qualifications, awards, peer-review service and research training, drawn from Dr. Daniel's Research Credentials record.
            </p>
          </div>
        </div>
      </section>

      {/* 1. Identifiers */}
      <Section id="identifiers" title="Profiles & Identifiers" text="Public profiles and records for his work and publications.">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-md">
          {PROFILES.map((r) => (
            <li key={r.label}>
              <Ext href={r.href} className={`group flex items-center gap-space-md p-space-md h-full ${card()}`}>
                <RecordLogo name={r.label} />
                <span className="min-w-0 flex-1">
                  <span className="font-label-md text-label-md text-on-surface block">{r.label}</span>
                  <span className="font-code-doi text-code-doi text-on-surface-variant block truncate">{r.detail}</span>
                </span>
                <Icon name="arrow_outward" className="text-[18px] text-outline group-hover:text-on-surface transition-colors shrink-0" />
              </Ext>
            </li>
          ))}
        </ul>
      </Section>

      {/* 2. Education */}
      <Section id="education" tone="soft" title="Education" text="Three degrees across engineering, management and computer engineering.">
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          {EDUCATION.map((e) => (
            <li key={e.degree} className={`p-space-lg ${card()}`}>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-space-sm">{e.degree}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">{e.place}</p>
              {e.note && <p className="font-body-citation text-body-citation text-outline mt-space-xs">{e.note}</p>}
            </li>
          ))}
        </ol>
      </Section>

      {/* 3. Standing, awards and grants */}
      <Section id="standing" title="Standing, Awards & Grants" text="Professional membership and the recognitions received for his research.">
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          {STANDING.map((c) => (
            <li key={c.title} className={`p-space-lg flex flex-col ${card()}`}>
              <p className="font-headline-lg text-[2.75rem] leading-none font-semibold text-on-surface tabular-nums lining-nums">{c.figure}</p>
              <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs mb-space-lg">{c.tag}</p>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">{c.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">{c.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 4. Peer review */}
      <Section id="peer-review" tone="soft" title="Peer Review & Editorial Service" text="Reviewer recognitions from 2015 to 2017, a guest editorial, and the venues he reviews for.">
        <h3 className="font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant mb-space-md">Reviewer recognitions</h3>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-space-md mb-space-xl">
          {RECOGNITION.map((r) => (
            <li key={r.venue} className={`p-space-lg flex flex-col ${card()}`}>
              <div className="flex items-center justify-between gap-space-sm mb-space-md">
                <span className="px-space-sm py-[2px] bg-surface-container text-on-surface rounded font-label-badge text-label-badge uppercase tracking-wider">Elsevier</span>
                <span className="font-label-badge text-label-badge text-on-surface-variant uppercase">{r.badge}</span>
              </div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">{r.venue}</h4>
              <p className="font-body-md text-body-md text-on-surface-variant">{r.detail}</p>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-md">
          <div className={`p-space-lg flex flex-col ${card()}`}>
            <h3 className="font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant mb-space-md">Guest editorial</h3>
            <h4 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">IEEE Robotics &amp; Automation Magazine</h4>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Co-authored the guest editors' introduction, <em>Embracing Robotics and Intelligent Machine Systems for Smart Agricultural Applications</em> (2023).
            </p>
          </div>

          <div className={`p-space-lg lg:col-span-2 ${card()}`}>
            <h3 className="font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant mb-space-md">Reviews for</h3>
            <dl className="divide-y divide-surface-container-high">
              {REVIEWER_FOR.map(([pub, list]) => (
                <div key={pub} className="py-space-sm first:pt-0 last:pb-0 sm:grid sm:grid-cols-[9rem_1fr] sm:gap-space-md">
                  <dt className="font-label-md text-label-md text-on-surface">{pub}</dt>
                  <dd className="font-body-citation text-body-citation text-on-surface-variant">{list}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* 5. Training */}
      <Section id="training" title="Internships, Training & Competitions" text="Research placements and student competitions, with the certificates on record.">
        <ol className="space-y-space-md">
          {TRAINING.map((t) => (
            <li key={t.what + t.where} className={`p-space-lg md:grid md:grid-cols-[11rem_1fr] md:gap-space-lg ${card()}`}>
              <div className="mb-space-sm md:mb-0">
                <span className="font-headline-sm text-headline-sm text-on-surface block">{t.when}</span>
                <span className="font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant">{t.tag}</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">{t.what}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{t.where}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  );
}
