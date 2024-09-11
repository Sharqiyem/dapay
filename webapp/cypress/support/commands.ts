// Example of a custom command
Cypress.Commands.add('connectWallet', () => {
    cy.get('button').contains('Connect Wallet').click();
    // Add any necessary steps to mock wallet connection
});

// Declare the custom command for TypeScript
declare global {
    namespace Cypress {
        interface Chainable {
            connectWallet(): Chainable<void>
        }
    }
}

export { };