// describe('battle', () => {
//   const actor1Name = 'Test Actor 1'
//   const actor2Name = 'Test Actor 2'
//   const actor3Name = 'Test Actor 3'
//   const actor4Name = 'Test Actor 4'
//   const actor5Name = 'Test Actor 5'
//
//   const actorNames = [
//     actor1Name, actor2Name, actor3Name, actor4Name, actor5Name
//   ]
//
//   it('creates a new character in the campaign overview', () => {
//     cy.visit('http://localhost:4201')
//
//
//     actorNames.forEach(actorName => {
//       cy.contains(actorName).should('not.exist');
//     })
//
//     cy.contains('Manage').click();
//
//     actorNames.forEach(actorName => {
//       cy.get('tr').last().within(() => {
//         cy.get('input').first().type(actorName);
//         cy.get('input').eq(1).type('2');
//         cy.get('input').eq(2).type('20');
//         cy.contains('Add').click();
//       });
//     })
//
//     cy.contains('Submit').click();
//   })
//
//   it('starts battle and kills character', () => {
//     cy.contains('Battle').click();
//
//     actorNames.forEach((actorName, index) => {
//       cy.contains(actorName).parent('tr').within(() => {
//         cy.get('input').first().type(`${index}`);
//       })
//     })
//     cy.contains('Start battle!').click();
//
//
//     cy.contains(actor1Name).parent('tr').within(() => {
//       cy.get('input').first().type('-40').type('{enter}');
//       cy.contains('Dead');
//     })
//     cy.contains('End battle!').click();
//   })
//
//   it('uses revivify on the dead character', () => {
//     actorNames.forEach((actorName, index) => {
//       cy.contains(actorName).parent('tr').within(() => {
//         cy.get('input').first().type(`${index}`);
//       })
//     })
//     cy.contains('Start battle!').click();
//     cy.contains(actor1Name).parent('tr').within(() => {
//       cy.contains('Dead').click();
//       cy.contains('Revivify').click();
//       cy.contains('1 (20)');
//     });
//     cy.contains('End battle!').click();
//   })
//
//   it('does not remove characters from the campaign after character is removed from battle', () => {
//     cy.contains(actor1Name);
//     cy.contains(actor2Name).parent('tr').within(() => {
//       cy.contains('Remove').click();
//     });
//     cy.get('#nav-campaign-overview-link').click()
//     cy.contains(actor2Name);
//   })
//
//   // TODO:
//   // - prepare battle encounter difficulty changes when removing player characters from the list
//
// })
