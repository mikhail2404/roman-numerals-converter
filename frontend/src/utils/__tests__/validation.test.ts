import { isValidRoman, isValidArabic } from "../validation";

describe("isValidRoman", () => {
  it("accepts valid roman numerals", () => {
    expect(isValidRoman("XIV")).toBe(true);
    expect(isValidRoman("MMXXIV")).toBe(true);
    expect(isValidRoman("iv")).toBe(true);
  });
  it("rejects invalid roman numerals", () => {
    expect(isValidRoman("IIII")).toBe(false);
    expect(isValidRoman("ABC")).toBe(false);
    expect(isValidRoman("")).toBe(false);
  });
});
describe("isValidArabic", () => {
  it("accepts valid arabic numbers", () => {
    expect(isValidArabic("1")).toBe(true);
    expect(isValidArabic("3999")).toBe(true);
    expect(isValidArabic("42")).toBe(true);
  });
  it("rejects invalid arabic numbers", () => {
    expect(isValidArabic("0")).toBe(false);
    expect(isValidArabic("4000")).toBe(false);
    expect(isValidArabic("-1")).toBe(false);
    expect(isValidArabic("abc")).toBe(false);
    expect(isValidArabic("")).toBe(false);
  });
});
