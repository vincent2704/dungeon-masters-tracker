describe('deleting profile', () => {

  const testUsername = 'testuser'
  const testPassword = 'password'
  const campaignName = 'Campaign created just to delete user'

  it('deletes profile', () => {
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
  })

})
