describe('registration and logging in', () => {

  const testUsername = 'testuser'
  const testPassword = 'superpassword3000'
  const badPassword = 'some bad password'
  const testEmailAddress = 'test@dmtracker.com'

  it('registers a new user', () => {
    cy.visit('http://localhost:4200')

    cy.get('#not-logged-in-header').should('be.visible');
    cy.get('#register-button').should('be.visible').click();

    cy.get('#registration-submit-button').should('be.disabled');

    cy.get('#registration-username-input').should('be.visible')
      .type(testUsername);
    cy.get('#registration-password-input').should('be.visible')
      .type(testPassword);
    cy.get('#registration-email-input').should('be.visible')
      .type(testEmailAddress);

    cy.get('#registration-submit-button').should('be.enabled')
      .click();
  })

  // TODO: registering a new user with existing username should fail test

  it('logs in with bad credentials', () => {
    cy.get('#login-button').should('be.visible')
      .click();

    cy.get('#bad-credentials-modal').should('not.exist');
    cy.get('#login-username-input').should('be.visible')
      .type(testUsername).click();

    cy.get('#login-password-input').type(badPassword);
    cy.get('#login-submit-button').click();

    cy.get('#bad-credentials-modal').should('exist');
    cy.get('#bad-credentials-modal').should('be.visible');
    cy.get('#bad-credentials-modal-close-button').click();
    cy.get('#bad-credentials-modal').should('not.exist');
  })

  it('logs in as new user', () => {
    cy.get('#login-button').should('be.visible')
      .click();

    cy.get('#login-username-input').should('be.visible')
      .type(testUsername).click();

    cy.get('#login-password-input').type(testPassword);
    cy.get('#login-submit-button').click();
  })

  it('creates new campaign', () => {
    cy.get('#campaign-selector').should('be.visible');
    cy.get('#create-campaign-button').should('be.visible').click();
    cy.get('#create-campaign-name-input').should('be.visible')
      .type('Cypress test campaign');
    cy.get('#create-campaign-calendar-selector').select('Gregorian');
    cy.get('#create-campaign-submit-button').click();
    cy.get('#create-campaign-name-input').should('have.value', '');

    cy.contains('Last played');
  })

})
