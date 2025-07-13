export function isValidRoman(roman: string): boolean {
  if (!roman) return false;
  return /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i.test(
    roman
  );
}

export function isValidArabic(input: string): boolean {
  const num = Number(input);
  return Number.isInteger(num) && num >= 1 && num <= 3999;
}
