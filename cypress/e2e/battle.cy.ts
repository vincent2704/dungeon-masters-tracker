describe('battle', () => {
  const actor1Name = 'Test Actor 1'
  const actor2Name = 'Test Actor 2'

  it('creates a new character in the campaign overview', () => {
    cy.visit('http://localhost:4201')

    cy.contains(actor1Name).should('not.exist');
    cy.contains(actor2Name).should('not.exist');

    cy.contains('Manage').click();
    cy.get('tr').last().within(() => {
      cy.get('input').first().type(actor1Name);
      cy.get('input').eq(1).type('2');
      cy.get('input').eq(2).type('20');
      cy.contains('Add').click();
    });

    cy.get('tr').last().within(() => {
      cy.get('input').first().type(actor2Name);
      cy.get('input').eq(1).type('2');
      cy.get('input').eq(2).type('20');
      cy.contains('Add').click();
    });

    cy.contains('Submit').click();
  })

  it('starts battle and kills character', () => {
    cy.contains('Battle').click();
    cy.contains(actor1Name).parent('tr').within(() => {
      cy.get('input').first().type('99');
    })
    cy.contains(actor2Name).parent('tr').within(() => {
      cy.get('input').first().type('98');
    })
    cy.contains('Start battle!').click();


    cy.contains(actor1Name).parent('tr').within(() => {
      cy.get('input').first().type('-40').type('{enter}');
      cy.contains('Dead');
    })
  })

  it('ends battle and starts it again, with both characters present', () => {
    cy.contains('End battle!').click();
    cy.contains(actor1Name).parent('tr').within(() => {
      cy.get('input').first().type('99');
    })
    cy.contains(actor2Name).parent('tr').within(() => {
      cy.get('input').first().type('98');
    })
    cy.contains('Start battle!').click();

    cy.contains(actor1Name);
    cy.contains(actor2Name);
    cy.contains('End battle!').click();
  })

  it('uses revivify on the dead character', () => {
    cy.contains('Start battle!').click();
    cy.contains(actor1Name).parent('tr').within(() => {
      cy.contains('Dead').click();
      cy.contains('Revivify').click();
      cy.contains('1 (20)');
    });
    cy.contains('End battle!').click();
  })

  it('does not remove characters from the campaign after character is removed from battle', () => {
    cy.contains(actor1Name);
    cy.contains(actor2Name).parent('tr').within(() => {
      cy.contains('Remove').click();
    });
    cy.contains('Start battle!').click();
    cy.contains(actor1Name).parent('tr').within(() => {
      cy.get('input').first().type('-5').type('{enter}');
    })
    cy.contains('End battle!').click();
    cy.contains(actor2Name);
  })

})
