let email;
describe("Register Module", () => {
  it("Check if clicking on Login redirects user", () => {
    cy.visit("http://localhost:3000/register");
    cy.get("h1").contains("Register");
    cy.get('a[href*="/?email"]').click();
    cy.url().should("include", "/?email");
  });

  it("Check if clicking on signup redirects user with email passed through when email is entered", () => {
    cy.visit("http://localhost:3000/register");
    cy.get("h1").contains("Register");
    cy.get("form").within(() => {
      cy.get("[id=registerComponentEmail]")
        .click()
        .type("fake@email.com")
        .invoke("val")
        .then((text) => {
          expect(text).to.equal("fake@email.com");
          cy.writeFile("./cypress/fixtures/registerComponent.json", {
            email: text,
          });
        });
    });
    cy.get('a[href*="/?"]').click();
    cy.readFile("./cypress/fixtures/registerComponent.json").then((obj) => {
      email = obj.email;
      cy.url().should("include", "/?email=" + email);
    });
  });

  it("Check if clicking on signup redirects user with email passed (blank email) through when no email is entered", () => {
    cy.visit("http://localhost:3000/register");
    cy.get("h1").contains("Register");
    cy.get("form").within(() => {
      cy.get("[id=registerComponentEmail]")
        .click()
        .invoke("val")
        .then((text) => {
          expect(text).to.equal("");
          cy.writeFile("./cypress/fixtures/registerComponent.json", {
            email: text,
          });
        });
    });
    cy.get('a[href*="/?"]').click();
    cy.readFile("./cypress/fixtures/registerComponent.json").then((obj) => {
      email = obj.email;
      cy.url().should("include", "/?email=" + email);
    });
  });
});
