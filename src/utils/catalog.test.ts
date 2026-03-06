import catalog from "./catalog.json";

describe("catalog", () => {
  it("should have at least 1 new product for the current year", () => {
    const currentYear = new Date().getFullYear();
    const newProducts = catalog.filter(
      (item) => (item as any).year === currentYear
    );
    expect(newProducts.length).toBeGreaterThan(0);
  });
});
