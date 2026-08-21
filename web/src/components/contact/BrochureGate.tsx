import { useState, type FormEvent } from "react";
import { ArrowRight } from "@/components/ui";
import { CONTACT } from "@/content/contact";
import { trackEvent } from "@/lib/track";

/**
 * "Download brochure" (7Span): the button opens a two-field gate (name,
 * work email); on submit the lead is posted to /api/contact as type
 * "brochure" and the PDF opens in a new tab.
 */
export function BrochureGate() {
  const B = CONTACT.brochure;
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, type: "brochure", submitted_from: window.location.pathname }) });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error || "Something went wrong.");
      }
      setStatus("done");
      trackEvent("brochure_requested", { form_type: "brochure", page: window.location.pathname });
      window.open(B.file, "_blank", "noopener");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (!open) {
    return (
      <button type="button" className="btn btn-primary px-7 py-4 text-[16px]" onClick={() => setOpen(true)}>
        {B.button} <ArrowRight />
      </button>
    );
  }
  if (status === "done") {
    return (
      <div className="mx-auto max-w-md border border-white/25 p-6 text-left" role="status">
        <p className="font-display text-[18px] font-bold text-white">Your brochure is open in a new tab.</p>
        <p className="mt-2 text-[14px] text-gray-40">
          If it did not open, <a href={B.file} target="_blank" rel="noopener" className="font-semibold text-white underline decoration-orange underline-offset-4">download it here</a>.
        </p>
      </div>
    );
  }
  const input = "mt-1.5 w-full border border-white/30 bg-ink px-3.5 py-2.5 text-[15px] text-white placeholder:text-gray-60 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/40";
  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-md border border-white/25 p-6 text-left" aria-label={B.gate.h3}>
      <p className="font-display text-[18px] font-bold text-white">{B.gate.h3}</p>
      <p className="mt-1 text-[14px] text-gray-40">{B.gate.body}</p>
      <div className="hidden" aria-hidden="true"><label htmlFor="b-website">Website</label><input id="b-website" name="website" type="text" tabIndex={-1} autoComplete="off" /></div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div><label htmlFor="b-name" className="block text-[13px] font-medium text-gray-40">Name</label><input id="b-name" name="name" type="text" required autoComplete="name" className={input} /></div>
        <div><label htmlFor="b-email" className="block text-[13px] font-medium text-gray-40">Work email</label><input id="b-email" name="email" type="email" required autoComplete="email" className={input} /></div>
      </div>
      {error && <p className="mt-3 text-[14px] text-white" role="alert">{error}</p>}
      <button type="submit" className="btn btn-primary mt-4 w-full justify-center" disabled={status === "sending"}>
        {status === "sending" ? "Sending" : B.gate.submit} <ArrowRight />
      </button>
    </form>
  );
}
