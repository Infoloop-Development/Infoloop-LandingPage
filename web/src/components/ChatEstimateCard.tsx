import type { PublicEstimate } from "@/lib/chat-estimate";
import { ESTIMATE_DISCLAIMER } from "@/lib/chat-estimate";

type Props = {
  projectTitle?: string;
  estimate: PublicEstimate;
  ticketId?: string;
};

function money(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}

function Metric({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: string;
  hint: string;
  accent?: boolean;
}) {
  return (
    <div className="flex min-h-[118px] flex-col bg-white px-3.5 py-3.5">
      <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-ink/45">{label}</p>
      <p
        className={`mt-2 font-display text-[22px] font-semibold leading-none tabular-nums ${
          accent ? "text-orange" : "text-ink"
        }`}
      >
        {value}
      </p>
      <p className="mt-auto pt-3 text-[11px] leading-snug text-ink/55">{hint}</p>
    </div>
  );
}

/** Highlighted estimate breakdown — disclaimer stays subtle at the foot. */
export function ChatEstimateCard({ projectTitle, estimate, ticketId }: Props) {
  const months = estimate.months;
  const monthLabel = months === 1 ? "month" : "months";

  return (
    <div className="space-y-3.5">
      <p className="text-[14px] leading-relaxed">
        {projectTitle ? (
          <>
            Here is a <strong className="font-semibold">rough estimate</strong> for{" "}
            <strong className="font-semibold">{projectTitle}</strong>:
          </>
        ) : (
          <>
            Here is your <strong className="font-semibold">rough estimate</strong>:
          </>
        )}
      </p>

      <div className="overflow-hidden rounded-xl border border-ink/10 bg-ink/[0.06]">
        <div className="grid grid-cols-1 divide-y divide-ink/10 min-[420px]:grid-cols-3 min-[420px]:divide-x min-[420px]:divide-y-0">
          <Metric
            label="Hourly basis"
            value={money(estimate.hourlyTotal)}
            hint="Pay as work progresses. Good when scope may shift week to week."
          />
          <Metric
            label="Milestone basis"
            value={money(estimate.milestoneTotal)}
            hint="Fixed checkpoints per phase. Good when you want predictable billing."
            accent
          />
          <Metric
            label="Timeline"
            value={`~${months} ${monthLabel}`}
            hint="Approximate delivery window for this feature set, one dedicated track."
          />
        </div>
        {estimate.features?.length > 0 && (
          <div className="border-t border-ink/10 bg-white px-3.5 py-2.5">
            <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-ink/45">
              Features in this estimate
            </p>
            <ul className="mt-1.5 space-y-1.5">
              {estimate.features.map((f) => (
                <li key={f.key} className="text-[12px] leading-snug text-ink/70">
                  <span className="font-medium text-ink/80">· {f.name}</span>
                  {f.description ? <span className="block pl-2.5 text-ink/55">{f.description}</span> : null}
                </li>
              ))}
            </ul>
          </div>
        )}
        {estimate.stack && (
          <div className="border-t border-ink/10 bg-white px-3.5 py-2.5">
            <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-ink/45">Stack</p>
            <p className="mt-1 text-[12px] leading-snug text-ink/70">{estimate.stack}</p>
          </div>
        )}
      </div>

      {ticketId && (
        <p className="text-[12px] text-ink/55">
          Reference: <span className="font-medium tabular-nums text-ink/70">{ticketId}</span>
        </p>
      )}

      <p className="text-[13px] leading-snug text-ink/70">
        Our team will call you on the contact details you shared.
      </p>

      <p className="text-[10px] leading-snug text-ink/38">{ESTIMATE_DISCLAIMER}</p>
    </div>
  );
}
