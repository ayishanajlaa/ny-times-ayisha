// src/App.test.tsx
import { render, screen } from "@testing-library/react";
import App from "../../App";
import React from "react";

// Mock components
jest.mock("../ArticleList", () => {
  const MockArticleList = () => <div data-testid="article-list">Article List</div>;
  MockArticleList.displayName = "MockArticleList";
  return MockArticleList;
});

jest.mock("../ArticleDetail", () => {
  const MockArticleDetail = () => <div data-testid="article-detail">Article Detail</div>;
  MockArticleDetail.displayName = "MockArticleDetail";
  return MockArticleDetail;
});
jest.mock("../Navbar", () => ({
  __esModule: true,
  default: () => <div data-testid="navbar">Navbar</div>,
}));

describe("App Component", () => {
  beforeEach(() => {
    // Mock localStorage
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
    };
    Object.defineProperty(window, "localStorage", { value: localStorageMock });
  });

  test("renders the app with navbar and article list", () => {
    render(<App />);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("article-list")).toBeInTheDocument();
  });

  test("applies dark mode based on localStorage preference", () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue("dark");

    render(<App />);

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
