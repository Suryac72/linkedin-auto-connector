import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../Button/Button";

describe("Button Component", () => {
  it("renders with the correct title", () => {
    render(<Button title="Click Me" />);
    expect(screen.getByText(/Click Me/i)).toBeInTheDocument();
  });

  it("fires onClick event when clicked", () => {
    const onClickMock = jest.fn();
    render(<Button title="Click Me" onClick={onClickMock} />);
    const button = screen.getByText(/Click Me/i);
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", () => {
    render(<Button title="Custom Button" className="custom-class" />);
    const button = screen.getByText(/Custom Button/i);
    expect(button).toHaveClass("custom-class");
  });
});
