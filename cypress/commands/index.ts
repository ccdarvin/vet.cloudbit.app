/// <reference types="./index.d.ts" />

const BASE_URL = "http://localhost:5173/";



Cypress.Commands.add('clearAll', () => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.window().then((win) => {
    win.sessionStorage.clear();
  });

  cy.visit(BASE_URL);
});

Cypress.Commands.add('login', (email="cc.darvin@gmail.com.pe", password="dw86cc") => {
  cy.get("#email").type(email);
  cy.get("#password").type(password);
  cy.get(".ant-btn").click();
});