/* Contact form handler: validates a message and emails it through Resend.
   Runs ONLY on the server (Vite dev/preview middleware locally, api/contact.js in production),
   so RESEND_API_KEY is never sent to the browser.

   Environment (see .env.example):
     RESEND_API_KEY      required
     CONTACT_TO_EMAIL    required: where messages are delivered
     CONTACT_FROM_EMAIL  optional: defaults to Resend's shared sender, onboarding@resend.dev */

const RESEND_URL = "https://api.resend.com/emails";
const DEFAULT_FROM = "Portfolio Contact <onboarding@resend.dev>";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* A person gets 5 messages per 10 minutes. In-memory, so it resets when the server restarts;
   it exists to stop accidental double-sends and trivial abuse. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) { hits.set(ip, recent); return true; }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  return false;
}

/* Single-line fields must not contain line breaks (header injection) and are length-capped. */
const oneLine = (s, max) => String(s ?? "").replace(/[\r\n\t]+/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
const multiLine = (s, max) => String(s ?? "").replace(/\r\n?/g, "\n").trim().slice(0, max);
const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const reply = (status, body) => ({ status, body });

/* body: { name, email, dept, message, website }   (website is a hidden honeypot field) */
export async function handleContact({ body, env, ip = "unknown" }) {
  if (!body || typeof body !== "object") return reply(400, { error: "Invalid request." });

  /* Bots fill the hidden field; pretend success so they learn nothing. */
  if (body.website) return reply(200, { ok: true });

  const name = oneLine(body.name, 100);
  const email = oneLine(body.email, 254);
  const dept = oneLine(body.dept, 150);
  const message = multiLine(body.message, 5000);

  if (!name) return reply(400, { error: "Please enter your name." });
  if (!EMAIL_RE.test(email)) return reply(400, { error: "Please enter a valid email address." });
  if (!dept) return reply(400, { error: "Please enter your department or organization." });
  if (message.length < 10) return reply(400, { error: "Please write a message of at least 10 characters." });

  if (rateLimited(ip)) return reply(429, { error: "Too many messages. Please try again in a few minutes." });

  const apiKey = env.RESEND_API_KEY;
  const to = env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is not set.");
    return reply(500, { error: "The contact form is not available right now." });
  }

  const subject = `New message from ${name} (${dept})`;
  const text = `${message}\n\n--\n${name}\n${dept}\n${email}`;
  const html = `<p style="white-space:pre-wrap;font:15px/1.6 sans-serif">${escapeHtml(message)}</p>
<hr><p style="font:14px/1.6 sans-serif;color:#555"><strong>${escapeHtml(name)}</strong><br>${escapeHtml(dept)}<br><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(RESEND_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL || DEFAULT_FROM,
        to: [to],
        reply_to: email, /* hitting Reply in the inbox answers the visitor */
        subject,
        text,
        html,
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const detail = await res.json().catch(() => ({}));
      console.error(`[contact] Resend responded ${res.status}:`, detail.message || detail);
      return reply(502, { error: "The message could not be sent. Please email directly instead." });
    }
    return reply(200, { ok: true });
  } catch (err) {
    console.error("[contact] Resend request failed:", err.name === "AbortError" ? "timed out" : err.message);
    return reply(502, { error: "The message could not be sent. Please email directly instead." });
  } finally {
    clearTimeout(timer);
  }
}
