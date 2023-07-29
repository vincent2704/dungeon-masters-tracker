import { deleteUser, login, registerUser } from "./common";

describe('campaign adding and deleting', () => {

  const campaignName = 'Campaign for campaign management!'

  before(() => {
    registerUser()
  });

  after(() => {
    deleteUser()
  });

  beforeEach(() => {
    login()
  });

  it('creates new campaign', () => {
    cy.get('#campaign-selector').should('be.visible');
    cy.get('#create-campaign-button').should('be.visible').click();
    cy.get('#create-campaign-name-input').should('be.visible')
      .type(campaignName);
    cy.get('#create-campaign-start-date-picker').should('not.exist');
    cy.get('#create-campaign-calendar-selector').select('Gregorian');

    cy.get('#create-campaign-start-date-picker').should('be.visible')
      .within(() => {
        cy.contains('10').click();
      })

    cy.get('#create-campaign-start-time-picker').should('be.visible')
      .within(() => {
        cy.get('input').first().type('14');
        cy.get('input').eq(1).type('30');
        cy.get('input').eq(2).type('0');
      })

    cy.contains('Choose calendar system').click(); // value in the time form isn't updated in real time and
    // some other event needs to occur until it happens and the button gets enabled. it needs to be fixed

    cy.get('#create-campaign-submit-button').should('be.enabled').click();
    cy.get('#create-campaign-name-input').should('have.value', '');

    cy.contains(campaignName);

    cy.reload();
    cy.contains(campaignName);
  })

  it('fails to create another campaign with existing name', () => {
    cy.get('#create-campaign-button').click();
    cy.get('#create-campaign-name-input')
      .type(campaignName);
    cy.get('#create-campaign-calendar-selector').select('Gregorian');

    cy.get('#create-campaign-start-date-picker')
      .within(() => {
        cy.contains('10').click();
      })

    cy.get('#create-campaign-start-time-picker')
      .within(() => {
        cy.get('input').first().type('14');
        cy.get('input').eq(1).type('30');
        cy.get('input').eq(2).type('0');
      })

    cy.contains('Choose calendar system').click();

    cy.get('#create-campaign-submit-button').click();

    cy.get('#campaign-creation-failed-modal').should('be.visible');
    cy.get('#bad-credentials-modal-close-button').click();
  });

  it('property displays campaign information', () => {
    cy.contains(campaignName).click();
    cy.get('#campaign-overview-campaign-name').should('have.text', campaignName)
    cy.get('#time-configuration-card').should('be.visible')
      .within(() => {
        cy.contains('NaN').should('not.exist');
        cy.contains('Invalid Date').should('not.exist');
      });
  });

  it('deletes campaign', () => {
    cy.contains(campaignName);
    cy.contains('Delete').click();
    cy.get('#campaign-deleted-modal').should('be.visible');
    cy.get('#campaign-deleted-modal-close-button').should('be.visible').click();
    cy.get('#campaign-deleted-modal').should('not.be.visible');
    cy.contains(campaignName).should('not.exist');
  })

});
