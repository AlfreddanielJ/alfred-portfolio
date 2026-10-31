import RAW from "../data/publications.js";

export const PUBS = RAW.map(([kind, year, title, venue, authors, link], i) => ({
  id: i, kind, year, title, venue, authors, link,
  doi: link && link.startsWith("https://doi.org/") ? link.slice("https://doi.org/".length) : null,
}));

export const WORKS = PUBS.filter((p) => ["sci", "idx", "oth", "conf"].includes(p.kind));
export const PATENTS = PUBS.filter((p) => p.kind === "pat");
export const BOOKS = PUBS.filter((p) => p.kind === "book");
export const CHAPTERS = PUBS.filter((p) => p.kind === "chap");

export const COUNTS = {
  journals: PUBS.filter((p) => ["sci", "idx", "oth"].includes(p.kind)).length,
  sci: PUBS.filter((p) => p.kind === "sci").length,
  idx: PUBS.filter((p) => p.kind === "idx").length,
  conf: PUBS.filter((p) => p.kind === "conf").length,
  patents: PATENTS.length,
  books: BOOKS.length,
  chapters: CHAPTERS.length,
  total: PUBS.length,
};

/* Publisher shown as a badge — only where it can be stated with confidence. */
const PUBLISHERS = [
  [/IEEE/i, "IEEE"],
  [/\bACM\b/, "ACM"],
  [/MDPI/i, "MDPI"],
  [/Wiley/i, "Wiley"],
  [/\bIET\b/, "IET"],
  [/Frontiers/i, "Frontiers"],
  [/Springer|Multimedia Tools|Wireless Networks|Int J Comput Intell|Combinatorial Optimization|Arabian Journal/i, "Springer"],
  [/Elsevier|Vehicular Communications|Microprocessors and Microsystems|Computers and Electrical|Journal of Psychiatric/i, "Elsevier"],
];
export const publisherOf = (venue) => {
  const hit = PUBLISHERS.find(([re]) => re.test(venue));
  return hit ? hit[1] : null;
};

/* Publication counts per year, for the small trajectory charts. */
export function countsByYear(list, from, to) {
  const out = [];
  for (let y = from; y <= to; y++) out.push([y, list.filter((p) => p.year === y).length]);
  return out;
}

export const AREA_MATCH = {
  ai: /\b(AI|machine learning|deep learning|neural|artificial intelligence|YOLO\w*|Q-Network|LSTM|learning)\b/i,
  xr: /\b(extended reality|XR|immersive|gamification|game|augmented|virtual|3D)\b/i,
  its: /(intelligent transport|\bITS\b|vehic|pothole|highway|VANET|traffic)/i,
  av: /\b(autonomous|self-driving|pedestrian|driver)\b/i,
  iot: /(\bIoT\b|internet of things|internet of vehicles|sensor)/i,
};
export const matchArea = (re) => PUBS.filter((p) => re.test(`${p.title} ${p.venue}`));

/* BibTeX built only from the fields recorded for each entry. */
const esc = (s) => (s || "").replace(/[{}]/g, "");

/* BibTeX separates authors with " and ". The source lists use several formats, so only convert
   when the split is unambiguous; otherwise keep the text exactly as written, protected in a
   double-braced literal so tools do not mis-split it. "et al." becomes "and others". */
function bibAuthors(raw) {
  let s = esc(raw).trim();
  const etAl = /\s*,?\s+et al\.?$/i.test(s);
  if (etAl) s = s.replace(/\s*,?\s+et al\.?$/i, "").trim();
  const withOthers = (list) => list.join(" and ") + (etAl ? " and others" : "");

  if (s.includes(";")) return withOthers(s.split(";").map((t) => t.trim()).filter(Boolean));

  const tokens = s.split(",").map((t) => t.trim()).filter(Boolean);
  if (tokens.length === 1) return withOthers(tokens);
  if (tokens.every((t) => /\S\s+\S/.test(t))) return withOthers(tokens); /* "First Last, First Last" */

  return `{${s}${etAl ? " et al." : ""}}`; /* "Last, I., Last, I." is ambiguous: keep verbatim */
}
export function toBibtex(p) {
  const first = (p.authors.split(/[;,]/)[0] || "anon").replace(/[^A-Za-z]/g, "").toLowerCase() || "anon";
  const word = (p.title.split(/\s+/).find((w) => w.length > 3) || "work").replace(/[^A-Za-z]/g, "").toLowerCase();
  const key = `${first}${p.year || "nd"}${word}`;
  const type = p.kind === "conf" ? "inproceedings" : p.kind === "book" ? "book" : p.kind === "chap" ? "incollection" : p.kind === "pat" ? "misc" : "article";
  const venueField = p.kind === "conf" || p.kind === "chap" ? "booktitle" : p.kind === "book" ? "publisher" : p.kind === "pat" ? "howpublished" : "journal";
  const lines = [`@${type}{${key},`, `  title={${esc(p.title)}},`];
  if (p.authors) lines.push(`  author={${bibAuthors(p.authors)}},`);
  lines.push(`  ${venueField}={${esc(p.venue)}},`);
  if (p.year) lines.push(`  year={${p.year}},`);
  if (p.doi) lines.push(`  doi={${p.doi}},`);
  lines.push("}");
  return lines.join("\n");
}
