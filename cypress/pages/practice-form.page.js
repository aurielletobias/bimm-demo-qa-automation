export const fillForm = ({
  firstName,
  lastName,
  email,
  gender,
  mobileNumber,
  subjects,
  hobbies,
  address,
  state,
  city,
}) => {
  cy.get("input[type='text']#firstName").type(firstName);
  cy.get("input[type='text']#lastName").type(lastName);

  if (email) {
    cy.get("input[type='text']#userEmail").type(email);
  }

  cy.clickRadioButtonWithValue(gender);
  cy.get("input[type='text']#userNumber").type(mobileNumber);

  subjects?.forEach((subject) => {
    cy.get("div#subjectsContainer input").type(subject);
    cy.get("div.subjects-auto-complete__menu-list").contains(subject).click();
  });

  hobbies?.forEach((hobby, i) => {
    cy.clickCheckboxWithLabel(hobby);
  });

  cy.get("input[type=file]#uploadPicture").selectFile(
    "cypress/fixtures/forms/sample-picture.jpg"
  );

  if (address) {
    cy.get("textarea#currentAddress").type(address);
  }

  if (state) {
    cy.get("div#state").click();
    cy.get("div#state div").contains(state).click({ force: true });
  }

  if (city) {
    cy.get("div#city").click();
    cy.get("div#city div").contains(city).click({ force: true });
  }
};

export const assertForm = ({
  firstName,
  lastName,
  email,
  gender,
  mobileNumber,
  subjects,
  hobbies,
  address,
  state,
  city,
}) => {
  cy.get("table > tbody > tr:nth-child(1) > td:nth-child(2)").should(
    "contain.text",
    `${firstName} ${lastName}`
  );

  if (email) {
    cy.get("table > tbody > tr:nth-child(2) > td:nth-child(2)").should(
      "contain.text",
      email
    );
  } else {
    cy.get("table > tbody > tr:nth-child(2) > td:nth-child(2)").should(
      "be.empty"
    );
  }

  cy.get("table > tbody > tr:nth-child(3) > td:nth-child(2)").should(
    "contain.text",
    gender
  );
  cy.get("table > tbody > tr:nth-child(4) > td:nth-child(2)").should(
    "contain.text",
    mobileNumber
  );

  if (subjects) {
    cy.get("table > tbody > tr:nth-child(6) > td:nth-child(2)").should(
      "contain.text",
      subjects.join(", ")
    );
  } else {
    cy.get("table > tbody > tr:nth-child(6) > td:nth-child(2)").should(
      "be.empty"
    );
  }

  if (hobbies) {
    cy.get("table > tbody > tr:nth-child(7) > td:nth-child(2)").should(
      "contain.text",
      hobbies.join(", ")
    );
  } else {
    cy.get("table > tbody > tr:nth-child(7) > td:nth-child(2)").should(
      "be.empty"
    );
  }

  cy.get("table > tbody > tr:nth-child(8) > td:nth-child(2)").should(
    "contain.text",
    "sample-picture.jpg"
  );

  if (address) {
    cy.get("table > tbody > tr:nth-child(9) > td:nth-child(2)").should(
      "contain.text",
      address
    );
  } else {
    cy.get("table > tbody > tr:nth-child(9) > td:nth-child(2)").should(
      "be.empty"
    );
  }

  if (state && city) {
    cy.get("table > tbody > tr:nth-child(10) > td:nth-child(2)").should(
      "contain.text",
      `${state} ${city}`
    );
  } else {
    cy.get("table > tbody > tr:nth-child(10) > td:nth-child(2)").should(
      "be.empty"
    );
  }
};
