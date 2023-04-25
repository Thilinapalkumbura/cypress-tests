const productTitle = () => {
    return cy.get('div[class="sc-list-item-content"]')
      .find("span")
      .should("have.class", "sc-grid-item-product-title")
      .find("span")
      .should("have.class", "a-offscreen");
  };

  const productQuantity = ()=>{
    return cy.get('span[class="a-dropdown-prompt"]');
  }
  const totalprice = () =>{
    return cy.get('#sc-subtotal-amount-activecart > span')
  }
  const productDeleteButton = ()=>{
    return cy.get('span[data-feature-id="delete"]').find('input');
  }

  export const getProductName = ()=>{
    return productTitle().invoke('text').then((ele)=>{
            return cy.wrap(ele);
    })
  }

  export const getProducQuantity = ()=>{
    return productQuantity().invoke('text').then((ele)=>{
            return cy.wrap(ele);
    })
  }

  export const getTotalprice = ()=>{
    return totalprice().invoke('text').then((ele)=>{
            return cy.wrap(ele);
    })
  }

  export const clickOnProductDeleteButton = ()=>{
    productDeleteButton().click();
  }

