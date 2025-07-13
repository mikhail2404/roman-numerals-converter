import { screen, waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import * as api from "../../services/api";
import { renderWithQueryClient } from "../../tests/tests-utils";
import { CONVERSION_DIRECTION } from "../../types";
import { ConversionForm } from "../index";

describe("ConversionForm", () => {
  beforeEach(() => {
    vi.spyOn(api, "convert").mockImplementation(async (input, direction) => {
      if (
        direction === CONVERSION_DIRECTION.ROMAN_TO_ARABIC &&
        input === "XLII"
      )
        return { convertedValue: "42" };
      if (direction === CONVERSION_DIRECTION.ARABIC_TO_ROMAN && input === "42")
        return { convertedValue: "XLII" };
      return { convertedValue: "", error: "Invalid input" };
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("renders and allows input", async () => {
    renderWithQueryClient(<ConversionForm />);
    const input = screen.getByPlaceholderText(/Enter Roman/i);
    await userEvent.type(input, "XLII");
    expect(input).toHaveValue("XLII");
  });

  it("shows result after successful conversion (roman to arabic)", async () => {
    renderWithQueryClient(<ConversionForm />);
    const input = screen.getByPlaceholderText(/Enter Roman/i);
    await userEvent.type(input, "XLII");
    await userEvent.click(screen.getByRole("button", { name: /Convert/i }));
    await waitFor(() =>
      expect(screen.getByText(/Result:/)).toBeInTheDocument()
    );
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("shows result after successful conversion (arabic to roman)", async () => {
    renderWithQueryClient(<ConversionForm />);
    const select = screen.getByRole("combobox");
    await userEvent.selectOptions(select, CONVERSION_DIRECTION.ARABIC_TO_ROMAN);
    const input = screen.getByPlaceholderText(/Enter Arabic/i);
    await userEvent.type(input, "42");
    await userEvent.click(screen.getByRole("button", { name: /Convert/i }));
    await waitFor(() =>
      expect(screen.getByText(/Result:/)).toBeInTheDocument()
    );
    expect(screen.getByText("XLII")).toBeInTheDocument();
  });

  it("shows error for invalid input", async () => {
    renderWithQueryClient(<ConversionForm />);
    const input = screen.getByPlaceholderText(/Enter Roman/i);
    await userEvent.type(input, "FOO");
    await userEvent.click(screen.getByRole("button", { name: /Convert/i }));
    expect(screen.getByText(/valid Roman numeral/i)).toBeInTheDocument();
  });

  it("shows validation error for invalid Roman numerals", async () => {
    renderWithQueryClient(<ConversionForm />);
    const input = screen.getByPlaceholderText(/Enter Roman/i);
    await userEvent.type(input, "IIII");
    await userEvent.click(screen.getByRole("button", { name: /Convert/i }));
    expect(screen.getByText(/valid Roman numeral/i)).toBeInTheDocument();
  });

  it("shows validation error for out-of-range Arabic numbers", async () => {
    renderWithQueryClient(<ConversionForm />);
    const select = screen.getByRole("combobox");
    await userEvent.selectOptions(select, CONVERSION_DIRECTION.ARABIC_TO_ROMAN);
    const input = screen.getByPlaceholderText(/Enter Arabic/i);
    await userEvent.type(input, "4000");
    await userEvent.click(screen.getByRole("button", { name: /Convert/i }));
    expect(screen.getByText(/between 1 and 3999/i)).toBeInTheDocument();
  });
});
