export const CONVERSION_DIRECTION = {
  ROMAN_TO_ARABIC: "roman-to-arabic",
  ARABIC_TO_ROMAN: "arabic-to-roman",
} as const;

export type ConversionDirection =
  (typeof CONVERSION_DIRECTION)[keyof typeof CONVERSION_DIRECTION];

export interface Conversion {
  id: number;
  inputValue: string;
  convertedValue: string;
  direction: ConversionDirection;
}

export interface ConversionResponse {
  convertedValue: string | number;
}
