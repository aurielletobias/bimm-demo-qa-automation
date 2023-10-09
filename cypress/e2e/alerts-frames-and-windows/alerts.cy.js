/// <reference types="cypress" />

context("Alerts", () => {
  beforeEach(() => {
    cy.visit("/alerts");
  });

  it("should show alert", () => {
    cy.on("window:alert", (message) => {
      expect(message).to.eq("You clicked a button");
    });

    cy.get("button#alertButton").click();
  });

  it("should show alert after 5 seconds", () => {
    cy.clock();

    cy.on("window:alert", (message) => {
      expect(message).to.eq("This alert appeared after 5 seconds");
    });

    cy.get("button#timerAlertButton").click();

    cy.tick(5000);
  });

  it("should show confirm and select 'Ok' after", () => {
    cy.on("window:confirm", (message) => {
      expect(message).to.eq("Do you confirm action?");
    });

    cy.get("button#confirmButton").click();
    cy.get("span#confirmResult").should("contain.text", "You selected Ok");
  });

  it("should show confirm and select 'Cancel' after", () => {
    cy.on("window:confirm", (message) => {
      expect(message).to.eq("Do you confirm action?");

      return false;
    });

    cy.get("button#confirmButton").click();

    cy.get("span#confirmResult").should("contain.text", "You selected Cancel");
  });

  it("should show prompt and enter name 'Aurielle'", () => {
    cy.window().then((win) => {
      cy.stub(win, "prompt").returns("Aurielle");
    });

    cy.get("button#promtButton").click();

    cy.get("span#promptResult").should("contain.text", "You entered Aurielle");
  });

  it("should show prompt and select 'Cancel'", () => {
    cy.window().then((win) => {
      cy.stub(win, "prompt").callsFake(() => null);
    });

    cy.get("button#promtButton").click();

    cy.get("span#promptResult").should("not.exist");
  });

  it("should show prompt and enter nothing", () => {
    cy.window().then((win) => {
      cy.stub(win, "prompt").returns("");
    });

    cy.get("button#promtButton").click();

    cy.get("span#promptResult").should("not.exist");
  });
});
