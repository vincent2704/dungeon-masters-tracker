describe('registration and logging in', () => {

  const testUsername = 'testuser'
  const testPassword = 'password'
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
    cy.get('#registration-success-modal').should('be.visible');
  })

  it('fails to register user that already exists', () => {
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
    cy.get('#user-exists-modal').should('be.visible');
  })

  it('logs in with bad credentials', () => {
    cy.visit('http://localhost:4200')
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
    cy.visit('http://localhost:4200')
    cy.get('#login-button').should('be.visible')
      .click();

    cy.get('#login-username-input').should('be.visible')
      .type(testUsername).click();

    cy.get('#login-password-input').type(testPassword);
    cy.get('#login-submit-button').click();
  })

})
