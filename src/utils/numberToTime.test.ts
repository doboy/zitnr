import { numberToTime } from "./numberToTime";

describe("numberToTime", () => {
  it("should convert a whole number to time string", () => {
    const result = numberToTime(12);
    expect(result).toBe("12:00 PM");
  });

  it("should convert a decimal number to time string", () => {
    const result = numberToTime(12.5);
    expect(result).toBe("12:30 PM");
  });

  it("should handle minutes less than 10 correctly", () => {
    const result = numberToTime(12.0833); // 12:05
    expect(result).toBe("12:05 PM");
  });

  it("should round minutes correctly", () => {
    const result = numberToTime(12.0167); // 12:01
    expect(result).toBe("12:01 PM");
  });

  it("should handle midnight correctly", () => {
    const result = numberToTime(0);
    expect(result).toBe("12:00 AM");
  });

  it("should handle times before noon correctly", () => {
    const result = numberToTime(9.5); // 9:30 AM
    expect(result).toBe("9:30 AM");
  });

  it("should handle times after noon correctly", () => {
    const result = numberToTime(15.2333); // 3:14 PM
    expect(result).toBe("3:14 PM");
  });
});
