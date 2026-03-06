const AFFILIATE_CODES: Record<string, string> = {
  "vaticpro.com": "10755612.LazqyjvmAG",
  "us.sixzeropickleball.com": "10749425.u187ARTBJn",
  "11six24.com": "10748848.AHQuNeZGEN",
};

const STORE_NAMES: Record<string, string> = {
  "vaticpro.com": "Vatic Pro",
  "us.sixzeropickleball.com": "SIX ZERO",
  "11six24.com": "11six24",
  "joola.com": "JOOLA",
};

export function withAffiliateCode(url: string): string {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace(/^www\./, "");
    const code = AFFILIATE_CODES[hostname];
    if (!code) return url;
    parsed.searchParams.set("sca_ref", code);
    return parsed.toString();
  } catch {
    return url;
  }
}

export function getStoreName(url: string): string {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, "");
    for (const [domain, name] of Object.entries(STORE_NAMES)) {
      if (hostname === domain || hostname.endsWith(`.${domain}`)) {
        return `View on ${name}`;
      }
    }
  } catch {}
  return "View on Amazon";
}
