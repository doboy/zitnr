import { timeToNumber } from "./timeToNumber";

describe("timeToNumber", () => {
  it("should convert time strings to decimal numbers correctly", () => {
    expect(timeToNumber("12:30")).toBe(12.5);
    expect(timeToNumber("09:15")).toBe(9.25);
    expect(timeToNumber("00:00")).toBe(0);
    expect(timeToNumber("23:59")).toBeCloseTo(23.9833, 4);
    expect(timeToNumber("15:45")).toBe(15.75);
  });

  it("should handle single-digit hours and minutes correctly", () => {
    expect(timeToNumber("01:05")).toBeCloseTo(1.0833, 4);
    expect(timeToNumber("08:09")).toBeCloseTo(8.15, 4);
    expect(timeToNumber("03:07")).toBeCloseTo(3.1167, 4);
  });

  it("should handle edge cases for midnight and noon", () => {
    expect(timeToNumber("00:01")).toBeCloseTo(0.0167, 4);
    expect(timeToNumber("12:00")).toBe(12);
  });

  it("should handle times with leading zeros", () => {
    expect(timeToNumber("03:07")).toBeCloseTo(3.1167, 4);
    expect(timeToNumber("08:09")).toBeCloseTo(8.15, 4);
  });

  it("should handle invalid inputs gracefully", () => {
    expect(() => timeToNumber("invalid")).toThrow();
    expect(() => timeToNumber("25:00")).toThrow();
    expect(() => timeToNumber("12:60")).toThrow();
    expect(() => timeToNumber("")).toThrow();
  });
});
