describe('OrderTest', () => {
  let user = require('../../fixtures/user.json');
  let ingredients = require('../../fixtures/ingredients.json');
  let order = require('../../fixtures/order.json');
  after(() => {
    cy.clearLocalStorage('refreshToken');
    cy.clearAllCookies();
  });
  it('order', () => {
    cy.visit('http://localhost:4000');
    cy.intercept(
      'GET',
      'https://norma.nomoreparties.space/api/ingredients',
      ingredients
    );
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', order);
    cy.intercept(
      'POST',
      'https://norma.nomoreparties.space/api/auth/login',
      user
    );
    cy.get('[data-cy=orderButton]').click();
    cy.get('[data-cy=emailInput]').type('sadasdasdas2224d@gmail.com');
    cy.get('[data-cy=passwordInput]').type('sadasdasdas2224d');
    cy.get('[data-cy="loginSumbit"]').click();
    cy.get('.common_button').click({ multiple: true });
    cy.get('[data-cy=orderButton]').click();
    cy.get('[data-cy=modal]').should('be.visible');
    cy.get('[data-cy=orderNumber]').should('have.text', order.order.number);
    cy.get('[data-cy=modalClose]').click();
    cy.get('[data-cy=modal]').should('not.exist');
    cy.get('[data-cy=topBun]').should('not.exist');
    cy.get('[data-cy=botBun]').should('not.exist');
    cy.get('[data-cy=isNotIngredients]').children().should('have.length', 0);
  });
});
