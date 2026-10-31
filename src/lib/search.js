/* Publication search.
   - Case- and accent-insensitive; every word must match (any order); partial words match ("vehic").
   - "quoted phrases" match exactly; author:paul, title:, venue:, year:, doi: search a single field.
   - The text of every record is normalised once up front, so a keystroke only runs cheap
     string checks (62 records, well under a millisecond), never re-normalising or re-parsing data. */

export const norm = (s) =>
  String(s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const FIELD = {
  title: "title",
  author: "authors", authors: "authors", by: "authors",
  venue: "venue", journal: "venue", conference: "venue", conf: "venue",
  year: "year",
  doi: "doi",
};

/* Build the searchable index once. */
export function buildIndex(list) {
  return list.map((p) => {
    const f = {
      title: norm(p.title),
      authors: norm(p.authors),
      venue: norm(p.venue),
      year: p.year ? String(p.year) : "",
      doi: norm(p.doi),
    };
    return { p, f, all: `${f.title} ${f.authors} ${f.venue} ${f.year} ${f.doi}` };
  });
}

/* "deep q-network" author:paul year:2023  →  [{field, text}, ...] */
export function parseQuery(raw) {
  const terms = [];
  const re = /(?:(\w+):)?(?:"([^"]*)"|(\S+))/g;
  let m;
  while ((m = re.exec(raw))) {
    const field = m[1] ? FIELD[m[1].toLowerCase()] : undefined;
    let text = m[2] ?? m[3] ?? "";
    if (m[1] && !field) text = `${m[1]}:${text}`; /* unknown prefix: treat as plain text */
    text = norm(text).replace(/^"+|"+$/g, "").trim();
    if (!text) continue;
    if (!field && text.endsWith(":")) continue; /* "author:" typed so far: no filter yet */
    terms.push({ field, text });
  }
  return terms;
}

/* -1 = no match; otherwise a relevance score (title > authors > venue). */
export function score(rec, terms) {
  let total = 0;
  for (const t of terms) {
    if (t.field) {
      if (!rec.f[t.field].includes(t.text)) return -1;
      total += 2;
      continue;
    }
    if (!rec.all.includes(t.text)) return -1;
    if (rec.f.title.includes(t.text)) total += 3;
    if (rec.f.authors.includes(t.text)) total += 2;
    if (rec.f.venue.includes(t.text)) total += 1;
  }
  return total;
}

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/* One regex per visible field, built once per query (not per card). */
export function buildHighlighters(terms) {
  const make = (field) => {
    const texts = terms.filter((t) => !t.field || t.field === field).map((t) => t.text);
    if (!texts.length) return null;
    texts.sort((a, b) => b.length - a.length);
    return new RegExp(`(${texts.map(esc).join("|")})`, "gi");
  };
  return { title: make("title"), authors: make("authors"), venue: make("venue") };
}
