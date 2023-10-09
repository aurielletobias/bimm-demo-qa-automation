/// <reference types="cypress" />

context("Radio Button", () => {
  beforeEach(() => {
    cy.visit("/radio-button");
  });

  it("should select 'Yes' radio button", () => {
    cy.clickRadioButtonWithId("yesRadio");

    cy.assertRadioButtonWithId("yesRadio", true);
    cy.assertRadioButtonWithId("impressiveRadio", false);
    cy.assertRadioButtonWithId("noRadio", false);
    cy.get("span.text-success").should("contain.text", "Yes");
  });

  it("should select 'Impressive' radio button", () => {
    cy.clickRadioButtonWithId("impressiveRadio");

    cy.assertRadioButtonWithId("yesRadio", false);
    cy.assertRadioButtonWithId("impressiveRadio", true);
    cy.assertRadioButtonWithId("noRadio", false);
    cy.get("span.text-success").should("contain.text", "Impressive");
  });

  it("should not select 'No' radio button", () => {
    cy.clickRadioButtonWithId("noRadio");

    cy.assertRadioButtonWithId("yesRadio", false);
    cy.assertRadioButtonWithId("impressiveRadio", false);
    cy.assertRadioButtonWithId("noRadio", false);
    cy.get("span.text-success").should("not.exist");
  });
});
