import orcid from "../assets/logos/orcid.svg";
import googlescholar from "../assets/logos/googlescholar.svg";
import scopus from "../assets/logos/scopus.svg";
import researchgate from "../assets/logos/researchgate.svg";
import clarivate from "../assets/logos/clarivate.svg";
import linkedin from "../assets/logos/linkedin.svg";

/* Brand marks from the Simple Icons set (v13.21.0). Web of Science is a Clarivate
   product and has no mark of its own in that set, so the Clarivate mark is used. */
const LOGOS = {
  "LinkedIn": { src: linkedin, color: "#0A66C2" },
  "ORCID Record": { src: orcid, color: "#A6CE39" },
  "Google Scholar": { src: googlescholar, color: "#4285F4" },
  "Scopus Author ID": { src: scopus, color: "#E9711C" },
  "Web of Science": { src: clarivate, color: "#1A1A1A" },
  "ResearchGate Profile": { src: researchgate, color: "#00CCBB" },
};

/* Decorative: the record name is always shown as text beside it. */
export default function RecordLogo({ name }) {
  const logo = LOGOS[name];
  if (!logo) return null;
  const mask = `url(${logo.src}) center / contain no-repeat`;
  return (
    <span className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0" aria-hidden="true">
      <span className="block w-5 h-5" style={{ backgroundColor: logo.color, WebkitMask: mask, mask }} />
    </span>
  );
}
