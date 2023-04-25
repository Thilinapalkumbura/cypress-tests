const searchDropDown = () => {
  return cy.get('div[id="nav-search-dropdown-card"]');
};
const searchSubmitButton = () => {
  return cy.get('input[id="nav-search-submit-button"]');
};
const searchFieldInput = () => {
  return cy.get('input[id="twotabsearchtextbox"]');
};


export const selectValueFromSearchDropDown = ({
  optionValue,
}: {
  optionValue: string;
}) => {
  searchDropDown()
    .find("select")
    .focus()
    .select(`${optionValue}`, { force: true });
cy.log('value selected',[optionValue]);
};

export const clickOnSearchSubmitButton = () => {
  searchSubmitButton().click();
  cy.log('Searching..');
};

export const sendValuesToSearchInput = ({
  inputText,
}: {
  inputText: string;
}) => {
  searchFieldInput().clear().type(inputText);
  cy.log('seaching value',[inputText])
};
