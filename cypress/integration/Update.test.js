describe("Login Module", () => {
  it("Check if clicking on update redirects user to update page from chat page", () => {
    cy.visit("http://localhost:3000/chat");
    cy.get("button").contains("Update").click();
    cy.url().should("include", "/update");
  });

  it("Check if clicking on update redirects user from chat page to update page", () => {
    cy.visit("http://localhost:3000/update");
    cy.get("h1").contains("Update");
    cy.get("form").within(() => {
      cy.get("[id=updateUserComponentName]").click().type("AAAAAAAA");
    });
    cy.get("button").contains("Update").click();
    cy.url().should("include", "/chat");
  });
});
