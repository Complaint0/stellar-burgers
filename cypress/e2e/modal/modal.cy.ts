describe('ModalTest', () => {
  let data = require('../../fixtures/ingredients.json');
  it('Close/Open', () => {
    cy.visit('http://localhost:4000');
    cy.intercept(
      'GET',
      'https://norma.nomoreparties.space/api/ingredients',
      data
    );
    cy.contains('Биокотлета из марсианской Магнолии').click();
    cy.get('[data-cy=modal]').should('be.visible');
    cy.get('[data-cy=modalClose]').click();
    cy.get('[data-cy=modal]').should('not.exist');

    cy.contains('Биокотлета из марсианской Магнолии').click();
    cy.get('[data-cy=modal]').should('be.visible');
    cy.get('body').click('topLeft');
    cy.get('[data-cy=modal]').should('not.exist');
  });
});
