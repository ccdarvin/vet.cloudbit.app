/// <reference types="cypress" />
/// <reference types="../commands/index.ts" />


Cypress.on("uncaught:exception", () => {
    return false;
    }
);


describe("patients", () => {
    beforeEach(() => {
        cy.clearAll();
        cy.login();
    });

    it("should be go to patients", () => {
        cy.get(".ant-menu-title-content").contains("Pacientes").click();
        cy.get(".ant-btn").contains("Crear").click();
        cy.wait(1000);
        cy.get("#customer_id").type("{downarrow}{enter}");
        cy.get("#name").type("Juan");
        cy.get(".ant-btn").contains("Guardar").click();
        cy.wait(1000);
        // check if the patient was created
        cy.get("table").contains("Juan");
    });
});