/// <reference types="cypress" />


declare namespace Cypress {
    interface Chainable<Subject> {
        clearAll(): Chainable<Subject>;
        login(email?: string, password?: string): Chainable<Subject>;
    }
}