describe("Home Page", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/svc/mostpopular/v2/viewed/**", {
      fixture: "articles.json",
    }).as("getArticles");

    // Visit the homepage
    cy.visit("/");

    // Wait for the API call to complete
    cy.wait("@getArticles");
  });

  it("displays the navbar correctly", () => {
    cy.get("nav").should("be.visible");
    cy.contains("📰 NY Times").should("be.visible");
    cy.get('input[placeholder="Search articles..."]').should("be.visible");
    cy.get('button[aria-label*="mode"]').should("be.visible");
  });

  it("displays article cards", () => {
    cy.contains("Trending News 🔥").should("be.visible");
    cy.get(".grid > div").should("have.length.at.least", 1);

    // Check first article details are displayed
    cy.get(".grid > div")
      .first()
      .within(() => {
        cy.get("h2").should("be.visible");
        cy.get("img").should("have.attr", "src");
      });
  });

  it("can search for articles", () => {
    const searchTerm = "Test";

    cy.get('input[placeholder="Search articles..."]').type(searchTerm);

    // Verify filtered results
    cy.get(".grid > div").each(($article) => {
      cy.wrap($article).find("h2").invoke("text").should("include", searchTerm);
    });
  });

  it("can toggle dark mode", () => {
    cy.get("html").should("not.have.class", "dark");

    // Click theme toggle button
    cy.get('button[aria-label*="mode"]').click();

    // Verify dark mode is enabled
    cy.get("html").should("have.class", "dark");
  });

  it("navigates to article detail when clicking an article", () => {
    // Click on the first article
    cy.get(".grid > div").first().click();

    // Verify we're on the article detail page
    cy.url().should("include", "/article/");
    cy.contains("Back to News").should("be.visible");
  });
});
