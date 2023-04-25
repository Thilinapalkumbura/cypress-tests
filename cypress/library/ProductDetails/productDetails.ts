const unitPrice = () => {
  return cy.get("#price");
};
const productTitle = () => {
  return cy.get("#productTitle");
};
const productQuantitiyWrapper = () => {
  return cy.get('select[id="quantity"]');
};
const addToCartButton = ()=>{
    return cy.get('#add-to-cart-button');
}
const goToCartButton = ()=>{
    return cy.get('#sw-gtc');
}

export const getUnitprice = () => {
  return unitPrice()
    .invoke("text")
    .then((ele) => {
      return cy.wrap(ele);
    });
  
};
export const getProductTitle = () => {
  return productTitle()
    .invoke("text")
    .then((ele) => {
      return cy.wrap(ele);
    });
};

export const selectProductQuantity = ({ quantitiy }: { quantitiy: string }) => {
  productQuantitiyWrapper().select(quantitiy, { force: true });
};

export const clickOnAddToCartButton = ()=>{
    addToCartButton().click();
}
export const clickOnGoToCartButton = ()=>{
    goToCartButton().click();
}

