import { render, screen, waitFor, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AppContext } from "../../App";
import ArticleList from "../ArticleList";
import * as api from "../../api";
import React from "react";

// Mock the API
jest.mock("../../api", () => ({
  fetchArticles: jest.fn(),
}));

const mockArticles = [
  {
    id: 1,
    title: "Test Article 1",
    byline: "By Test Author",
    published_date: "2023-01-01",
    media: [
      {
        "media-metadata": [
          { url: "small-image.jpg" },
          { url: "medium-image.jpg" },
          { url: "large-image.jpg" },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Test Article 2",
    byline: "By Another Author",
    published_date: "2023-01-02",
    media: [],
  },
];

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
beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(jest.fn());
});

afterEach(() => {
  (console.error as jest.Mock).mockRestore();
});

describe("ArticleList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("displays loading state initially", () => {
    (api.fetchArticles as jest.Mock).mockImplementation(() => Promise.resolve([]));

    renderWithContext(<ArticleList />);

    expect(screen.getByText(/loading articles/i)).toBeInTheDocument();
  });

  test("displays articles after loading", async () => {
    (api.fetchArticles as jest.Mock).mockResolvedValue(mockArticles);
    renderWithContext(<ArticleList />);
    expect(api.fetchArticles).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByText("Test Article 1")).toBeInTheDocument();
      expect(screen.getByText("Test Article 2")).toBeInTheDocument();
    });
  });

  test("displays error message on API failure", async () => {
    (api.fetchArticles as jest.Mock).mockRejectedValue(new Error("Failed to fetch"));

    await act(async () => {
      renderWithContext(<ArticleList />);
    });

    await waitFor(() => {
      expect(screen.getByText("Failed to fetch")).toBeInTheDocument();
      expect(screen.getByText("Try Again")).toBeInTheDocument();
    });
  });

  test("filters articles based on search key", async () => {
    (api.fetchArticles as jest.Mock).mockResolvedValue(mockArticles);

    renderWithContext(<ArticleList />, {
      ...mockContext,
      searchKey: "Article 1",
    });

    await waitFor(() => {
      expect(screen.getByText("Test Article 1")).toBeInTheDocument();
      expect(screen.queryByText("Test Article 2")).not.toBeInTheDocument();
    });
  });

  test("displays no results message when search has no matches", async () => {
    (api.fetchArticles as jest.Mock).mockResolvedValue(mockArticles);

    renderWithContext(<ArticleList />, {
      ...mockContext,
      searchKey: "No Match",
    });

    await waitFor(() => {
      expect(
        screen.getByText(/No articles found matching your search criteria/i),
      ).toBeInTheDocument();
    });
  });
});
