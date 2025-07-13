import {
  ConversionDirection,
  Conversion,
  ConversionResponse,
  CONVERSION_DIRECTION,
} from "../types";
import { handleApiResponse } from "../utils";

const apiBase = "/api";

export async function convert(
  input: string,
  direction: ConversionDirection
): Promise<ConversionResponse> {
  const url =
    direction === CONVERSION_DIRECTION.ROMAN_TO_ARABIC
      ? `${apiBase}/arabic/${encodeURIComponent(input)}`
      : `${apiBase}/roman/${encodeURIComponent(input)}`;
  const res = await fetch(url);
  return handleApiResponse<ConversionResponse>(res);
}

export async function getHistory(): Promise<Conversion[]> {
  const res = await fetch(`${apiBase}/all`);
  return handleApiResponse<Conversion[]>(res);
}

export async function clearHistory(): Promise<void> {
  const res = await fetch(`${apiBase}/remove`, { method: "DELETE" });
  return handleApiResponse<void>(res);
}
