import { AFFILIATE_CODES } from "./affiliate";
import catalog from "./catalog.json";

describe("affiliate codes in catalog", () => {
  const entries = Object.entries(AFFILIATE_CODES);

  entries.forEach(([domain, expectedCode]) => {
    it(`all ${domain} links should have the correct sca_ref`, () => {
      const matching = catalog.filter((item) => item.link.includes(domain));

      // Skip if no products for this domain yet
      if (matching.length === 0) return;

      const missing: string[] = [];
      const wrong: string[] = [];

      matching.forEach((item) => {
        const url = new URL(item.link);
        const scaRef = url.searchParams.get("sca_ref");
        if (!scaRef) {
          missing.push(`${item.name} (${item.link})`);
        } else if (scaRef !== expectedCode) {
          wrong.push(
            `${item.name}: expected ${expectedCode}, got ${scaRef} (${item.link})`
          );
        }
      });

      const errors: string[] = [];
      if (missing.length > 0) {
        errors.push(`Missing sca_ref:\n  ${missing.join("\n  ")}`);
      }
      if (wrong.length > 0) {
        errors.push(`Wrong sca_ref:\n  ${wrong.join("\n  ")}`);
      }

      expect(errors).toEqual([]);
    });
  });
});
