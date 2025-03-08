import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ArticleDetail from "../ArticleDetail";
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
    abstract: "This is a test article abstract",
    published_date: "2023-01-01",
    section: "Politics",
    subsection: "Election",
    url: "https://example.com/article",
    des_facet: ["Topic 1", "Topic 2"],
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
];

describe("ArticleDetail Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("displays loading state initially", () => {
    // Use a promise that won't resolve during this test
    const neverResolvingPromise = new Promise((resolve) => {
      // This will never be called, keeping the component in loading state
      setTimeout(resolve, 10000000);
    });
    (api.fetchArticles as jest.Mock).mockImplementation(() => neverResolvingPromise);

    render(
      <MemoryRouter initialEntries={["/article/1"]}>
        <Routes>
          <Route path="/article/:id" element={<ArticleDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    // Check for loading state
    expect(screen.getByText(/loading article/i)).toBeInTheDocument();
  });

  test("displays article details after loading", async () => {
    // Setup the mock before rendering
    (api.fetchArticles as jest.Mock).mockResolvedValue(mockArticles);

    render(
      <MemoryRouter initialEntries={["/article/1"]}>
        <Routes>
          <Route path="/article/:id" element={<ArticleDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    // Wait for the loading to complete and article to display
    await waitFor(() => {
      expect(screen.getByText("Test Article 1")).toBeInTheDocument();
    });

    // Verify all the other elements
    expect(screen.getByText("By Test Author")).toBeInTheDocument();
    expect(screen.getByText("This is a test article abstract")).toBeInTheDocument();
    expect(screen.getByText("Politics")).toBeInTheDocument();
    expect(screen.getByText("Election")).toBeInTheDocument();
    expect(screen.getByText("Topic 1")).toBeInTheDocument();
    expect(screen.getByText("Topic 2")).toBeInTheDocument();

    // Make sure the "Read full article" link is present
    expect(screen.getByText(/Read full article on NY Times/i)).toBeInTheDocument();
  });

  test("displays article not found message when article does not exist", async () => {
    (api.fetchArticles as jest.Mock).mockResolvedValue(mockArticles);

    render(
      <MemoryRouter initialEntries={["/article/999"]}>
        <Routes>
          <Route path="/article/:id" element={<ArticleDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    // Wait for the loading to complete and "not found" message to display
    await waitFor(() => {
      expect(screen.getByText(/Article not found/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/Back to News/i)).toBeInTheDocument();
  });
});
