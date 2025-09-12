import { Given, When, Then, Before, After } from "@badeball/cypress-cucumber-preprocessor";
import { User } from '../../../screenplay/actors/User';
import { EnvDataUtil } from 'cypress/support/utils/env/EnvDataUtil';

let envData: EnvDataUtil = new EnvDataUtil();

Given("I initialize the User object with default properties", function () {
    (this as any).user = User.fromFixture(envData,"userdefault"); // fromFixture is a static method that initializes a new User object
    cy.log(`Initial username: ${(this as any).user.userData.username}`);
    cy.log(`Initial password: ${(this as any).user.userData.password}`);
});

When("I change the username property of the User object", function () {
    (this as any).user.userData.username = "newUsername";
    cy.log(`Changed username: ${(this as any).user.userData.username}`);
});

When("I change the password property of the User object", function () {
    (this as any).user.userData.password = "newPassword";
    cy.log(`Changed password: ${(this as any).user.userData.password}`);
});

Then("I verify the changed properties of the User object", function () {
    expect((this as any).user.userData.username).to.equal("newUsername");
    expect((this as any).user.userData.password).to.equal("newPassword");
    cy.log(`Verified username: ${(this as any).user.userData.username}, Verified password: ${(this as any).user.userData.password}`);
});