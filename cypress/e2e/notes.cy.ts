describe('notes', () => {

  it('adds 2 notes', () => {
    cy.visit('http://localhost:4200');
    cy.contains('Notes').click();
    cy.get('#notes-add-note-button').click();

    cy.get('#notes-new-note-title-input').type('Note 1 Title');
    cy.get('#notes-new-note-body-input').type('Lorem ipsum dolor sit amet');
    cy.get('#notes-confirm-new-note-button').click();

    cy.get('#notes-confirm-new-note-button').should('not.be.visible');

    cy.get('#notes-add-note-button').click();

    cy.get('#notes-new-note-title-input').type('Note 2 Title');
    cy.get('#notes-new-note-body-input').type('Sed ut perspiciatis unde omnis iste natus');
    cy.get('#notes-confirm-new-note-button').click();
  })

  it('edits note', () => {
    cy.get('#notes-edit-note-button').should('not.exist');
    cy.contains('Note 1 Title').click();
    cy.get('#notes-edit-note-button').should('be.visible').click();
    cy.get('#notes-edited-note-title-input').type(' - Edited');
    cy.get('#notes-edited-note-body-input').type(' - Edited');
    cy.get('#notes-confirm-edit-button').click();
    cy.contains('Note 2 Title').click();
    cy.contains('Note 1 Title - Edited');
  })

  it('removes note', () => {
    cy.contains('Note 1 Title - Edited').click();
    cy.get('#notes-delete-note-button').click();

    cy.contains('Note 1 Title - Edited').should('not.exist');
    cy.get('#notes-delete-note-button').should('not.exist');
  })

  it('cancels note editing', () => {
    cy.contains('Note 2 Title').click();
    cy.get('#notes-edit-note-button').click();
    cy.get('#notes-edited-note-body-input').clear();
    cy.get('#notes-cancel-edit-button').click();
    cy.contains('Sed ut perspiciatis unde omnis iste natus');
  })

})
