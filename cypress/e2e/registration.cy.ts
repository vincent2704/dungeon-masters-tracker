describe('registration and logging in', () => {

  const testUsername = 'testuser'
  const testPassword = 'superpassword3000'
  const badPassword = 'some bad password'
  const testEmailAddress = 'test@dmtracker.com'
  const campaignName = 'Cypress test campaign'

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

  it('creates new campaign', () => {
    cy.visit('http://localhost:4200')
    cy.get('#login-button').should('be.visible')
      .click();

    cy.get('#login-username-input').should('be.visible')
      .type(testUsername).click();

    cy.get('#login-password-input').type(testPassword);
    cy.get('#login-submit-button').click();

    cy.get('#campaign-selector').should('be.visible');
    cy.get('#create-campaign-button').should('be.visible').click();
    cy.get('#create-campaign-name-input').should('be.visible')
      .type(campaignName);
    cy.get('#create-campaign-calendar-selector').select('Gregorian');
    cy.get('#create-campaign-submit-button').click();
    cy.get('#create-campaign-name-input').should('have.value', '');

    cy.contains(campaignName);

    // TODO: remove campaign after creating
  })

  it('fails to create another campaign with the same name', () => {
    // TODO: change when campaign removal is implemented and then
    //  check if there are no campaigns created, then try to create both campaigns in one step
    cy.visit('http://localhost:4200')
    cy.get('#login-button').should('be.visible')
      .click();

    cy.get('#login-username-input').should('be.visible')
      .type(testUsername).click();

    cy.get('#login-password-input').type(testPassword);
    cy.get('#login-submit-button').click();

    cy.get('#campaign-selector').should('be.visible');
    cy.contains(campaignName);
    cy.get('#create-campaign-button').should('be.visible').click();
    cy.get('#create-campaign-name-input').should('be.visible')
      .type(campaignName);
    cy.get('#create-campaign-calendar-selector').select('Gregorian');
    cy.get('#create-campaign-submit-button').click();

    cy.get('#campaign-creation-failed-modal').should('be.visible');
  })

})
