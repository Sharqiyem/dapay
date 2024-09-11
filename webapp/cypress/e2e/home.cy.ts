describe('Home Page', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should display the main heading', () => {
        cy.get('h1').contains('DaPay');
    });

    it('should have a connect wallet button when not connected', () => {
        cy.get('button').contains('Connect Wallet');
    });

    // Add more tests as needed
});