export const SITE_NAME = "SandroNepal";

export const SITE_DESCRIPTION =
  "Shop the latest kurtis, tops, sarees and accessories at SandroNepal. Fashion for every you — cash on delivery available across Nepal.";

// Falls back to the production domain so metadata/sitemaps still resolve
// correctly even if the env var isn't set (e.g. a fresh deploy).
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sandronepal.shop"
).replace(/\/$/, "");

// Meta description content must be a single line — Next.js silently drops
// the inline <meta name="description"> tag (deferring it to a client-side-
// only hydration payload) when the string contains raw newlines, which
// breaks it for non-JS link-preview bots (WhatsApp, Facebook, etc).
export function toSingleLine(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

export const DEFAULT_OG_IMAGE = {
  url: `${SITE_URL}/logo.png`,
  width: 1254,
  height: 1254,
  alt: SITE_NAME,
};
