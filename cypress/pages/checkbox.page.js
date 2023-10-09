export const iterateAllOptions = (options, callback) => {
  if (Array.isArray(options)) {
    options.forEach((option) => iterateAllOptions(option, callback));
  } else if (typeof options === "object") {
    Object.entries(options).forEach(([key, value]) => {
      iterateAllOptions(key, callback);
      iterateAllOptions(value, callback);
    });
  } else if (typeof options === "string") {
    callback(options);
  }
};

export const clickCheckboxWithId = (id) => {
  cy.get(`label[for="tree-node-${id}"]:has(input#tree-node-${id})`).click();
};

export const assertCheckboxWithId = (id, checked) => {
  cy.get(`label[for="tree-node-${id}"] > input#tree-node-${id}`).should(
    checked ? "be.checked" : "not.be.checked"
  );

  cy.get(`span.text-success:contains("${id}")`).should(
    checked ? "exist" : "not.exist"
  );
};
