import '@testing-library/jest-dom';
import { render, screen, waitFor } from "@testing-library/react";
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import DashboardPage from "~/pages/Dashboard";
import { useRegisterContext } from "~/context/registrations.context";
import { useLoadingContext } from "~/context/loading.context";
import { PostService } from "~/services/posts";
import { act } from 'react';

jest.mock("~/context/registrations.context");
jest.mock("~/context/loading.context");
jest.mock("~/services/posts");

describe("DashboardPage", () => {
  const mockSetRegistration = jest.fn();
  const mockSetLoading = jest.fn();
  const mockPreviousRegistration = { current: [] };

  beforeEach(() => {
    (PostService.getRegistration as jest.Mock).mockResolvedValueOnce([
      {
        id: 1,
        employeeName: "John Doe",
        email: "john@example.com",
        cpf: "12345678909",
        admissionDate: "2023/01/01",
        status: "REVIEW",
      },
    ]);
    (useRegisterContext as jest.Mock).mockReturnValue({
      registration: [],
      setRegistration: mockSetRegistration,
      CacheRegistration: mockPreviousRegistration,
    });
    (useLoadingContext as jest.Mock).mockReturnValue({
      isLoading: false,
      setLoading: mockSetLoading,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call fetchRegistrations on mount", async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <DashboardPage />
      </Router>
    );

    await waitFor(() => {
      act(() => {
        
        expect(mockSetLoading).toHaveBeenCalledWith(true);
        expect(PostService.getRegistration).toHaveBeenCalled();
        expect(mockSetRegistration).toHaveBeenCalledWith([
          { 
            id: 1,
            employeeName: "John Doe",
            email: "john@example.com",
            cpf: "12345678909",
            admissionDate: "2023/01/01",
            status: "REVIEW",
          },
        ]);
        expect(mockSetLoading).toHaveBeenCalledWith(false);
      });
    });
  });

  it("should render the DashboardPage correctly", async () => {
    const history = createMemoryHistory();
    act(() => {
      render(
        <Router history={history}>
          <DashboardPage />
        </Router>
      );
    });

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Digite um CPF válido")).toBeInTheDocument();
      expect(screen.getByText("Nova Admissão")).toBeInTheDocument();
      expect(screen.getByText("Pronto para revisar")).toBeInTheDocument();
      expect(screen.getByText("Aprovado")).toBeInTheDocument();
      expect(screen.getByText("Reprovado")).toBeInTheDocument();
    });
  });
});
