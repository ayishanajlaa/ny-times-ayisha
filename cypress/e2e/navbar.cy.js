describe("Navbar Component", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("has correct logo that links to home page", () => {
    // Check if logo exists and has correct text
    cy.contains("📰 NY Times").should("be.visible").click();

    // Verify we stay on the homepage after clicking logo
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  it("has functioning search input", () => {
    // Type in search box
    const searchTerm = "Politics";
    cy.get('input[placeholder="Search articles..."]').should("be.visible").type(searchTerm);

    cy.get('input[placeholder="Search articles..."]').should("have.value", searchTerm);
  });

  it("has functioning theme toggle button", () => {
    // Get the current theme state
    cy.get("html").then(($html) => {
      const initialIsDark = $html.hasClass("dark");

      cy.get('button[aria-label*="mode"]').click();

      cy.get("html").should(initialIsDark ? "not.have.class" : "have.class", "dark");

      // Click again to restore original state
      cy.get('button[aria-label*="mode"]').click();

      cy.get("html").should(initialIsDark ? "have.class" : "not.have.class", "dark");
    });
  });

  it("maintains search term across page navigation", () => {
    // Stub the API response
    cy.intercept("GET", "**/svc/mostpopular/v2/viewed/**", {
      fixture: "articles.json",
    }).as("getArticles");

    const searchTerm = "Test";
    cy.get('input[placeholder="Search articles..."]').type(searchTerm);

    cy.get(".grid > div").first().click();

    // Navigate back to home
    cy.contains("Back to News").click();

    cy.get('input[placeholder="Search articles..."]').should("have.value", searchTerm);
  });
});
