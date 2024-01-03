/// <reference types="cypress" />
/// <reference types="../commands/index.ts" />

Cypress.on("uncaught:exception", () => {
  return false;
});

describe("base-antd", () => {
  beforeEach(() => {
    cy.clearAll();
    cy.login();
  });

  it("should be go to appointment", () => {
    cy.get(".ant-menu-title-content").contains("Citas").click();
    cy.get(".ant-btn").contains("Crear").click();
    cy.wait(1000);
    cy.get("#patient_id").type("{downarrow}{enter}");
    cy.get("#doctor_id").type("{downarrow}{enter}");
    cy.get("#date")
        .click()
        .get(".ant-picker-now-btn")
        .click();
    
    cy.get("#reason").type("Cita de prueba");
    cy.get(".ant-btn").contains("Guardar").click();
    cy.wait(1000);
    // check if the appointment was created
    cy.get("table").contains("Cita de prueba");
  });
});
