import { render, screen } from "@testing-library/react";
import { Header } from "../Header/Header";

describe("Header Component", () => {
  it("renders the title correctly", () => {
    render(<Header title="Test Header" />);
    expect(screen.getByText(/Test Header/i)).toBeInTheDocument();
  });

  it("renders the icon when passed", () => {
    render(<Header title="Test Header" icon={<span>Test Icon</span>} />);
    expect(screen.getByText(/Test Icon/i)).toBeInTheDocument();
  });

  it("does not render icon when not provided", () => {
    render(<Header title="Test Header" />);
    const iconElement = screen.queryByText("Test Icon");
    expect(iconElement).toBeNull();
  });
});
