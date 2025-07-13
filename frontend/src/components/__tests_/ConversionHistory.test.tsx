import { screen, waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import * as api from "../../services/api";
import { renderWithQueryClient } from "../../tests/tests-utils";
import { CONVERSION_DIRECTION } from "../../types";
import { ConversionHistory } from "../index";

describe("ConversionHistory", () => {
  beforeEach(() => {
    vi.spyOn(api, "getHistory").mockResolvedValue([
      {
        id: 1,
        inputValue: "X",
        convertedValue: "10",
        direction: CONVERSION_DIRECTION.ROMAN_TO_ARABIC,
      },
      {
        id: 2,
        inputValue: "42",
        convertedValue: "XLII",
        direction: CONVERSION_DIRECTION.ARABIC_TO_ROMAN,
      },
    ]);
    vi.spyOn(api, "clearHistory").mockResolvedValue();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders history items", async () => {
    renderWithQueryClient(<ConversionHistory />);
    await waitFor(() => expect(screen.getByText("X → 10")).toBeInTheDocument());
    expect(screen.getByText("42 → XLII")).toBeInTheDocument();
    expect(screen.getByText(/roman to arabic/i)).toBeInTheDocument();
    expect(screen.getByText(/arabic to roman/i)).toBeInTheDocument();
  });

  it("renders loading state", async () => {
    vi.spyOn(api, "getHistory").mockImplementationOnce(
      () => new Promise((resolve) => setTimeout(() => resolve([]), 100))
    );
    renderWithQueryClient(<ConversionHistory />);
    expect(screen.getByText(/Loading history/i)).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByText(/No history yet/i)).toBeInTheDocument()
    );
  });

  it("renders empty state", async () => {
    vi.spyOn(api, "getHistory").mockResolvedValueOnce([]);
    renderWithQueryClient(<ConversionHistory />);
    await waitFor(() =>
      expect(screen.getByText(/No history yet/i)).toBeInTheDocument()
    );
  });

  it("clears history when clear button is clicked", async () => {
    const getHistoryMock = vi.spyOn(api, "getHistory");
    getHistoryMock.mockResolvedValueOnce([
      {
        id: 1,
        inputValue: "X",
        convertedValue: "10",
        direction: CONVERSION_DIRECTION.ROMAN_TO_ARABIC,
      },
      {
        id: 2,
        inputValue: "42",
        convertedValue: "XLII",
        direction: CONVERSION_DIRECTION.ARABIC_TO_ROMAN,
      },
    ]);
    renderWithQueryClient(<ConversionHistory />);
    await waitFor(() => expect(screen.getByText("X → 10")).toBeInTheDocument());
    getHistoryMock.mockResolvedValueOnce([]);
    const button = screen.getByRole("button", { name: /Clear All/i });
    await userEvent.click(button);
    await waitFor(() =>
      expect(screen.getByText(/No history yet/i)).toBeInTheDocument()
    );
  });
});
