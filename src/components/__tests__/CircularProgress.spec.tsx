import { render } from "@testing-library/react";
import { CircularProgress } from "../CircularProgress/CircularProgress";

describe("CircularProgress Component", () => {

  it("applies the correct data-value attribute", () => {
    const { container } = render(<CircularProgress value={75} />);
    const progressElement = container.querySelector(".progress");
    expect(progressElement).toHaveAttribute("data-value", "75");
  });

  it("updates the progress when the value changes", () => {
    const { rerender, container } = render(<CircularProgress value={25} />);
    let progressElement = container.querySelector(".progress");
    expect(progressElement).toHaveAttribute("data-value", "25");

    rerender(<CircularProgress value={80} />);
    progressElement = container.querySelector(".progress");
    expect(progressElement).toHaveAttribute("data-value", "80");
  });
});
