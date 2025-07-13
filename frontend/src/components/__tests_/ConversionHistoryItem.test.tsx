import { render, screen } from "@testing-library/react";

import type { Conversion } from "../../types";
import { ConversionHistoryItem } from "../ConversionHistory/ConversionHistoryItem/ConversionHistoryItem";

describe("ConversionHistoryItem", () => {
  it("renders formatted conversion and direction", () => {
    const conversion: Conversion = {
      id: 1,
      inputValue: "X",
      convertedValue: "10",
      direction: "roman-to-arabic",
    };
    render(<ConversionHistoryItem conversion={conversion} />);
    expect(screen.getByText("X → 10")).toBeInTheDocument();
    expect(screen.getByText("roman to arabic")).toBeInTheDocument();
  });
});
