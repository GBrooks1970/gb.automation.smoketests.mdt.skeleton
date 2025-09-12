import { Given, When, Then, Before, After } from "@badeball/cypress-cucumber-preprocessor";
import { User } from '../../../screenplay/actors/User';
import { EnvDataUtil } from 'cypress/support/utils/env/EnvDataUtil';

let envData: EnvDataUtil = new EnvDataUtil();

/*
Sharing context across multiple step files in Cypress with the shared Mocha context
BUT the following must be considered :-

- Scoping: Make sure the steps are part of the same test scenario or suite to ensure the shared context is available across steps.

- Type Safety: TypeScript may complain about properties on this being possibly undefined. Use type assertions or custom interfaces to avoid this (as previously described).

- Statefulness: Keep in mind that sharing state across multiple files can make the test harder to reason about, so comment your code well and make it clear that you are relying on shared state.

- Avoid Arrow Functions: Mocha sets context (this) dynamically, and arrow functions don't bind this in the same way that function expressions do. So it's generally better to use function expressions to ensure this is correctly bound to the Mocha context.

For the above reasons - use of shared Mocha Context is NOT RECOMMENDED
*/

Given("I initialize a User object with default properties", function () {
    (this as any).user = User.fromFixture(envData,"userdefault");
    // 'this' is the shared Mocha context
    //  (this as any) used in Typescript because of Type Assertion - "Object is possibly 'undefined'"
    cy.log(`Initial username: ${(this as any).user.userData.username}`);
    cy.log(`Initial password: ${(this as any).user.userData.password}`);
});

When("I change the username property of the shared User object", function () {
    cy.log(`username: ${(this as any).user.userData.username}`);
    (this as any).user.userData.username = "newUsername";
    cy.log(`Changed username: ${(this as any).user.userData.username}`);
});