import { createCampaign, deleteUser, login, registerUser } from "./common";

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
  })

  after(() => {
    deleteUser()
  });

  it('creates new characters in the campaign overview', () => {
    cy.contains(campaignName).click();

    cy.contains('Manage').click();

    charactersToAdd.forEach(character => {
      cy.get('#new-player-character-name-input').type(character.name);
      cy.get('#new-player-character-level-input').type(character.level);
      cy.get('#new-player-character-max-hp-input').type(character.maxHp);

      cy.get('#new-player-character-add-button').click();
    })

    cy.get('#player-characters-editor-submit-button').click();
    cy.visit('http://localhost:4200');
    cy.contains(campaignName).click();
    charactersToAdd.forEach(character => {
      cy.contains(character.name)
    })
  })

})
