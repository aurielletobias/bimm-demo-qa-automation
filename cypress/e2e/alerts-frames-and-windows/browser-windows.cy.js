/// <reference types="cypress" />

context("Browser Windows", () => {
  beforeEach(() => {
    cy.visit("/browser-windows");
  });

  it("should click the 'New Tab' button", () => {
    cy.window().then((win) => {
      cy.stub(win, "open").callsFake((url) => {
        win.location.href = url;
      });
    });

    cy.get("button#tabButton").click();

    cy.get("h1#sampleHeading").should("contain.text", "This is a sample page");
  });

  it("should click the 'New Window' button", () => {
    cy.window().then((win) => {
      cy.stub(win, "open").callsFake((url) => {
        win.location.href = url;
      });
    });

    cy.get("button#windowButton").click();

    cy.get("h1#sampleHeading").should("contain.text", "This is a sample page");
  });
});
