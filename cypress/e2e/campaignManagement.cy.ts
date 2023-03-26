describe('campaign adding and deleting', () => {

  const testUsername = 'testuser'
  const testPassword = 'password'
  const campaignName = 'Cypress test campaign'

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

    cy.reload();
    cy.contains(campaignName);
  })

  it('fails to create another campaign with existing name', () => {
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

  it('deletes campaign', () => {
    cy.visit('http://localhost:4200')
    cy.get('#login-button').should('be.visible')
      .click();

    cy.get('#login-username-input').should('be.visible')
      .type(testUsername).click();

    cy.get('#login-password-input').type(testPassword);
    cy.get('#login-submit-button').click();

    cy.contains(campaignName);
    cy.contains('Delete').click();
    cy.get('#campaign-deleted-modal').should('be.visible');
    cy.get('#campaign-deleted-modal-close-button').should('be.visible').click();
    cy.get('#campaign-deleted-modal').should('not.be.visible');
    cy.contains(campaignName).should('not.exist');
  })

});
