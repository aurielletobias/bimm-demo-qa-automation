Cypress.Commands.add("clickRadioButtonWithId", (id) => {
  cy.get(`input[type="radio"]#${id}`).siblings(`label[for="${id}"]`).click();
});

Cypress.Commands.add("clickRadioButtonWithValue", (value) => {
  cy.get(`input[value="${value}"]`).siblings("label").click();
});

Cypress.Commands.add("assertRadioButtonWithId", (id, selected) => {
  cy.get(`input[type="radio"]#${id}`).should(
    selected ? "be.checked" : "not.be.checked"
  );
});

Cypress.Commands.add("clickCheckboxWithId", (id) => {
  cy.get(`input[type="checkbox"]#${id}`).siblings(`label[for="${id}"]`).click();
});

Cypress.Commands.add("clickCheckboxWithLabel", (text) => {
  cy.get(`div.custom-checkbox > label`).contains(text).click();
});
