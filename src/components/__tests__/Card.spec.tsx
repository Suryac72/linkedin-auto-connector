import { render,screen } from "@testing-library/react";
import { Card } from "../Card/Card";

describe("Card Component", () => {
  it("renders children correctly", () => {
    render(
      <Card>
        <p>Test Card Content</p>
      </Card>
    );
    expect(screen.getByText(/Test Card Content/i)).toBeInTheDocument();
  });

  it("applies the card-container class", () => {
    const { container } = render(
      <Card>
        <p>Test Card Content</p>
      </Card>
    );
    expect(container.firstChild).toHaveClass("card-container");
  });
});
