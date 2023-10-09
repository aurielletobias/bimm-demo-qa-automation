/// <reference types="cypress" />

import { faker } from "@faker-js/faker";
import { assertForm, fillForm } from "../../pages/practice-form.page";

context("Forms", () => {
  beforeEach(function () {
    cy.visit("/automation-practice-form");

    cy.fixture("/forms/gender.fixture").then((gender) => {
      this.gender = Cypress._.sample(gender);
    });

    cy.fixture("/forms/subjects.fixture").then((subjects) => {
      this.subjects = [];

      Cypress._.times(Cypress._.random(1, subjects.length), () => {
        const subject = Cypress._.sample(subjects);

        Cypress._.pull(subjects, subject);

        this.subjects.push(subject);
      });
    });

    cy.fixture("/forms/hobbies.fixture").then((hobbies) => {
      this.hobbies = [];

      Cypress._.times(Cypress._.random(1, hobbies.length), () => {
        const hobby = Cypress._.sample(hobbies);

        Cypress._.pull(hobbies, hobby);

        this.hobbies.push(hobby);
      });
    });

    cy.fixture("/forms/state-and-city.fixture").then((stateAndCity) => {
      const state = Cypress._.sample(Object.keys(stateAndCity));
      const city = Cypress._.sample(stateAndCity[state]);

      this.state = state;
      this.city = city;
    });

    this.firstName = faker.person.firstName();
    this.lastName = faker.person.lastName();
    this.email = faker.internet.email({
      firstName: this.firstName,
      lastName: this.lastName,
    });
    this.mobileNumber = faker.phone
      .number()
      .match(/\d+/g)
      .join("")
      .substring(0, 10);
    this.address = faker.location.streetAddress({ useFullAddress: true });
  });

  it("should submit form with complete data", function () {
    fillForm({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      gender: this.gender,
      mobileNumber: this.mobileNumber,
      subjects: this.subjects,
      hobbies: this.hobbies,
      address: this.address,
      state: this.state,
      city: this.city,
    });

    cy.get("button[type=submit]#submit").click({ force: true });

    assertForm({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      gender: this.gender,
      mobileNumber: this.mobileNumber,
      subjects: this.subjects,
      hobbies: this.hobbies,
      address: this.address,
      state: this.state,
      city: this.city,
    });
  });

  it("should not proceed submission", () => {
    cy.get("button[type=submit]#submit").click({ force: true });

    cy.get(`input[type='text']#firstName`)
      .then((el) => el[0].checkValidity())
      .should("be.false");
    cy.get(`input[type='text']#lastName`)
      .then((el) => el[0].checkValidity())
      .should("be.false");
    cy.get(`input[type='text']#userNumber`)
      .then((el) => el[0].checkValidity())
      .should("be.false");

    cy.get("div")
      .contains("Thanks for submitting the form")
      .should("not.exist");
  });

  it("should submit form without optional data", function () {
    fillForm({
      firstName: this.firstName,
      lastName: this.lastName,
      gender: this.gender,
      mobileNumber: this.mobileNumber,
    });

    cy.get("button[type=submit]#submit").click({ force: true });

    assertForm({
      firstName: this.firstName,
      lastName: this.lastName,
      gender: this.gender,
      mobileNumber: this.mobileNumber,
    });
  });
});
