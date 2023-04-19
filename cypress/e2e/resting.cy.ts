describe('resting', () => {

  const testUsername = 'testuser'
  const testPassword = 'password'
  const campaignName = 'Campaign for Resting Testing!'

  const playerCharacterNames = ['Player Character 1', 'Player Character 2', 'Player Character 3']

  before(() => {
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
    cy.get('#create-campaign-name-input').should('have.value', '');

    cy.contains(campaignName).click();
    cy.get('#nav-campaign-overview-link').click();

    cy.contains('Manage').click();
    for (let i = 0; i < playerCharacterNames.length; i++) {
      cy.get('#new-player-character-name-input').type(playerCharacterNames[i]);
      cy.get('#new-player-character-level-input').type(`${i + 1}`);
      cy.get('#new-player-character-max-hp-input').type(`${i + 1}0`);
      cy.get('#new-player-character-add-button').click()
    }
    cy.get('#player-characters-editor-submit-button').click();
  })

  beforeEach(() => {
    cy.visit('http://localhost:4200')
    cy.contains(campaignName).click();
    cy.get('#nav-resting-link').click()
  })

  after(() => {
    it('deletes campaign', () => {
      cy.visit('http://localhost:4200')
      cy.get('#login-tab').should('be.visible')
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
  })

  it('presented data is correct', () => {
    for (const pcName of playerCharacterNames) {
      cy.contains(pcName).parent('tr').within(() => {
        // e.g. for index 0, then 10hp
        const expectedHp = `${playerCharacterNames.indexOf(pcName) + 1}0`
        const expectedHitDice = playerCharacterNames.indexOf(pcName) + 1
        cy.get('td').eq(1).contains(expectedHp)
        cy.get('td').eq(2).contains(expectedHitDice)
      })
    }
  })

})
