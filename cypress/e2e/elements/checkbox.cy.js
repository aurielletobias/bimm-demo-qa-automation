/// <reference types="cypress" />

import {
  assertCheckboxWithId,
  clickCheckboxWithId,
  iterateAllOptions,
} from "../../pages/checkbox.page";

context("Checkbox", () => {
  const options = {
    home: {
      desktop: ["notes", "commands"],
      documents: {
        workspace: ["react", "angular", "veu"],
        office: ["public", "private", "classified", "general"],
      },
      downloads: ["wordFile", "excelFile"],
    },
  };

  beforeEach(() => {
    cy.visit("/checkbox");

    cy.get("button[title='Expand all']").click();
  });

  it("should expand and collapse all options when the toggle buttons '+' and '-' are clicked", () => {
    iterateAllOptions(options, (option) => {
      cy.get(`label[for="tree-node-${option}"]`).should("exist");
    });

    cy.get("button[title='Collapse all']").click();

    iterateAllOptions(options.home, (option) => {
      cy.get(`label[for="tree-node-${option}"]`).should("not.exist");
    });
  });

  it("should check and uncheck all checkboxes", () => {
    iterateAllOptions(options, (option) => {
      clickCheckboxWithId(option);

      assertCheckboxWithId(option, true);

      clickCheckboxWithId(option);

      assertCheckboxWithId(option, false);
    });
  });

  it("should check multiple checkboxes", () => {
    clickCheckboxWithId("notes");
    clickCheckboxWithId("angular");
    clickCheckboxWithId("general");
    clickCheckboxWithId("wordFile");

    assertCheckboxWithId("notes", true);
    assertCheckboxWithId("angular", true);
    assertCheckboxWithId("general", true);
    assertCheckboxWithId("wordFile", true);
  });
});
