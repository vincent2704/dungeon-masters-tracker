describe('battle', () => {
  const testActor1 = 'Test Actor 1'
  const testActor2 = 'Test Actor 2'

  it('creates a new character in the campaign overview', () => {
    cy.visit('http://localhost:4200')

    cy.contains(testActor1).should('not.exist');
    cy.contains(testActor2).should('not.exist');

    cy.contains('Manage').click();
    cy.get('tr').last().within(() => {
      cy.get('input').first().type(testActor1);
      cy.get('input').eq(1).type('2');
      cy.get('input').eq(2).type('20');
      cy.contains('Add').click();
    });

    cy.get('tr').last().within(() => {
      cy.get('input').first().type(testActor2);
      cy.get('input').eq(1).type('2');
      cy.get('input').eq(2).type('20');
      cy.contains('Add').click();
    });

    cy.contains('Submit').click();
  })

  it('starts battle and kills character', () => {
    cy.contains('Battle').click();
  //   cy.contains('Start battle!').click();
    cy.contains(testActor1).parent('tr').within(() => {
      cy.get('input').first().type('99');
    })
    cy.contains(testActor2).parent('tr').within(() => {
      cy.get('input').first().type('98');
    })
    cy.contains('Start battle!').click();


    cy.contains(testActor1).parent('tr').within(() => {
      cy.get('input').first().type('-40').type('{enter}');
      cy.contains('Dead');
    })
  })

  it('ends battle and starts it again, with both characters present', () => {
    cy.contains('End battle!').click();
    cy.contains('Start battle!').click();

    cy.contains(testActor1);
    cy.contains(testActor2);
  })

})
