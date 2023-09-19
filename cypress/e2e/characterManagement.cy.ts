import { createCampaign, deleteUser, login, logout, registerUser } from "./common";

describe('characters', () => {
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

  before(() => {
    registerUser()
    login()
    createCampaign()
    logout()
  });

  after(() => {
    deleteUser()
  });

  beforeEach(() => {
    login()
  });

  afterEach(() => {
    logout()
  })

  it('creates new characters in the campaign overview', () => {
    cy.contains(campaignName).click();

    cy.get('#protagonists-manager-manage-button').click();

    charactersToAdd.forEach(character => {
      cy.get('#new-player-character-name-input').type(character.name);
      cy.get('#new-player-character-level-input').type(character.level);
      cy.get('#new-player-character-max-hp-input').type(character.maxHp);

      cy.get('#new-player-character-add-button').click();
    })

    cy.get('#player-characters-editor-submit-button').click();
    charactersToAdd.forEach(character => {
      cy.contains(character.name)
    })

    cy.visit('http://localhost:4200');
    cy.contains(campaignName).click();
    charactersToAdd.forEach(character => {
      cy.contains(character.name)
    })

    // check for not duplicating player characters, this happened before
    cy.get('#protagonists-manager-manage-button').click();
    cy.get('#new-player-character-name-input').type('New character');
    cy.get('#new-player-character-level-input').type('1');
    cy.get('#new-player-character-max-hp-input').type('10');

    cy.get('#new-player-character-add-button').click();
    cy.get('#player-characters-editor-submit-button').click();

    cy.visit('http://localhost:4200');
    cy.contains(campaignName).click();
    charactersToAdd.forEach(character => {
      cy.contains(character.name).should('have.length', 1)
    })
  })

  it('deletes character from campaign', () => {
    cy.contains(campaignName).click();
    charactersToAdd.forEach(character => {
      cy.contains(character.name).should('have.length', 1)
    })

    cy.get('#protagonists-manager-manage-button').click();
    cy.get('input')
      .filter((k, input) => {
        return input.value == charactersToAdd[3].name
      })
      .should('be.visible')
      .parent('td')
      .parent('tr').within(() => {
      cy.get('button').contains('Delete').click()
    })
    cy.get('#player-characters-editor-submit-button').click();

    charactersToAdd.forEach(character => {
      if (character != charactersToAdd[3]) {
        cy.contains(character.name).should('exist');
      } else {
        cy.contains(character.name).should('not.exist');
      }
    })

  })

})
