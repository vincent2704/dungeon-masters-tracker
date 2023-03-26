// describe('characters', () => {
//   const testActorName = 'Test Actor'
//   it('visits page', () => {
//     cy.visit('http://localhost:4201')
//   })
//
//   it('creates a new character in the campaign overview', () => {
//     cy.visit('http://localhost:4201')
//
//     cy.contains(testActorName).should('not.exist');
//
//     cy.contains('Manage').click();
//     cy.get('tr').last().within(() => {
//       cy.get('input').first().type(testActorName);
//       cy.get('input').eq(1).type('2');
//       cy.get('input').eq(2).type('20');
//       cy.contains('Add').click();
//     });
//     cy.contains('Submit').click();
//
//     cy.get('tr').last().within(() => {
//       cy.contains(testActorName);
//       cy.contains('2');
//       cy.contains('20');
//     });
//   })
//
//   it('character is present in other components', () => {
//     cy.contains('Battle').click();
//     cy.contains(testActorName)
//
//     cy.contains('Tools').click();
//     cy.contains('Combat difficulty calculator').click();
//     cy.contains(testActorName);
//   })
//
// })
