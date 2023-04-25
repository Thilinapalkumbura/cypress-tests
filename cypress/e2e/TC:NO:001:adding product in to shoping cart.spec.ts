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
    cy.visit(Cypress.env("login_url"));
  });

  describe("Search the product and navigate product details page", () => {
    const productIndex = "2";

    it("should be able to search and filter the produts", () => {
      // select drop deon value from search bar
      TopNavigation.selectValueFromSearchDropDown({
        optionValue: searchDropdownOptions.Book,
      });
      // type values on search bar
      TopNavigation.sendValuesToSearchInput({ inputText: context.searchInput });
      //click on the search submit button
      TopNavigation.clickOnSearchSubmitButton();
      // select the cutomer review on search results page
      SearchResults.clickOnCustomerReview({
        startLevel: customerReviewLevel.FourStars,
      });
      //check the language ckecbox on search results page
      SearchResults.selectLanguage({ language: languages.English });
      // Save product name to verify
      SearchResults.getProductName({ productIndex }).then((ele) => {
        context.productTitle = ele.trim().toLocaleLowerCase();
      });
    });
    it("should be able to navigate product details page and edit details", () => {
      //Click on the selected product name
      SearchResults.clickOnTheProductItem({ productIndex });
      //Save prodcut unit price
      ProductDetails.getUnitprice().then((ele) => {
        context.unitPrice = ele;
      });
      //Verify product title with the title whcih was in search results page
      ProductDetails.getProductTitle().then((ele) => {
        expect(ele.trim().toLocaleLowerCase()).to.equal(context.productTitle);
      });
      //change the product quantity
      ProductDetails.selectProductQuantity({ quantitiy: "2" });
    });
  });

  describe("Add product to the cart and verify product details", () => {
    it("should be able to add product to the cart and verify details", () => {
      //click on the add to cart button
      ProductDetails.clickOnAddToCartButton();
      //click on the go to cart button
      ProductDetails.clickOnGoToCartButton();
      // verify product name with the title which was in the details page
      ShoppingCart.getProductName().then((ele) => {
        expect(ele.trim().toLocaleLowerCase()).contain(context.productTitle);
      });
      // verify the product quantity
      ShoppingCart.getProducQuantity().then((ele) => {
        expect(ele).to.equal("2");
      });
      //Verify total price
      ShoppingCart.getTotalprice().then((ele) => {
        expect(parseFloat(ele.split("$").pop())).to.equal(
          parseFloat(context.unitPrice.split("$").pop()) * 2
        );
      });
    });
    it("should be able to clear cart", () => {
      const price = "$0.00";
      //click on the delete buton on product
      ShoppingCart.clickOnProductDeleteButton();
      //verify total price after clear the cart
      ShoppingCart.getTotalprice().then((ele) => {
        expect(parseFloat(ele.split("$").pop())).to.equal(
          parseFloat(price.split("$").pop())
        );
      });
    });
  });
});
