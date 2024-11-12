import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import NewUserForm from "~/pages/NewUser";
import { createUser } from "~/services/createUser";

// Mock the necessary services
jest.mock("~/services/createUser");

describe("NewUserForm", () => {
  const mockCreateUser = createUser as jest.Mock;

  beforeEach(() => {
    mockCreateUser.mockResolvedValue({ message: "Usuário cadastrado com sucesso" });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the form correctly", async () => {
    const history = createMemoryHistory();
    await act(async () => {
      render(
        <Router history={history}>
          <NewUserForm />
        </Router>
      );
    });
    expect(screen.getByTestId("employeeName")).toBeInTheDocument();
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("cpf")).toBeInTheDocument();
    expect(screen.getByTestId("admissionDate")).toBeInTheDocument();
  });

  it("should validate the form fields", async () => {
    const history = createMemoryHistory();
    await act(async () => {
      render(
        <Router history={history}>
          <NewUserForm />
        </Router>
      );
    });

    await act(async () => {
      fireEvent.submit(screen.getByRole("button", { name: /Cadastrar/i }));
    });

    expect(screen.getByTestId("employeeName")).toBeInTheDocument();
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("cpf")).toBeInTheDocument();
    expect(screen.getByTestId("admissionDate")).toBeInTheDocument();
  });

  it("should submit the form with valid data", async () => {
    const history = createMemoryHistory();
    await act(async () => {
      render(
        <Router history={history}>
          <NewUserForm />
        </Router>
      );
    });

    await act(async () => {
      fireEvent.change(screen.getByTestId("employeeName"), { target: { value: "Leonidas Peligrineli" } });
      fireEvent.change(screen.getByTestId("email"), { target: { value: "leonidas@example.com" } });
      fireEvent.change(screen.getByTestId("cpf"), { target: { value: "123.456.789-09" } });
      fireEvent.change(screen.getByTestId("admissionDate"), { target: { value: "2023-01-01" } });
      fireEvent.submit(screen.getByRole("button", { name: /Cadastrar/i }));
    });

    await waitFor(() => {
      expect(mockCreateUser).toHaveBeenCalledWith({
        employeeName: "Leonidas Peligrineli",
        email: "leonidas@example.com",
        cpf: "123.456.789-09",
        admissionDate: "2023-01-01",
        status: "REVIEW",
      });
      expect(screen.getByText(/Usuário cadastrado com sucesso/i)).toBeInTheDocument();
    });
  });
});