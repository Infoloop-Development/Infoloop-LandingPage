import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight } from "@/components/ui";
import { CONTACT } from "@/content/contact";
import { trackEvent } from "@/lib/track";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Contact page form (7Span field set): name, email, phone, company, country,
 * looking for, about project, budget, timeline, how did you hear about us.
 * Posts JSON to /api/contact with a honeypot and page/UTM stamps.
 */
export function ContactForm() {
  const F = CONTACT.form;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (status === "sent") doneRef.current?.focus();
  }, [status]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const params = new URLSearchParams(window.location.search);
    const payload = { ...data, type: "project", submitted_from: window.location.pathname, utm_source: params.get("utm_source") ?? "", utm_medium: params.get("utm_medium") ?? "", utm_campaign: params.get("utm_campaign") ?? "" };
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error || "Something went wrong.");
      }
      setStatus("sent");
      trackEvent("generate_lead", { form_type: "project", page: window.location.pathname });
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const input = "mt-1.5 w-full border border-ink bg-white px-3.5 py-2.5 text-[15px] text-ink placeholder:text-ink/40 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/40";
  const label = "block text-[13px] font-medium text-ink";
  const Select = ({ id, name, options, placeholder = "Select" }: { id: string; name: string; options: readonly string[]; placeholder?: string }) => (
    <div className="relative">
      <select id={id} name={name} required defaultValue="" className={`${input} cursor-pointer appearance-none pr-9`}>
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => (<option key={o} value={o}>{o}</option>))}
      </select>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className="pointer-events-none absolute right-3.5 top-[calc(50%+3px)] -translate-y-1/2 text-ink/60"><path d="m3 5 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </div>
  );

  if (status === "sent") {
    return (
      <div className="flex h-full flex-col justify-center p-8 sm:p-10">
        <p role="status" aria-live="polite" className="sr-only">Message sent. We will reply within one business day.</p>
        <p className="eyebrow text-orange">Received</p>
        <h3 ref={doneRef} tabIndex={-1} className="mt-3 font-display text-[24px] font-bold leading-tight text-ink outline-none">{F.success.h3}</h3>
        <p className="mt-3 text-[15px] text-ink/70">{F.success.body}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="p-6 sm:p-8" aria-label={F.h2}>
      <p role="status" aria-live="polite" className="sr-only">{status === "sending" ? "Sending." : status === "error" ? error ?? "" : ""}</p>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label htmlFor="c-name" className={label}>Name</label><input id="c-name" name="name" type="text" required autoComplete="name" className={input} /></div>
        <div><label htmlFor="c-email" className={label}>Email</label><input id="c-email" name="email" type="email" required autoComplete="email" className={input} /></div>
        <div><label htmlFor="c-phone" className={label}>Phone number</label><input id="c-phone" name="phone" type="tel" autoComplete="tel" className={input} /></div>
        <div><label htmlFor="c-company" className={label}>Company</label><input id="c-company" name="company" type="text" autoComplete="organization" className={input} /></div>
        <div className="sm:col-span-2"><label htmlFor="c-country" className={label}>Country</label><Select id="c-country" name="country" options={F.countries} /></div>
        <div className="sm:col-span-2"><label htmlFor="c-looking" className={label}>Looking for</label><Select id="c-looking" name="lookingFor" options={F.lookingFor} /></div>
        <div className="sm:col-span-2"><label htmlFor="c-about" className={label}>About project</label><textarea id="c-about" name="message" rows={4} required className={input} /></div>
        <div><label htmlFor="c-budget" className={label}>Project budget (in USD)</label><Select id="c-budget" name="budget" options={F.budgets} /></div>
        <div><label htmlFor="c-timeline" className={label}>Project timeline</label><Select id="c-timeline" name="timeline" options={F.timelines} /></div>
        <div className="sm:col-span-2"><label htmlFor="c-source" className={label}>How did you hear about us?</label><input id="c-source" name="source" type="text" className={input} /></div>
      </div>
      {error && (<p className="mt-4 flex items-start gap-2 text-[14px] text-ink" role="alert"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" aria-hidden="true" />{error}</p>)}
      <button type="submit" className="btn btn-ink mt-6 w-full justify-center py-4" disabled={status === "sending"}>
        {status === "sending" ? "Sending" : F.submit} <ArrowRight />
      </button>
      <p className="mt-3 text-center text-[12px] text-ink/55">No newsletter, no spam. We only reply about your project.</p>
    </form>
  );
}
