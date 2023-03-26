// describe('traveling', () => {
//
//   it('displays travel time', () => {
//     cy.visit('http://localhost:4201');
//     cy.get('#current-hour-info').should('have.text', '18:30');
//
//     cy.contains('Tools').click();
//     cy.get('#travel-calculator-button').click();
//     cy.get('#pace-selector').select('Normal');
//
//     cy.get('#distance-input').type('6').type('{enter}');
//     cy.contains('Travel time: 1 hour(s) 20 minute(s)');
//   })
//
//   it('adds travel time to campaign', () => {
//     cy.get('#progress-campaign-time-checkbox').should('be.enabled');
//
//     cy.contains('Campaign Overview').click();
//     cy.get('#current-hour-info').should('have.text', '19:50');
//   })
//
// })
