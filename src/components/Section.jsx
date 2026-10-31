/* Shared page-section pattern: one concern per section, with a heading, one line saying what it
   covers, then its content. Two light tones keep a page from reading as one flat sheet. */

export const LIFT = "transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 motion-reduce:hover:translate-y-0";

/* White card with the standard hover lift. */
export const card = () => `bg-surface-container-lowest rounded-xl shadow-sm ${LIFT}`;

const SECTION_BG = {
  page: "",
  soft: "bg-gradient-to-b from-[#E6E6E6] to-[#F6F6F6]",
};

export default function Section({ id, tone = "page", title, text, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={`w-full py-space-2xl ${SECTION_BG[tone]}`}>
      <div className="max-w-7xl mx-auto px-gutter-desktop">
        <div className="max-w-2xl mb-space-xl">
          <h2 id={`${id}-h`} className="font-headline-lg text-headline-lg tracking-tight text-on-surface">{title}</h2>
          {text && <p className="font-body-md text-body-md mt-space-xs text-on-surface-variant">{text}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
