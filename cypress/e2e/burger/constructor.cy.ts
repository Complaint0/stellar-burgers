describe('burgerContructorTest', () => {
  let data = require('../../fixtures/ingredients.json');

  it('addIngredient', () => {
    cy.visit('http://localhost:4000');
    cy.intercept(
      'GET',
      'https://norma.nomoreparties.space/api/ingredients',
      data
    );
    cy.get('.common_button').click({ multiple: true });
    cy.get('[data-cy=topBun]').children().should('have.length', 1);
    cy.get('[data-cy=botBun]').children().should('have.length', 1);
    cy.get('[data-cy=isIngredients]').children().should('have.length', 1);
  });
});
