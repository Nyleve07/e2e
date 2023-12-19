describe('Login account', () => {
  // Use a constant variable for the website URL
  const website = 'https://www.theiconic.com.au/';
  // Use a before hook to visit the website once
  before(() => {
    cy.viewport(1200, 960);
    cy.visit(website);
  });

  it('Add items to cart and checkout', () => {
    // Use variables for the product names
    const product1 = 'Powdered Snow Powder Kiss Lip Kit: Brown';
    const product2 = 'Connect In Colour';
    // Use a function to add a product to the bag
    const addToBag = (product) => {
      cy.contains(product).click();
      cy.get('button').contains('Add to Bag').click();
    };
    cy.contains('Beauty').click();
    cy.contains('Shop Best Sellers').click();
    addToBag(product1);
    cy.get('button').contains('Continue Shopping').click({force: true});
    addToBag(product2);
    cy.get('.row > .medium-12 > .modal-buttons > .medium-6 > .btn-add-to-bag').click();
    // Use the website variable instead of hard-coding the URL
    cy.visit(website + 'checkout/');
    cy.get('.row > .small-12 > div:nth-child(2) > .review-box > .row').click();
    // Use a single assertion for the subtotal
    cy.get('*[class="small-6 columns ti-items-quantity review-label"]').should('have.text', '\nSubtotal - 2\nitems\n\nSubtotal - 2\nitems\n');
  });
});