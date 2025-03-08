// src/components/__tests__/Navbar.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AppContext } from "../../App";
import Navbar from "../Navbar";

// Mock the context
const mockContext = {
  darkMode: false,
  toggleAppTheme: jest.fn(),
  searchKey: "",
  handleNewsSearch: jest.fn(),
};

const renderWithContext = (ui: React.ReactNode, contextValue = mockContext) => {
  return render(
    <AppContext.Provider value={contextValue}>
      <BrowserRouter>{ui}</BrowserRouter>
    </AppContext.Provider>,
  );
};

describe("Navbar Component", () => {
  test("renders navbar with logo", () => {
    renderWithContext(<Navbar />);
    expect(screen.getByText(/NY Times/i)).toBeInTheDocument();
  });

  test("search input works correctly", () => {
    renderWithContext(<Navbar />);
    const searchInput = screen.getByPlaceholderText(/search articles/i);

    fireEvent.change(searchInput, { target: { value: "politics" } });

    expect(mockContext.handleNewsSearch).toHaveBeenCalledWith("politics");
  });

  test("theme toggle button works", () => {
    renderWithContext(<Navbar />);
    const themeToggle = screen.getByRole("button", { name: /switch to dark mode/i });

    fireEvent.click(themeToggle);

    expect(mockContext.toggleAppTheme).toHaveBeenCalled();
  });

  test("renders dark mode button correctly", () => {
    renderWithContext(<Navbar />, {
      ...mockContext,
      darkMode: true,
    });

    expect(screen.getByRole("button", { name: /switch to light mode/i })).toBeInTheDocument();
  });
});
