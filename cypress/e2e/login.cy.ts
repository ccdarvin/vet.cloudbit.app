/// <reference types="cypress" />
/// <reference types="../commands/index.ts" />

Cypress.on("uncaught:exception", () => {
  return false;
});

describe("base-antd", () => {

  beforeAll(() => {
    cy.clearAll();
  });

  it("should be login", () => {
      cy.login("cc.darvin@gmail.com.pe", "dw86cc");
  });
});