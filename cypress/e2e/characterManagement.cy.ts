import { cleanPackageJson } from "@angular/compiler-cli/ngcc/src/packages/build_marker";

describe('characters', () => {

  const testUsername = 'testuser'
  const testPassword = 'password'
  const testActorName = 'Test Player Character'
  const campaignName = 'Campaign'

  const charactersToAdd = [
    {
      name: 'Character 1',
      level: '1',
      maxHp: '10'
    },
    {
      name: 'Character 2',
      level: '2',
      maxHp: '20'
    },
    {
      name: 'Character 3',
      level: '3',
      maxHp: '30'
    },
    {
      name: 'Character 4',
      level: '4',
      maxHp: '40'
    },
    {
      name: 'Character 5',
      level: '5',
      maxHp: '50'
    },
  ]

  beforeEach(() => {
    cy.visit('http://localhost:4200');
    cy.get('#login-tab').should('be.visible')
      .click();

    cy.get('#login-username-input').should('be.visible')
      .type(testUsername).click();

    cy.get('#login-password-input').type(testPassword);
    cy.get('#login-submit-button').click();
  });

  after(() => {
    cy.visit('http://localhost:4200');
    cy.contains('Delete').click();
    cy.get('#campaign-deleted-modal-close-button').click();
    cy.get('#nav-logout').click();
  });

  it('create campaign', () => {
    cy.get('#campaign-selector').should('be.visible');
    cy.get('#create-campaign-button').should('be.visible').click();
    cy.get('#create-campaign-name-input').should('be.visible')
      .type(campaignName);
    cy.get('#create-campaign-start-date-picker').should('not.exist');
    cy.get('#create-campaign-calendar-selector').select('Gregorian');

    cy.contains('Choose calendar system').click(); // value in the time form isn't updated in real time and
    // some other event needs to occur until it happens and the button gets enabled. it needs to be fixed

    cy.get('#create-campaign-submit-button').should('be.enabled').click();
    cy.get('#create-campaign-name-input').should('have.value', '');

    cy.contains(campaignName);

    cy.reload();
    cy.contains(campaignName);
  })

  it('creates new characters in the campaign overview', () => {
    cy.contains(campaignName).click();
    cy.contains(testActorName).should('not.exist');

    cy.contains('Manage').click();

    charactersToAdd.forEach(character => {
      cy.get('#new-player-character-name-input').type(character.name);
      cy.get('#new-player-character-level-input').type(character.level);
      cy.get('#new-player-character-max-hp-input').type(character.maxHp);

      cy.get('#new-player-character-add-button').click();
    })

    cy.get('#player-characters-editor-submit-button').click();
  })

  // it('character is present in other components', () => {
  //   cy.contains('Battle').click();
  //   cy.contains(testActorName)
  //
  //   cy.contains('Tools').click();
  //   cy.contains('Combat difficulty calculator').click();
  //   cy.contains(testActorName);
  // })

})
