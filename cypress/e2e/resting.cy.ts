import { createCampaign, deleteUser, login, logout, registerUser } from "./common";

describe('resting', () => {

  const campaignName = 'Campaign for Resting Testing!'

  const playerCharacters = ['PC level 1', 'PC level 2', 'PC level 3']

  before(() => {
    registerUser()
    login();
    createCampaign(campaignName);

    cy.contains(campaignName).click();
    cy.get('#nav-campaign-overview-link').click();

    cy.contains('Manage').click();
    for (let i = 0; i < playerCharacters.length; i++) {
      cy.get('#new-player-character-name-input').type(playerCharacters[i]);
      cy.get('#new-player-character-level-input').type(`${i + 1}`);
      cy.get('#new-player-character-max-hp-input').type(`${i + 1}0`);
      cy.get('#new-player-character-add-button').click()
    }
    cy.get('#player-characters-editor-submit-button').click();
    logout()
  });

  after(() => {
    deleteUser()
  });

  beforeEach(() => {
    login()
  });

  afterEach(() => {
    cy.get('#log-out-button').click()
  })

  // after(() => {
  //   cy.visit('http://localhost:4200')
  //   cy.get('#login-tab').should('be.visible')
  //     .click();
  //
  //   cy.get('#login-username-input').should('be.visible')
  //     .type(testUsername).click();
  //
  //   cy.get('#login-password-input').type(testPassword);
  //   cy.get('#login-submit-button').click();
  //
  //   cy.contains(campaignName);
  //   cy.contains('Delete').click();
  //   cy.get('#campaign-deleted-modal').should('be.visible');
  //   cy.get('#campaign-deleted-modal-close-button').should('be.visible').click();
  //   cy.get('#campaign-deleted-modal').should('not.be.visible');
  //   cy.contains(campaignName).should('not.exist');
  // })

  afterEach(() => {
    localStorage.clear();
    if(this && this.currentTest.state === 'failed') {
      deleteUser();
    }
  })

  it('SHORT REST: presented data is correct', () => {
    cy.contains(campaignName).click();
    cy.get('#nav-resting-link').click();
    for (const pcName of playerCharacters) {
      cy.contains(pcName).parent('tr').within(() => {
        // e.g. for index 0, then 10hp
        const expectedHp = `${playerCharacters.indexOf(pcName) + 1}0`
        const expectedHitDice = playerCharacters.indexOf(pcName) + 1
        cy.get('td').eq(1).contains(expectedHp)
        cy.get('td').eq(2).contains(expectedHitDice)
      })
    }
  })

  it('SHORT REST: performs short rest', () => {
    cy.get('button').contains(campaignName).click();
    cy.get('#nav-battle-link').click();

    playerCharacters.forEach((pcName, index) => {
      cy.contains(pcName).parent('tr').within(() => {
        cy.get('input').first().type(`${index}`);
      })
    })
    cy.contains('Start battle!').click();

    cy.contains(playerCharacters[0]).parent('tr').within(() => {
      cy.get('input').first().type('-8').type('{enter}'); // 2 HP left
    })

    cy.contains(playerCharacters[1]).parent('tr').within(() => {
      cy.get('input').first().type('-18').type('{enter}'); // 2 HP left
    })

    cy.contains(playerCharacters[2]).parent('tr').within(() => {
      cy.get('input').first().type('-20').type('{enter}'); // 10 HP left
    })

    cy.contains('End battle!').click();

    cy.wait(2000);

    cy.get('#nav-resting-link').click();

    cy.contains(playerCharacters[0]).parent('tr').within(() => {
        cy.get('td').eq(3).within(() => { // hit dice to spend column
          cy.get('input').type(`1`);
        })
        cy.get('td').eq(4).within(() => { // hp to add column
          cy.get('input').type(`10`);
        })
    })

    cy.contains(playerCharacters[1]).parent('tr').within(() => {
        cy.get('td').eq(3).within(() => { // hit dice to spend column
          cy.get('input').type(`2`);
        })
        cy.get('td').eq(4).within(() => { // hp to add column
          cy.get('input').type(`16`);
        })
    })

    cy.contains(playerCharacters[2]).parent('tr').within(() => {
        cy.get('td').eq(3).within(() => { // hit dice to spend column
          cy.get('input').type(`2`);
        })
        cy.get('td').eq(4).within(() => { // hp to add column
          cy.get('input').type(`11`);
        })
    })

    cy.get('#short-rest-confirm-button').click();

    cy.contains(playerCharacters[0]).parent('tr').within(() => {
      cy.get('td').eq(1).within(() => { // current hp column
        cy.contains(10);
      })
      cy.get('td').eq(2).within(() => { // available hit dice column
        cy.contains(0);
      })
    })

    cy.contains(playerCharacters[1]).parent('tr').within(() => {
      cy.get('td').eq(1).within(() => { // current hp column
        cy.contains(18);
      })
      cy.get('td').eq(2).within(() => { // available hit dice column
        cy.contains(0);
      })
    })

    cy.contains(playerCharacters[2]).parent('tr').within(() => {
      cy.get('td').eq(1).within(() => { // current hp column
        cy.contains(21);
      })
      cy.get('td').eq(2).within(() => { // available hit dice column
        cy.contains(1);
      })
    })
  })

  // it('LONG REST: performs long rest', () => {
  //   cy.get('#nav-battle-link').click();
  //
  //   playerCharacters.forEach((pcName, index) => {
  //     cy.contains(pcName).parent('tr').within(() => {
  //       cy.get('input').first().type(`${index}`);
  //     })
  //   })
  //   cy.contains('Start battle!').click();
  //
  //   cy.contains(playerCharacters[0]).parent('tr').within(() => {
  //     cy.get('input').first().type('-8').type('{enter}');
  //   })
  //
  //   cy.contains(playerCharacters[1]).parent('tr').within(() => {
  //     cy.get('input').first().type('-18').type('{enter}');
  //   })
  //
  //   cy.contains(playerCharacters[2]).parent('tr').within(() => {
  //     cy.get('input').first().type('-2').type('{enter}');
  //   })
  //
  //   cy.contains('End battle!').click();
  //
  //   cy.get('#nav-resting-link').click();
  //
  //   playerCharacters.forEach((playerCharacter, index) => {
  //     cy.contains(playerCharacter).parent('tr').within(() => {
  //       cy.get('td').eq(3).within(() => {
  //         cy.get('input').type(`${index}`);
  //       })
  //       cy.get('td').eq(4).within(() => {
  //         cy.get('input').type(`${index}0`);
  //       })
  //     })
  //     cy.get('#short-rest-confirm-button').click();
  //   })
  // })
})
