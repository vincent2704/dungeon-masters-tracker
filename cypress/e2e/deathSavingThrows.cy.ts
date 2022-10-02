describe('battle', () => {
  const testActorName = 'Test Actor 1'

  it('creates a new character in the campaign overview', () => {
    cy.visit('http://localhost:4200')

    cy.contains(testActorName).should('not.exist');

    cy.contains('Manage').click();
    cy.get('tr').last().within(() => {
      cy.get('input').first().type(testActorName);
      cy.get('input').eq(1).type('2');
      cy.get('input').eq(2).type('20');
      cy.contains('Add').click();
    });

    cy.contains('Submit').click();
  })

  it('starts battle and drops character to 0 HP', () => {
    cy.contains('Battle').click();
    cy.contains(testActorName).parent('tr').within(() => {
      cy.get('input').first().type('99');
    })
    cy.contains('Start battle!').click();

    cy.contains(testActorName).parent('tr').within(() => {
      cy.get('input').first().type('-20').type('{enter}');
      cy.contains('Death saving throws');
      cy.contains('Is critical hit?').should('not.exist');
    })
  })

  it('handles normal hit received when unconscious', () => {
    cy.contains(testActorName).parent('tr').within(() => {
      cy.get('input').first().type('-1').type('{enter}');
    })
    cy.contains('Is critical hit?');
    cy.contains('No').click();
    cy.contains(testActorName).parent('tr').within(() => {
      cy.contains('Failures: 1');
    })
  })

  it('handles critical hit received when unconscious', () => {
    // heal character
    cy.contains(testActorName).parent('tr').within(() => {
      cy.get('input').first().type('1').type('{enter}');
    })
    // drop it back to 0 HP to reset the death saving throws
    cy.contains(testActorName).parent('tr').within(() => {
      cy.get('input').first().type('-1').type('{enter}');
    })
    // hit once again when unconscious
    cy.contains(testActorName).parent('tr').within(() => {
      cy.get('input').first().type('-1').type('{enter}');
    })
    cy.contains('Is critical hit?');
    cy.contains('Yes').click();
    cy.contains(testActorName).parent('tr').within(() => {
      cy.contains('Failures: 2');
    })
  })

  it('kills character with failed death saving throw', () => {
    cy.contains(testActorName).parent('tr').within(() => {
      cy.get('#fail-button').click();
      cy.contains('Dead');
    })
  })

  it('uses revivify on the character', () => {
    cy.contains(testActorName).parent('tr').within(() => {
      cy.contains('Dead').click();
      cy.contains('Revivify').click();
      cy.contains('1 (20)');
    })
  })

  it('should disable death saving throw buttons when character is receiving damage', () => {
    cy.contains(testActorName).parent('tr').within(() => {
      cy.get('input').first().type('-1').type('{enter}'); // drop to unconscious
      cy.get('input').first().type('-1').type('{enter}'); // unconscious damage receiving

      cy.get('#success-button').should('be.disabled');
      cy.get('#critical-success-button').should('be.disabled');
      cy.get('#fail-button').should('be.disabled');
      cy.get('#critical-fail-button').should('be.disabled');

      cy.contains('No').click(); // closing the unconscious damage component
    })
  })

  it('displays stabilized information when character succeeded on death saving throws', () => {
    cy.contains(testActorName).parent('tr').within(() => {
      cy.get('#success-button').click().click().click();
      cy.contains('Stabilized');
    })
  })

  it('does not ask hit type after damaging freshly revived character', () => {
    cy.contains(testActorName).parent('tr').within(() => {
      cy.get('input').first().type('-20').type('{enter}'); // kill
      cy.get('button').contains('Dead').click();
      cy.get('button').contains('Revivify').click();
      cy.get('input').first().type('-1').type('{enter}'); // drop to unconscious again
      cy.contains('Is critical hit?').should('not.exist');
    })
  })

})
