import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import TextField from "../TextField"; // Ajuste o caminho conforme necessário
import { act } from "react";

describe("TextField", () => {
  it("should render the text field with the correct label", async () => {
    await act(async () => {
      render(<TextField name="username" label="Username" />);
    });
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
  });

  it("should display the error message when provided", async () => {
    await act(async () => {
      render(<TextField name="username" label="Username" error="This field is required" />);
    });
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("should accept and display the correct value", async () => {
    await act(async () => {
      render(<TextField name="username" label="Username" value="JohnDoe" />);
    });
    const input = screen.getByLabelText("Username") as HTMLInputElement;
    expect(input.value).toBe("JohnDoe");
  });

  it("should call the onChange handler when the value changes", async () => {
    const handleChange = jest.fn();
    await act(async () => {
      render(<TextField name="username" label="Username" onChange={handleChange} />);
    });
    
    const input = screen.getByLabelText("Username");
    fireEvent.change(input, { target: { value: "JaneDoe" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect((input as HTMLInputElement).value).toBe("JaneDoe");
  });
});