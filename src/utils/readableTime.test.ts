import { readableTime } from "./readableTime";

describe("readableTime", () => {
  it("should convert 24-hour time to 12-hour time with AM/PM", () => {
    expect(readableTime("00:00")).toBe("12:00 AM");
    expect(readableTime("12:00")).toBe("12:00 PM");
    expect(readableTime("15:30")).toBe("3:30 PM");
    expect(readableTime("23:45")).toBe("11:45 PM");
    expect(readableTime("09:15")).toBe("9:15 AM");
  });

  it("should handle single-digit hours correctly", () => {
    expect(readableTime("01:05")).toBe("1:05 AM");
    expect(readableTime("11:59")).toBe("11:59 AM");
    expect(readableTime("10:00")).toBe("10:00 AM");
  });

  it("should handle edge cases for midnight and noon", () => {
    expect(readableTime("00:01")).toBe("12:01 AM");
    expect(readableTime("12:01")).toBe("12:01 PM");
  });

  it("should handle times with leading zeros", () => {
    expect(readableTime("03:07")).toBe("3:07 AM");
    expect(readableTime("08:09")).toBe("8:09 AM");
  });
});