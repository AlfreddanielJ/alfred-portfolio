import { useState } from "react";
import { Icon, Breadcrumb, Ext } from "../components/ui.jsx";
import RecordLogo from "../components/RecordLogo.jsx";
import Section, { card } from "../components/Section.jsx";
import { PROFILE, LINKS, PROFILES } from "../lib/profile.js";

/* All three addresses from his profile page, each with its own Copy button. */
const EMAILS = [PROFILE.email, ...PROFILE.emailAlt];

const inputCls =
  "w-full px-space-md py-space-sm bg-surface-container-low border border-outline-variant hover:border-outline rounded-lg text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-all placeholder:text-outline";

function DetailRow({ label, children }) {
  return (
    <div className="py-space-md first:pt-0 last:pb-0">
      <span className="font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant block mb-space-xs">{label}</span>
      {children}
    </div>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(null); /* the address that was just copied */
  const [status, setStatus] = useState("idle"); /* idle | sending | sent | error */
  const [error, setError] = useState("");

  const copyEmail = async (address) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(address);
      setTimeout(() => setCopied((c) => (c === address ? null : c)), 2000);
    } catch {
      /* clipboard blocked: the address stays selectable */
    }
  };

  /* Posts to /api/contact, which emails the message through Resend (the API key stays on the server). */
  const submit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const f = new FormData(form);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: f.get("name"),
          email: f.get("email"),
          dept: f.get("dept"),
          message: f.get("message"),
          website: f.get("website"), /* hidden spam trap: real visitors leave it empty */
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "The message could not be sent. Please email directly instead.");
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof TypeError ? "Could not reach the server. Please check your connection or email directly." : err.message);
      setStatus("error");
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header: the primary action is right here */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#1A1A1A] via-[#222222] to-[#3A3A3A] text-white">
        <div className="max-w-7xl mx-auto px-gutter-desktop py-space-xl">
          <Breadcrumb current="Contact" variant="slash" light />
          <div className="max-w-3xl">
            <h1 className="font-headline-lg text-headline-lg text-white mb-space-sm tracking-tight">Contact Dr. Daniel</h1>
            <p className="justify-prose font-body-lg text-body-lg text-white/80 leading-relaxed">
              For research collaboration, student projects or reviewing requests.
            </p>
            <div className="flex flex-wrap gap-space-sm mt-space-lg">
              <a href="#message" className="inline-flex items-center gap-space-xs px-space-lg py-space-md rounded bg-white text-primary font-label-md text-label-md font-bold hover:bg-surface-container-high transition-colors">
                <span>Send a message</span>
              </a>
              <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center gap-space-xs px-space-lg py-space-md rounded border border-white/30 text-white font-label-md text-label-md font-semibold hover:bg-white/10 transition-colors">
                <span>Email directly</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Message + direct contact */}
      <section id="message" className="w-full py-space-2xl scroll-mt-20">
        <div className="max-w-7xl mx-auto px-gutter-desktop grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
          <div className={`lg:col-span-7 p-space-lg sm:p-space-xl ${card()}`}>
            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Send a message</h2>
            <p className="justify-prose font-body-md text-body-md text-on-surface-variant mt-space-xs mb-space-xl">
              Your message goes straight to Dr. Daniel's inbox, and he can reply to you directly.
            </p>
            <form className="flex flex-col gap-space-lg" onSubmit={submit} aria-busy={status === "sending"}>
              {/* Spam trap: hidden from people and screen readers, bots tend to fill it in. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="website">Leave this field empty</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                <div className="flex flex-col gap-space-xs">
                  <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="full-name">Full name</label>
                  <input className={inputCls} id="full-name" name="name" placeholder="Your name" required autoComplete="name" type="text" />
                </div>
                <div className="flex flex-col gap-space-xs">
                  <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="contact-email">Email address</label>
                  <input className={inputCls} id="contact-email" name="email" placeholder="you@example.com" required autoComplete="email" type="email" />
                </div>
              </div>
              <div className="flex flex-col gap-space-xs">
                <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="dept">Department or organization</label>
                <input className={inputCls} id="dept" name="dept" placeholder="e.g. Department of CSE, University" required maxLength={150} autoComplete="organization" type="text" />
              </div>
              <div className="flex flex-col gap-space-xs">
                <div className="flex flex-wrap items-baseline justify-between gap-x-space-sm">
                  <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="message-field">Message</label>
                  <span className="font-label-badge text-label-badge text-on-surface-variant">Links to papers or DOIs are welcome</span>
                </div>
                <textarea className={`${inputCls} p-space-md resize-y leading-relaxed`} id="message-field" name="message" rows={6} required minLength={10} maxLength={5000} placeholder="Describe your question, project or request." />
              </div>

              {(status === "sent" || status === "error") && (
                <div role={status === "error" ? "alert" : "status"} className={`p-space-md rounded-lg flex items-center justify-between gap-space-sm ${status === "error" ? "bg-error-container text-on-error-container" : "bg-surface-container text-on-surface"}`}>
                  <div className="flex items-center gap-space-sm">
                    <Icon name={status === "error" ? "error" : "check_circle"} fill />
                    <span className="font-body-md text-body-md font-semibold">
                      {status === "error"
                        ? <>{error} <a className="underline" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></>
                        : "Message sent. Thank you, Dr. Daniel will get back to you."}
                    </span>
                  </div>
                  <button type="button" aria-label="Dismiss message" onClick={() => setStatus("idle")} className="hover:opacity-75 shrink-0">
                    <Icon name="close" className="text-[18px]" />
                  </button>
                </div>
              )}

              <div className="pt-space-xs flex flex-col sm:flex-row items-center justify-between gap-space-md">
                <span className="font-label-badge text-label-badge text-outline uppercase tracking-wider">Nothing is stored on this site</span>
                <button disabled={status === "sending"} className="w-full sm:w-auto px-space-xl py-space-md bg-primary hover:bg-surface-tint text-on-primary rounded-lg font-label-md text-label-md font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-space-sm disabled:opacity-60 disabled:cursor-wait" type="submit">
                  <span>{status === "sending" ? "Sending..." : "Send message"}</span>
                  {status === "sending" && <Icon name="progress_activity" className="text-[18px] animate-spin motion-reduce:animate-none" />}
                </button>
              </div>
            </form>
          </div>

          <aside className={`lg:col-span-5 p-space-lg flex flex-col gap-space-lg ${card()}`} aria-label="Direct contact details">
            <h2 className="font-headline-md text-headline-md text-on-surface">Direct contact</h2>
            <div className="divide-y divide-surface-container-high">
            <DetailRow label="Email">
              <ul className="space-y-space-xs">
                {EMAILS.map((address) => (
                  <li key={address} className="flex items-center gap-space-sm bg-surface-container-low rounded-lg py-1 pl-space-sm pr-1">
                    <a href={`mailto:${address}`} className="min-w-0 flex-1 font-code-doi text-code-doi text-on-surface font-semibold break-words select-all hover:underline">{address.split("@")[0]}@<wbr />{address.split("@")[1]}</a>
                    {copied === address && <span className="font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant">Copied</span>}
                    <button type="button" aria-label={`Copy ${address}`} title="Copy address" onClick={() => copyEmail(address)} className="w-9 h-9 shrink-0 flex items-center justify-center rounded-md bg-primary text-on-primary hover:bg-surface-tint transition-colors active:scale-95">
                      <Icon name={copied === address ? "check" : "content_copy"} className="text-[18px]" />
                    </button>
                  </li>
                ))}
              </ul>
              <span role="status" className="sr-only">{copied ? `${copied} copied to clipboard` : ""}</span>
            </DetailRow>
            <DetailRow label="Phone">
              <a href={`tel:${PROFILE.phone}`} className="font-code-doi text-code-doi text-on-surface font-semibold hover:underline">{PROFILE.phoneDisplay}</a>
            </DetailRow>
            <DetailRow label="Address">
              <p className="font-body-md text-body-md text-on-surface font-semibold">Computer Science and Engineering</p>
              <p className="font-body-md text-body-md text-on-surface-variant">{PROFILE.institution}</p>
              <p className="font-body-citation text-body-citation text-on-surface-variant">{PROFILE.city}</p>
              <Ext href={LINKS.maps} className="inline-flex items-center gap-space-xs mt-space-sm text-on-surface font-label-md text-label-md hover:underline">
                <span>Open in Google Maps</span>
                <Icon name="arrow_outward" className="text-[14px]" />
              </Ext>
            </DetailRow>
            </div>
          </aside>
        </div>
      </section>

      {/* Profiles with logos */}
      <Section id="online" tone="soft" title="Find Dr. Daniel online" text="Professional and scholarly profiles.">
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
    </div>
  );
}
