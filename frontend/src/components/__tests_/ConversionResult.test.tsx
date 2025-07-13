import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";

import { ConversionResult } from "../index";

describe("ConversionResult", () => {
  it("renders result", () => {
    render(<ConversionResult result={42} />);
    expect(screen.getByTestId("conversion-result-label")).toHaveTextContent(
      "Result:"
    );
    expect(screen.getByTestId("conversion-result-value")).toHaveTextContent(
      "42"
    );
  });
  it("renders error", () => {
    render(<ConversionResult result={null} error="Some error" />);
    expect(screen.getByTestId("conversion-error-label")).toHaveTextContent(
      "Error:"
    );
    expect(screen.getByTestId("conversion-error")).toHaveTextContent(
      "Some error"
    );
  });
});
