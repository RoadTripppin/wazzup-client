let email;
describe("Login Module", () => {
  it("Check if user can enter email and password", () => {
    cy.visit("http://localhost:3000");
    cy.get("h1").contains("Login");

    cy.get("form").within(() => {
      cy.get("[id=loginComponentEmail]")
        .click()
        .type("fake@email.com")
        .invoke("val")
        .then((text) => {
          email = text;
          cy.writeFile("./cypress/fixtures/loginComponent.json", {
            email: email,
          });
          expect(email).to.equal("fake@email.com");
        });
      cy.get("[id=loginComponentPassword]").click().type("password").should("have.value", "password");
    });
  });

  it("Check if clicking on signup redirects user", () => {
    cy.visit("http://localhost:3000");
    cy.get("h1").contains("Login");
    cy.get('a[href*="register"]').click();
    cy.url().should("include", "/register");
  });

  it("Check if clicking on signup redirects user with email passed through when email is entered", () => {
    cy.visit("http://localhost:3000");
    cy.get("h1").contains("Login");
    cy.get("form").within(() => {
      cy.get("[id=loginComponentEmail]")
        .click()
        .type("fake@email.com")
        .invoke("val")
        .then((text) => {
          expect(text).to.equal("fake@email.com");
        });
    });
    cy.get('a[href*="register"]').click();
    cy.readFile("./cypress/fixtures/loginComponent.json").then((obj) => {
      email = obj.email;
      cy.url().should("include", "/register?email=" + email);
    });
  });

  it("Check if clicking on signup redirects user with email passed (blank email) through when no email is entered", () => {
    cy.visit("http://localhost:3000");
    cy.get("h1").contains("Login");
    cy.get("form").within(() => {
      cy.get("[id=loginComponentEmail]")
        .click()
        .invoke("val")
        .then((text) => {
          expect(text).to.equal("");
          cy.writeFile("./cypress/fixtures/loginComponent.json", {
            email: text,
          });
        });
    });
    cy.get('a[href*="register"]').click();
    cy.readFile("./cypress/fixtures/loginComponent.json").then((obj) => {
      email = obj.email;
      cy.url().should("include", "/register?email=" + email);
    });
  });
});
