import * as TopNavigation from "../library/TopNavigation/topNavigation";
import { searchDropdownOptions } from "../library/TopNavigation/enum";
import * as SearchResults from "../library/SearchResults/searchResults";
import * as ProductDetails from "../library/ProductDetails/productDetails";
import * as ShoppingCart from "../library/ShoppingCart/shopingCart";
import { customerReviewLevel, languages } from "../library/SearchResults/enum";
interface TestContext {
  searchInput: string;
  productTitle?: string;
  unitPrice?: string;
}

describe("Verify user can add product to the cart with correct idetails", () => {
  const context: TestContext = {
    searchInput: "Automation",
  };

  before(() => {
    cy.visit(Cypress.env('login_url'));
  });

  describe("Adding product to the cart", () => {
    const productIndex = "2";

    it("should be able to search and filter the produts", () => {
      TopNavigation.selectValueFromSearchDropDown({
        optionValue: searchDropdownOptions.Book,
      });
      TopNavigation.sendValuesToSearchInput({ inputText: context.searchInput });
      TopNavigation.clickOnSearchSubmitButton();
      SearchResults.clickOnCustomerReview({
        startLevel: customerReviewLevel.FourStars,
      });

      SearchResults.selectLanguage({ language: languages.English });
      SearchResults.getProductName({ productIndex}).then((ele) => {
        context.productTitle = ele.trim().toLocaleLowerCase();
      });
    });
    it('should be able to navigate product details page and edit details',()=>{
      SearchResults.clickOnTheProductItem({ productIndex});
      ProductDetails.getUnitprice().then((ele) => {
        context.unitPrice = ele;
      });
      ProductDetails.getProductTitle().then((ele)=>{
        expect(ele.trim().toLocaleLowerCase()).to.equal(context.productTitle)
      });
      ProductDetails.selectProductQuantity({quantitiy:'2'});
    })
    it('should be able to add product to the cart and verify details',()=>{
      ProductDetails.clickOnAddToCartButton();
      ProductDetails.clickOnGoToCartButton();
      ShoppingCart.getProductName().then((ele)=>{
        expect(ele.trim().toLocaleLowerCase()).contain(context.productTitle);
      })
      ShoppingCart.getProducQuantity().then((ele)=>{
        expect(ele).to.equal('2');
      })
      ShoppingCart.getTotalprice().then((ele)=>{
        expect(parseFloat(ele.split('$').pop())).to.equal(parseFloat(context.unitPrice.split('$').pop())*2);
      })
    })
    it('should be able to clear cart',()=>{
      const price = "$0.00";
      ShoppingCart.clickOnProductDeleteButton();
      ShoppingCart.getTotalprice().then((ele)=>{
        expect(parseFloat(ele.split('$').pop())).to.equal(parseFloat(price.split('$').pop()));
      })
    })
  });
});
