describe("Article Detail Page", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/svc/mostpopular/v2/viewed/**", {
      fixture: "articles.json",
    }).as("getArticles");

    // Visit the article detail page with ID 1
    cy.visit("/article/1");

    // Wait for the API call to complete
    cy.wait("@getArticles");
  });

  it("displays the article details correctly", () => {
    cy.contains("Back to News").should("be.visible");
    cy.get("h1").should("be.visible");
    cy.get("img.object-cover").should("be.visible");

    cy.contains("Topics").should("be.visible");
    cy.contains("Read full article on NY Times")
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "https://");
  });

  it("shows tags and categories correctly", () => {
    // Check for section/category tags
    cy.get(".px-3.py-1.rounded-full").should("be.visible");

    // Check for topics/tags
    cy.get(".px-2.py-1.bg-gray-100").should("be.visible");
  });

  it("navigates back to home page when clicking back button", () => {
    // Click the back button
    cy.contains("Back to News").click();

    // Verify we're back on the homepage
    cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.contains("Trending News 🔥").should("be.visible");
  });


  it("shows article not found for invalid ID", () => {
    // Visit a page with an invalid article ID
    cy.visit("/article/999999");

    cy.contains("Article not found").should("be.visible");
    cy.contains("← Back to News").should("be.visible");
  });
});
