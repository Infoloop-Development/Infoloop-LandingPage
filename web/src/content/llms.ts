/** Base site-wide llms.txt body (static handbook). Per-page CMS blurbs append at build. */
import raw from "./llms-base.txt?raw";

export const LLMS_BASE = typeof raw === "string" ? raw : String(raw);
