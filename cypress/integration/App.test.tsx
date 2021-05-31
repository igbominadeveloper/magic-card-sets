describe('App Component', () => {
  it('finds the header text on the landing page', () => {
    cy.visit('/');

    cy.get('[data-testid="header"]').contains('Select a set from the options here');
    cy.get('[data-testid="no-cards"]').contains('Select a set and click on Gather');

    cy.get('[data-testid="fetch-button"]').contains('Gather');

    cy.get('[data-testid="fetch-button"]').click();
    cy.get('[data-testid="fetch-button"]').contains('Loading...');

    cy.get('[data-testid="page-loader-text"]').contains('Loading cards...');

    cy.wait(2000);

    cy.get('select option')
      .eq(2)
      .invoke('val')
      .then((val) => cy.get('select').select(val));

    cy.get('[data-testid="fetch-button"]').click();

    cy.get('select option')
      .eq(2)
      .invoke('text')
      .then((text) => {
        cy.get('[data-testid=app-cards] > :nth-child(1) > .card__header').contains(text);
      });

    cy.scrollTo('bottom', {
      duration: 2000,
      easing: 'swing',
    });

    cy.get('[data-testid="app-cards"]').children().should('have.length', 12);

    cy.scrollTo('bottom', {
      duration: 1000,
      easing: 'swing',
    });

    cy.get('[data-testid="lastpage"]').click();
    cy.wait(1500);

    cy.scrollTo('bottom', {
      duration: 1000,
      easing: 'swing',
    });

    cy.get('[data-testid="firstpage"]').click();
    cy.wait(1500);

    cy.scrollTo('bottom', {
      duration: 1000,
      easing: 'swing',
    });
    cy.get('[data-testid="nextpage"]').click();
    cy.wait(1500);

    cy.scrollTo('bottom', {
      duration: 1000,
      easing: 'swing',
    });

    cy.get('[data-testid="firstpage"]').click();
    cy.wait(1500);

    cy.get('[data-testid="app-cards"]').children().should('have.length', 12);
  });
});
