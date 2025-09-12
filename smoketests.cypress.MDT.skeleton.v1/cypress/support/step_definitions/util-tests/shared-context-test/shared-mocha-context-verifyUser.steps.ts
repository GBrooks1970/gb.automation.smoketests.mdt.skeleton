import { Given, When, Then, Before, After } from "@badeball/cypress-cucumber-preprocessor";
import { User } from '../../../screenplay/actors/User';
import { EnvDataUtil } from 'cypress/support/utils/env/EnvDataUtil';

let envData: EnvDataUtil = new EnvDataUtil();

Then("I should see the shared User object has default properties", function () {
  expect(this.user.userData).to.have.property('username', 'newUsername'); // 'this' is still the shared Mocha context
});
