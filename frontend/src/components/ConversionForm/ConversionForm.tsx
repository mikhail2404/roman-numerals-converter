import { FormEvent, useState } from "react";

import { useConvertValue } from "../../hooks";
import { CONVERSION_DIRECTION, ConversionDirection } from "../../types";
import { isValidRoman, isValidArabic } from "../../utils";
import { ConversionResult } from "../ConversionResult";

export const ConversionForm = () => {
  const [input, setInput] = useState("");
  const [direction, setDirection] = useState<ConversionDirection>(
    CONVERSION_DIRECTION.ROMAN_TO_ARABIC
  );
  const [touched, setTouched] = useState(false);
  const { result, error, status, mutate } = useConvertValue();

  const validate = () => {
    if (direction === CONVERSION_DIRECTION.ROMAN_TO_ARABIC)
      return isValidRoman(input.trim());
    return isValidArabic(input.trim());
  };

  const getConversionError = () => {
    if (!touched || !input.trim()) return "";
    if (
      direction === CONVERSION_DIRECTION.ROMAN_TO_ARABIC &&
      !isValidRoman(input.trim())
    ) {
      return "Please enter a valid Roman numeral (e.g. XIV, XLII, etc.)";
    }
    if (
      direction === CONVERSION_DIRECTION.ARABIC_TO_ROMAN &&
      !isValidArabic(input.trim())
    ) {
      return "Please enter an integer between 1 and 3999.";
    }
    return "";
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const isValid = validate();
    if (isValid) {
      mutate({ input: input.trim(), direction });
    }
  };

  const getPlaceholder = () =>
    direction === CONVERSION_DIRECTION.ROMAN_TO_ARABIC
      ? "Enter Roman (e.g. XIV)"
      : "Enter Arabic (e.g. 42)";

  const conversionError = getConversionError();
  const isValid = validate();

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full min-w-[400px]"
      aria-label="Conversion form"
    >
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex-1 flex flex-col">
          <label htmlFor="conversion-input" className="sr-only">
            {direction === CONVERSION_DIRECTION.ROMAN_TO_ARABIC
              ? "Roman numeral input"
              : "Arabic number input"}
          </label>
          <input
            id="conversion-input"
            className={`px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              conversionError ? "border-red-500" : ""
            } text-gray-900`}
            placeholder={getPlaceholder()}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setTouched(true);
            }}
            required
            disabled={status === "pending"}
            onBlur={() => setTouched(true)}
            aria-invalid={!!conversionError}
            aria-describedby={
              conversionError ? "conversion-input-error" : undefined
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="conversion-direction" className="sr-only">
            Conversion direction
          </label>
          <select
            id="conversion-direction"
            className="px-2 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            value={direction}
            onChange={(e) => {
              setDirection(e.target.value as ConversionDirection);
              setInput("");
              setTouched(false);
            }}
            disabled={status === "pending"}
          >
            <option value={CONVERSION_DIRECTION.ROMAN_TO_ARABIC}>
              Roman → Arabic
            </option>
            <option value={CONVERSION_DIRECTION.ARABIC_TO_ROMAN}>
              Arabic → Roman
            </option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          disabled={status === "pending" || !input.trim() || !isValid}
        >
          Convert
        </button>
      </div>
      {conversionError && (
        <span
          id="conversion-input-error"
          className="text-xs text-red-600 mt-1 w-full block"
          aria-live="polite"
          data-testid="conversion-error"
        >
          {conversionError}
        </span>
      )}
      <ConversionResult result={result} error={error?.message} />
    </form>
  );
};
