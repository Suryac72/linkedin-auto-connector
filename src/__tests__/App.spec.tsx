import { render, screen } from "@testing-library/react";
import App from "../App";
import '@testing-library/jest-dom';
import 'chrome-mock';
import '../__mocks__/chrome-mock';
describe("App Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  it("renders LinkedIn AutoConnect header", () => {
    render(<App />);
    expect(screen.getByText(/LinkedIn AutoConnect/i)).toBeInTheDocument();
  });

  it("renders the invitations sent title", () => {
    render(<App />);
    expect(screen.getByText(/Invitations Sent/i)).toBeInTheDocument();
  });

  it("renders the button to start connecting", () => {
    render(<App />);
    const button = screen.getByText(/Start Connecting/i);
    expect(button).toBeInTheDocument();
  });
});
