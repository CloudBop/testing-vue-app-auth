describe('the login process', () => {
  it('should login user, flash a message, and redirect to homepage', () => {
    // - SETUP / PREPARE
    // mock a server, prevent xhr reqiests, any outoging requests should not actually be sent to server...
    cy.server();
    //... instead they should be intercepted by cypress.
    cy.fixture('user').as('user');
    //
    // route to listen to and response with user fixture
    cy.route('POST', '/api/v1/auth/login', '@user');
    //
    // - run stuff here. actually runs in chrome
    // go to...
    cy.visit('/auth/login');
    // fill out form details
    cy.get('input[name="email"]').type('doctor@strange.com');
    cy.get('input[name="password"]').type('password');
    // only one button in DOM so no need to worry about specificity
    cy.get('button').click();
    //
    // make assertions
    cy.get('#confirm-email').should('contain', 'Please confirm your email address. ');
    cy.get('#auth-username').should('contain', 'doctor');
    cy.get('#auth-logout').should('contain', 'Logout');
  });
});
