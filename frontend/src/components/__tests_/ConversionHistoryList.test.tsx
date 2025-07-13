import { render, screen } from "@testing-library/react";

import type { Conversion } from "../../types";
import { ConversionHistoryList } from "../ConversionHistory/ConversionHistoryList/ConversionHistoryList";

describe("ConversionHistoryList", () => {
  const sample: Conversion[] = [
    {
      id: 1,
      inputValue: "X",
      convertedValue: "10",
      direction: "roman-to-arabic",
    },
    {
      id: 2,
      inputValue: "42",
      convertedValue: "XLII",
      direction: "arabic-to-roman",
    },
  ];

  it("shows loading state", () => {
    render(<ConversionHistoryList history={[]} isLoading={true} />);
    expect(screen.getByText(/loading history/i)).toBeInTheDocument();
  });

  it("shows empty state", () => {
    render(<ConversionHistoryList history={[]} isLoading={false} />);
    expect(screen.getByText(/no history yet/i)).toBeInTheDocument();
  });

  it("renders history items", () => {
    render(<ConversionHistoryList history={sample} isLoading={false} />);
    expect(screen.getByText("X → 10")).toBeInTheDocument();
    expect(screen.getByText("42 → XLII")).toBeInTheDocument();
    expect(
      screen.getAllByText(/roman to arabic|arabic to roman/i)
    ).toHaveLength(2);
  });
});
