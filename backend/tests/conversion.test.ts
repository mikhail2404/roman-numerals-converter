import { isValidRoman, romanToArabic, arabicToRoman } from '../utils/conversion';

describe('isValidRoman', () => {
  it('accepts valid roman numerals', () => {
    expect(isValidRoman('X')).toBe(true);
    expect(isValidRoman('IV')).toBe(true);
    expect(isValidRoman('MMXXIV')).toBe(true);
  });
  it('rejects invalid roman numerals', () => {
    expect(isValidRoman('IIII')).toBe(false);
    expect(isValidRoman('ABC')).toBe(false);
    expect(isValidRoman('')).toBe(false);
  });
});

describe('romanToArabic', () => {
  it('converts valid roman numerals', () => {
    expect(romanToArabic('X')).toBe(10);
    expect(romanToArabic('IV')).toBe(4);
    expect(romanToArabic('MMXXIV')).toBe(2024);
  });
  it('returns null for invalid roman numerals', () => {
    expect(romanToArabic('IIII')).toBeNull();
    expect(romanToArabic('ABC')).toBeNull();
    expect(romanToArabic('')).toBeNull();
  });
});

describe('arabicToRoman', () => {
  it('converts valid arabic numbers', () => {
    expect(arabicToRoman(10)).toBe('X');
    expect(arabicToRoman(4)).toBe('IV');
    expect(arabicToRoman(2024)).toBe('MMXXIV');
  });
  it('returns null for out-of-range or invalid input', () => {
    expect(arabicToRoman(0)).toBeNull();
    expect(arabicToRoman(4000)).toBeNull();
    expect(arabicToRoman(-1)).toBeNull();
  });
}); 