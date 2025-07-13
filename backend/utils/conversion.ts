function isValidRoman(roman: string): boolean {
  return roman.length > 0 && /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i.test(roman);
}

function romanToArabic(roman: string): number | null {
  if (!isValidRoman(roman)) {
    return null;
  }
  const map: Record<string, number> = {I:1,V:5,X:10,L:50,C:100,D:500,M:1000};
  let result = 0, prev = 0;
  for (let i = roman.length - 1; i >= 0; i--) {
    const curr = map[roman[i].toUpperCase()];
    if (!curr) {
      return null;
    }
    if (curr < prev) {
      result -= curr;
    } else {
      result += curr;
    }
    prev = curr;
  }
  return result;
}

function arabicToRoman(num: number): string | null {
  if (num < 1 || num > 3999) {
    return null;
  }
  const romanValues = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
  const romanSymbols = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];
  let res = '';
  for (let i = 0; i < romanValues.length; i++) {
    while (num >= romanValues[i]) {
      res += romanSymbols[i];
      num -= romanValues[i];
    }
  }
  return res;
}

export { isValidRoman, romanToArabic, arabicToRoman }; 