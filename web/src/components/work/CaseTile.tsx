import type { TileKind } from "@/content/work";

/**
 * Cover tile for a case study card or hero. 7Span uses a product screenshot;
 * until client screens are cleared we draw a small "screen" per case type in
 * the brand style (Mist field, white frame, one orange accent), the same
 * device used for the product tiles on the home page. Decorative only.
 * Replace with an <img> from the CMS `cover` upload when available.
 */
export function CaseTile({ kind, className = "", size = "card", cover, rounded = true }: { kind: TileKind; className?: string; size?: "card" | "hero"; cover?: { url: string; alt?: string }; rounded?: boolean }) {
  const pad = size === "hero" ? "p-8 sm:p-10" : "p-5";
  const text = size === "hero" ? "text-[13px]" : "text-[11px]";
  const r = rounded ? "rounded-2xl" : "";
  if (cover?.url) {
    return (
      <div className={`relative overflow-hidden ${r} bg-mist ${className}`}>
        <img src={cover.url} alt={cover.alt ?? ""} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden ${r} bg-mist ${pad} ${className}`} aria-hidden="true">
      {/* brand bar texture, echoing the kit's virtual backgrounds */}
      <span className="pointer-events-none absolute -left-6 top-6 h-[6%] w-[36%] rounded-full bg-white/70" />
      <span className="pointer-events-none absolute -left-10 top-[22%] h-[6%] w-[44%] rounded-full bg-orange/70" />
      <span className="pointer-events-none absolute -right-8 bottom-6 h-[6%] w-[30%] rounded-full bg-white/70" />
      <div className={`frame relative mx-auto max-w-[360px] bg-white p-3 ${text}`}>
        <Screen kind={kind} />
      </div>
    </div>
  );
}

function Row({ a, b, strong = false }: { a: string; b: string; strong?: boolean }) {
  return (
    <li className="flex justify-between gap-3 border-t border-line pt-1.5">
      <span className="text-ink/80">{a}</span>
      <span className={strong ? "font-display font-semibold text-ink" : "text-ink/70"}>{b}</span>
    </li>
  );
}

function Screen({ kind }: { kind: TileKind }) {
  switch (kind) {
    case "erp":
      return (
        <>
          <div className="flex items-center justify-between">
            <span className="font-display font-bold text-ink">Plant 2, line 4</span>
            <span className="rounded bg-orange px-1.5 py-0.5 font-display font-semibold text-ink">Failure likely in 12 days</span>
          </div>
          <div className="mt-2 flex h-10 items-end gap-1">
            {[30, 45, 40, 55, 50, 62, 58, 70, 66, 78, 74, 90].map((h, i) => (
              <span key={i} className={`w-full rounded-sm ${i > 8 ? "bg-orange" : "bg-ink/80"}`} style={{ height: `${h}%` }} />
            ))}
          </div>
          <ul className="mt-2 space-y-1.5">
            <Row a="Repair booked" b="Quiet slot, next week" strong />
            <Row a="Part on shelf" b="Yes" />
          </ul>
        </>
      );
    case "attendance":
      return (
        <>
          <div className="flex items-center justify-between">
            <span className="font-display font-bold text-ink">Plant 2, shift A</span>
            <span className="text-ink/70">Clocked in</span>
          </div>
          <div className="mt-2 grid grid-cols-7 gap-1">
            {Array.from({ length: 21 }).map((_, i) => (
              <span key={i} className={`h-3 rounded-sm ${i === 9 || i === 16 ? "bg-orange" : "bg-ink/80"}`} />
            ))}
          </div>
          <ul className="mt-2 space-y-1.5">
            <Row a="Hours flagged" b="Supervisor asked" />
            <Row a="Payroll file" b="Ready" strong />
          </ul>
        </>
      );
    case "shopify":
      return (
        <>
          <div className="flex items-center justify-between">
            <span className="font-display font-bold text-ink">Checkout, mobile</span>
            <span className="rounded bg-orange px-1.5 py-0.5 font-display font-semibold text-ink">Shorter</span>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {["Product", "Details", "Pay"].map((s, i) => (
              <span key={s} className={`rounded-md px-1.5 py-2 text-center ${i === 2 ? "bg-ink text-white" : "bg-mist text-ink/80"}`}>
                {s}
              </span>
            ))}
          </div>
          <ul className="mt-2 space-y-1.5">
            <Row a="Load time" b="-1.8s" strong />
            <Row a="Conversion" b="+38%" strong />
          </ul>
        </>
      );
    case "copilot":
      return (
        <>
          <div className="flex items-center justify-between">
            <span className="font-display font-bold text-ink">Refund status</span>
            <span className="text-ink/70">Draft ready</span>
          </div>
          <p className="mt-2 rounded-md bg-mist p-2 leading-snug text-ink/80">Your refund has been sent and should show in your account shortly.</p>
          <ul className="mt-2 space-y-1.5">
            <Row a="Sources" b="Payments, CRM" />
            <Row a="Action" b="Approve to send" strong />
          </ul>
        </>
      );
    case "garage":
      return (
        <>
          <div className="flex items-center justify-between">
            <span className="font-display font-bold text-ink">Group diary, nine branches</span>
            <span className="rounded bg-orange px-1.5 py-0.5 font-display font-semibold text-ink">Bay free</span>
          </div>
          <div className="mt-2 grid grid-cols-9 gap-1">
            {Array.from({ length: 27 }).map((_, i) => (
              <span key={i} className={`h-2.5 rounded-sm ${[4, 13, 22].includes(i) ? "bg-orange" : i % 3 === 0 ? "bg-ink/30" : "bg-ink/80"}`} />
            ))}
          </div>
          <ul className="mt-2 space-y-1.5">
            <Row a="Cancellation offered" b="Waiting list" />
            <Row a="Reminder sent" b="SMS" strong />
          </ul>
        </>
      );
    case "webflow":
      return (
        <>
          <div className="flex items-center justify-between">
            <span className="font-display font-bold text-ink">Organic traffic</span>
            <span className="text-ink/70">Last 4 months</span>
          </div>
          <div className="mt-2 flex h-10 items-end gap-1">
            {[40, 44, 42, 50, 56, 63, 70, 78, 84, 92, 96, 100].map((h, i) => (
              <span key={i} className={`w-full rounded-sm ${i > 7 ? "bg-orange" : "bg-ink/80"}`} style={{ height: `${h}%` }} />
            ))}
          </div>
          <ul className="mt-2 space-y-1.5">
            <Row a="Demo requests" b="2.1x" strong />
          </ul>
        </>
      );
    case "verko":
      return (
        <>
          <div className="flex items-center justify-between">
            <span className="font-display font-bold text-ink">Compliance overview</span>
            <span className="rounded bg-orange px-1.5 py-0.5 font-display font-semibold text-ink">Audit-ready</span>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {["EU AI Act", "SOC 2", "GDPR"].map((f) => (
              <span key={f} className="rounded-md bg-mist px-1.5 py-2 text-center text-ink/80">{f}</span>
            ))}
          </div>
          <ul className="mt-2 space-y-1.5">
            <Row a="Evidence collected" b="Auto, from GitHub and AWS" />
            <Row a="Model risk score" b="Reviewed" strong />
          </ul>
        </>
      );
    default:
      return (
        <>
          <div className="flex items-center justify-between">
            <span className="font-display font-bold text-ink">Assessment</span>
            <span className="text-ink/70">Supervised</span>
          </div>
          <ul className="mt-2 space-y-1.5">
            <Row a="Written test" b="Pass" />
            <Row a="Practical" b="Graded by AI" strong />
            <Row a="Certificate" b="Issued" />
          </ul>
        </>
      );
  }
}
