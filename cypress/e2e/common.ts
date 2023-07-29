const testUsername = 'testuser'
const testPassword = 'password'
const testEmailAddress = 'test@dmtracker.com'
const campaignName = 'Campaign'

export function registerUser() {
  cy.visit('http://localhost:4200')

  cy.get('#not-logged-in-header').should('be.visible');
  cy.get('#register-tab').should('be.visible').click();

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
}

export function login() {
  cy.visit('http://localhost:4200');
  cy.get('#login-tab').should('be.visible')
    .click();

  cy.get('#login-username-input').should('be.visible')
    .type(testUsername).click();

  cy.get('#login-password-input').type(testPassword);
  cy.get('#login-submit-button').click();
}

export function deleteUser() {
  cy.visit('http://localhost:4200')
  cy.get('#login-tab').should('be.visible')
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

  cy.contains(campaignName);

  cy.reload();
  cy.contains(campaignName).click();

  cy.get('#nav-profile-link').click();
  cy.get('#delete-profile-button').click();
  cy.get('#confirm-profile-delete-button').should('be.visible').click();
  cy.get('#profile-delete-success-modal-button').should('be.visible').click();
}

export function createCampaign() {
  cy.get('#campaign-selector').should('be.visible');
  cy.get('#create-campaign-button').should('be.visible').click();
  cy.get('#create-campaign-name-input').should('be.visible')
    .type(campaignName);
  cy.get('#create-campaign-start-date-picker').should('not.exist');
  cy.get('#create-campaign-calendar-selector').select('Gregorian');

  cy.contains('Choose calendar system').click();

  cy.get('#create-campaign-submit-button').should('be.enabled').click();
  cy.get('#create-campaign-name-input').should('have.value', '');

  cy.contains(campaignName);

  cy.reload();
  cy.contains(campaignName);
}
