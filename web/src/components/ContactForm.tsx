import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight } from "@/components/ui";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Short lead form. Posts JSON to /api/contact. Fields mirror the current
 * infoloop.co contact form (name, work email, company, interest, message)
 * plus a honeypot and the page path / UTM stamps the existing site records.
 */
export function ContactForm({ interests }: { interests: readonly string[] }) {
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
    const payload = {
      ...data,
      submitted_from: window.location.pathname,
      utm_source: params.get("utm_source") ?? "",
      utm_medium: params.get("utm_medium") ?? "",
      utm_campaign: params.get("utm_campaign") ?? "",
    };
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error || "Something went wrong.");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-line-dark bg-charcoal p-8 text-white">
        <p role="status" aria-live="polite" className="sr-only">
          Message sent. We will reply within one business day.
        </p>
        <p className="eyebrow text-orange">Received</p>
        <h3 ref={doneRef} tabIndex={-1} className="mt-3 font-display text-[24px] font-bold leading-tight outline-none">
          Thanks. We will reply within one business day.
        </h3>
        <p className="mt-3 text-[15px] text-gray-40">
          You will hear from the person who would run your project, not a sales desk.
        </p>
      </div>
    );
  }

  const input =
    "w-full rounded-md border border-white/25 bg-ink px-3.5 py-3 text-[15px] text-white placeholder:text-gray-60 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/40";
  const label = "block font-display text-[13px] font-semibold text-gray-40";

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border border-line-dark bg-charcoal p-6 sm:p-8"
      aria-labelledby="form-help"
    >
      <p role="status" aria-live="polite" className="sr-only">
        {status === "sending" ? "Sending your message." : status === "error" ? error ?? "" : ""}
      </p>
      <p id="form-help" className="font-display text-[20px] font-bold text-white">
        Tell us what you are planning
      </p>
      <p className="mt-1 text-[14px] text-gray-40">Two minutes. No pitch deck needed.</p>

      {/* Honeypot: real users never see or fill this. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>
            Name
          </label>
          <input id="cf-name" name="name" type="text" required autoComplete="name" className={`mt-1.5 ${input}`} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="cf-email" className={label}>
            Work email
          </label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" className={`mt-1.5 ${input}`} placeholder="you@company.com" />
        </div>
        <div>
          <label htmlFor="cf-company" className={label}>
            Company
          </label>
          <input id="cf-company" name="company" type="text" autoComplete="organization" className={`mt-1.5 ${input}`} placeholder="Company" />
        </div>
        <div>
          <label htmlFor="cf-interest" className={label}>
            What do you need?
          </label>
          <select id="cf-interest" name="interest" className={`mt-1.5 ${input}`} defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            {interests.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-message" className={label}>
            A few lines about the project
          </label>
          <textarea
            id="cf-message"
            name="message"
            rows={4}
            className={`mt-1.5 ${input}`}
            placeholder="What are you trying to build or fix, and by when?"
          />
        </div>
      </div>

      {error && (
        <p className="mt-4 flex items-start gap-2 text-[14px] text-white" role="alert">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" aria-hidden="true" />
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
          {status === "sending" ? "Sending" : "Request a call"}
          <ArrowRight />
        </button>
        <p className="text-[12px] text-gray-40">No newsletter, no spam. We only reply about your project.</p>
      </div>
    </form>
  );
}
