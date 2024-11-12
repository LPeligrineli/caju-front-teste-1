import '@testing-library/jest-dom';
import Button from ".";
import { render, screen } from "@testing-library/react";
import { act } from "react";

describe("Button", () => {
  it("should render the button with the correct text", () => {
    act(() => {
      render(<Button>Ativar</Button>);
    });
    const button = screen.getByRole("button", { name: /ativar/i });
    expect(button).toBeInTheDocument();
  });
});