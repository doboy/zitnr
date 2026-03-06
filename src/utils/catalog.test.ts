import * as fs from "fs";
import * as path from "path";
import catalog from "./catalog.json";

describe("catalog", () => {
  it("should have at least 1 new product for the current year", () => {
    const currentYear = new Date().getFullYear();
    const newProducts = catalog.filter(
      (item) => (item as any).year === currentYear
    );
    expect(newProducts.length).toBeGreaterThan(0);
  });

  it("all products should have valid images", () => {
    const publicDir = path.resolve(__dirname, "../../public");
    const missing = catalog.filter(
      (item) => !fs.existsSync(path.join(publicDir, item.image))
    );
    if (missing.length > 0) {
      const names = missing.map(
        (item) => `${item.name} (${item.image})`
      );
      throw new Error(`Missing images:\n  ${names.join("\n  ")}`);
    }
  });
});
