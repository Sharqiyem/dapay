import '@testing-library/cypress/add-commands';

// Prevent TypeScript from reading file as legacy script
export {};

Cypress.on('uncaught:exception', (err) => {
  // Returning false here prevents Cypress from failing the test
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false;
  }
});
