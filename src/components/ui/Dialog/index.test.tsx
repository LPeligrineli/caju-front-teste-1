import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react";
import Dialog from "./index";

describe("Dialog", () => {
  it("should not render the dialog when isOpen is false", async () => {
    await act(async () => {
      render(<Dialog isOpen={false} onClose={jest.fn()}>
        <div>Dialog Content</div>
      </Dialog>
      );
    });

    expect(screen.queryByText("Dialog Content")).not.toBeInTheDocument();
  });

  it("should render the dialog when isOpen is true", () => {
    act(() => {
      render(
        <Dialog isOpen={true} onClose={jest.fn()}>
          <div>Dialog Content</div>
        </Dialog>
      );
    });
    expect(screen.getByText("Dialog Content")).toBeInTheDocument();
  });

  it("should call onClose when the overlay is clicked", () => {
    const onClose = jest.fn();
    act(() => {
      render(
        <Dialog isOpen={true} onClose={onClose}>
          <div>Dialog Content</div>
        </Dialog>
      );
    });
    fireEvent.click(screen.getByTestId("overlay"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should call onClose when the close button is clicked", () => {
    const onClose = jest.fn();
    act(() => {
      render(
        <Dialog isOpen={true} onClose={onClose}>
          <div>Dialog Content</div>
        </Dialog>
      );
    });
    fireEvent.click(screen.getByRole("button"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});