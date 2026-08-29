import type { ReactNode } from "react";

type Tone = "user" | "assistant";

const LINK_CLASS: Record<Tone, string> = {
  user: "underline underline-offset-2 text-white hover:text-orange",
  assistant: "underline underline-offset-2 text-ink hover:text-orange break-all",
};

/** Safe http(s) or same-site path only — never javascript: / data:. */
function safeHref(raw: string): string | null {
  const href = raw.trim();
  if (/^https?:\/\//i.test(href)) return href;
  if (href.startsWith("/") && !href.startsWith("//")) return href;
  return null;
}

function Link({ href, tone, children }: { href: string; tone: Tone; children: ReactNode }) {
  const safe = safeHref(href);
  if (!safe) return <>{children}</>;
  const external = /^https?:\/\//i.test(safe);
  return (
    <a
      href={safe}
      className={LINK_CLASS[tone]}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

/**
 * Inline pieces: markdown links, **bold**, bare URLs, site paths.
 * Keeps chat bubbles readable without pulling in a markdown library.
 */
function renderInline(text: string, tone: Tone, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  // [label](url) | **bold** | https?://… | bare domain.tld | /site-path
  const re =
    /\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]+)\)|\*\*([^*]+)\*\*|(https?:\/\/[^\s<]+)|((?:[a-z0-9-]+\.)+(?:ai|co|com|io|app|dev|net|org)(?:\/[^\s<]*)?)|(\/[a-z0-9][a-z0-9/_-]*)/gi;

  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const key = `${keyPrefix}-${i++}`;
    if (m[1] != null && m[2] != null) {
      nodes.push(
        <Link key={key} href={m[2]} tone={tone}>
          {m[1]}
        </Link>,
      );
    } else if (m[3] != null) {
      nodes.push(
        <strong key={key} className="font-semibold">
          {m[3]}
        </strong>,
      );
    } else if (m[4] != null) {
      const url = m[4].replace(/[),.;:!?]+$/, "");
      const trailing = m[4].slice(url.length);
      nodes.push(
        <Link key={key} href={url} tone={tone}>
          {url}
        </Link>,
      );
      if (trailing) nodes.push(trailing);
    } else if (m[5] != null) {
      const host = m[5].replace(/[),.;:!?]+$/, "");
      const trailing = m[5].slice(host.length);
      nodes.push(
        <Link key={key} href={`https://${host}`} tone={tone}>
          {host}
        </Link>,
      );
      if (trailing) nodes.push(trailing);
    } else if (m[6] != null) {
      const path = m[6].replace(/[),.;:!?]+$/, "");
      const trailing = m[6].slice(path.length);
      nodes.push(
        <Link key={key} href={path} tone={tone}>
          {path}
        </Link>,
      );
      if (trailing) nodes.push(trailing);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

/**
 * Renders assistant/user chat text with bold, links, and simple bullet lines.
 */
export function ChatMessageBody({ text, tone }: { text: string; tone: Tone }) {
  const lines = text.split(/\n/);
  const blocks: ReactNode[] = [];
  let list: string[] = [];

  const flushList = (key: number) => {
    if (!list.length) return;
    blocks.push(
      <ul key={`ul-${key}`} className="my-1 list-disc space-y-1 pl-4">
        {list.map((item, idx) => (
          <li key={idx}>{renderInline(item, tone, `li-${key}-${idx}`)}</li>
        ))}
      </ul>,
    );
    list = [];
  };

  lines.forEach((line, idx) => {
    const bullet = line.match(/^\s*[-*•]\s+(.+)$/);
    if (bullet) {
      list.push(bullet[1]);
      return;
    }
    flushList(idx);
    if (!line.trim()) {
      blocks.push(<div key={`br-${idx}`} className="h-2" />);
      return;
    }
    blocks.push(
      <p key={`p-${idx}`} className={idx > 0 && lines[idx - 1]?.trim() ? "mt-1.5" : undefined}>
        {renderInline(line, tone, `p-${idx}`)}
      </p>,
    );
  });
  flushList(lines.length);

  return <div className="min-w-0">{blocks}</div>;
}
