import type { Profile, ProfileLink, ProfileSocial, TeamMember } from "@/content/about";
import { SocialIcon } from "@/components/Footer";
import { ProductMark } from "@/components/ProductMark";
import { Mark } from "@/components/Logo";
import { TeamPhoto } from "@/components/about/AboutParts";

/**
 * Personal page, modelled on 7Span's (7span.com/kaushal): the page a
 * business-card QR opens. One narrow bordered column: ink header with the
 * photo and tag chips, name + role + bio, a row of contact icons, link rows
 * with an icon tile each, three photo slots. Standalone (no site chrome).
 */
export function ProfileCard({ m, p }: { m: TeamMember; p: Profile }) {
  return (
    <article className="mx-auto w-full max-w-[672px] border-x border-b border-ink bg-white">
      {/* Header: photo + tags on ink */}
      <header className="flex items-start gap-3 bg-ink p-6">
        <TeamPhoto m={m} />
        <ul className="flex min-w-0 flex-col items-start gap-1.5 pt-0.5" aria-label="At a glance">
          {p.tags.map((t) => (
            <li key={t} className="bg-white/10 px-2.5 py-1 font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-white/85">
              {t}
            </li>
          ))}
        </ul>
      </header>

      {/* Name, role, bio */}
      <div className="p-6">
        <h1 className="font-display text-[34px] font-bold leading-none tracking-[-0.03em] text-ink sm:text-[40px]">{m.name}</h1>
        <p className="mt-2 text-[13px] text-ink/60">{m.role}, Infoloop</p>
        <p className="mt-4 text-[16px] leading-relaxed text-ink/85">{p.bio}</p>
      </div>

      {/* Contact icon row */}
      {p.socials.length > 0 && (
        <>
      <h2 id="profile-contact" className="sr-only">Contact</h2>
      <ul className="grid border-y border-ink" style={{ gridTemplateColumns: `repeat(${p.socials.length}, minmax(0, 1fr))` }} aria-labelledby="profile-contact">
        {p.socials.map((s, i) => (
          <li key={s.kind} className={i > 0 ? "border-l border-ink" : ""}>
            <a
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={s.label}
              title={s.label}
              className="flex h-14 items-center justify-center text-ink transition-colors hover:bg-orange"
            >
              <ContactGlyph kind={s.kind} />
            </a>
          </li>
        ))}
      </ul>
        </>
      )}

      {/* Link rows */}
      <h2 id="profile-links" className="sr-only">Links</h2>
      <ul className="space-y-3 p-6" aria-labelledby="profile-links">
        {p.links.map((l) => (
          <li key={l.href + l.title}>
            <a href={l.href} className="group flex items-stretch border border-ink bg-white transition-colors hover:bg-paper">
              <span className="flex w-16 shrink-0 items-center justify-center border-r border-ink bg-paper" aria-hidden="true">
                <LinkTile icon={l.icon} />
              </span>
              <span className="min-w-0 px-4 py-3">
                <span className="block font-display text-[16.5px] font-semibold text-ink group-hover:text-orange">{l.title}</span>
                <span className="block text-[13px] text-ink/60">{l.sub}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      {/* Photo strip (placeholders are decorative until real photos land; photoAlts become the img alt then) */}
      <h2 id="profile-photos" className="sr-only">Photos</h2>
      <ul className="grid grid-cols-1 border-t border-ink sm:grid-cols-3" aria-labelledby="profile-photos">
        {p.photoAlts.map((alt, i) => (
          <li key={i} className={`p-3 ${i > 0 ? "border-l border-ink" : ""}`}>
            <div className="relative aspect-[3/4] overflow-hidden border border-ink bg-mist" aria-hidden="true" data-photo-alt={alt}>
              <span className="absolute inset-x-[12%] top-[18%] h-[7%] rounded-full bg-white/70" aria-hidden="true" />
              <span className={`absolute left-[10%] top-[38%] h-[7%] w-[46%] rounded-full ${i === 1 ? "bg-orange/80" : "bg-white/70"}`} aria-hidden="true" />
              <span className="absolute left-[14%] top-[58%] h-[7%] w-[70%] rounded-full bg-white/70" aria-hidden="true" />
              <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-white/85 px-1.5 py-0.5 text-[10px] text-ink/70" aria-hidden="true">
                <Mark size={10} /> Photo slot
              </span>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}

function ContactGlyph({ kind }: { kind: ProfileSocial["kind"] }) {
  const line = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };
  switch (kind) {
    case "mail":
      return (
        <svg {...line}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "phone":
      return (
        <svg {...line}>
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 12 12 0 0 0 4.6 4c1.7.7 2.1.6 2.9.5a2.5 2.5 0 0 0 1.6-1.1c.2-.6.2-1 .1-1.1l-.6-.2z" />
        </svg>
      );
    default:
      // linkedin, x, github, instagram: the footer's icons, scaled up
      return (
        <span className="[&>svg]:h-5 [&>svg]:w-5">
          <SocialIcon name={kind} />
        </span>
      );
  }
}

function LinkTile({ icon }: { icon: ProfileLink["icon"] }) {
  const line = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "#0A0A0A", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };
  switch (icon) {
    case "infoloop":
      return <Mark size={26} />;
    case "opsdeck":
      return <ProductMark name="OpsDeck" size={36} />;
    case "garagezone":
      return <ProductMark name="GarageZone" size={36} />;
    case "loopiq":
      return <ProductMark name="LoopIQ" size={36} />;
    case "verko":
      return <ProductMark name="Verko" size={36} />;
    case "work":
      return (
        <svg {...line}>
          <rect x="3" y="4" width="18" height="16" rx="1.5" />
          <path d="M3 9h18M8 4v5" />
          <path d="M7 14h5M7 17h8" stroke="#F47B00" />
        </svg>
      );
    case "contact":
      return (
        <svg {...line}>
          <path d="M4 5h16v11H9l-5 4z" />
          <path d="M8 9h8M8 12h5" stroke="#F47B00" />
        </svg>
      );
    default:
      return (
        <svg {...line}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </svg>
      );
  }
}
