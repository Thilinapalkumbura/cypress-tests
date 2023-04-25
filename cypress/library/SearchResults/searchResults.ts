const customerReviewWrapper = () => {
  return cy.get('div[id="reviewsRefinements"]');
};
const languageWrapper = () => {
  return cy
    .get('div[id="p_n_feature_nine_browse-bin-title"] > span')
    .should("have.text", "Language");
};
const productWrapper = (index:string) => {
  return cy.get(`div[data-index="${index}"]`);
};

export const clickOnCustomerReview = ({
  startLevel,
}: {
  startLevel: string;
}) => {
  customerReviewWrapper().find(`i[class="${startLevel}"]`).click();
};
export const selectLanguage = ({ language }: { language: number }) => {
  languageWrapper()
    .parent("div")
    .next("ul")
    .find("li")
    .eq(language)
    .find('[type="checkbox"]')
    .check({ force: true });
};

export const getProductName = ({productIndex}:{productIndex:string}) => {
  return productWrapper(productIndex).find("h2>a>span").invoke('text').then((ele)=>{
    return cy.wrap(ele);
  });
};

export const clickOnTheProductItem = ({productIndex}:{productIndex:string}) => {
   productWrapper(productIndex).find("h2>a").click();
}
