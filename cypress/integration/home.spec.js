// cypress testing
describe('the home page', () => {
  it('should display the page title', () => {
    //
    cy.visit('/');
    // css-selectpr
    cy.get('#home-page-title').should('contain', 'FULLSTACK-JS MERN STARTER');
  });
  //
  it('should display the page title', () => {
    //
    cy.visit('/');
    // css-selectpr
    cy.get('#login-button').should('contain', 'Sign In');
    cy.get('#register-button').should('contain', 'Join Now');
  });
  //
  it('should navigate to sign in page', () => {
    cy.visit('/');
    cy.get('#login-button').click();
    cy.url().should('contain', 'auth/login');
  });
  //
  it('should navigate to register page', () => {
    cy.visit('/');
    cy.get('#register-button').click();
    cy.url().should('contain', 'auth/register');
  });
});
