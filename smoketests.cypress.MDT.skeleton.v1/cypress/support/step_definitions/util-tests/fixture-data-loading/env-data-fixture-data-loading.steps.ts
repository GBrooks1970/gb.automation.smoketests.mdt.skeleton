import { Given, When, Then, Before, After } from "@badeball/cypress-cucumber-preprocessor";
import { User } from '../../../screenplay/actors/User';
import { EnvDataUtil } from 'cypress/support/utils/env/EnvDataUtil';
import CommonUtils from '../../../utils/common-utils';
import { UserData } from "cypress/support/utils/env/UserData";

let envData: EnvDataUtil;
let currentUserData: UserData;

Given('I have loaded the data for the env-data fixture file', () => {
  envData = new EnvDataUtil();
});

Then('I should have access to the name {string}', (expectedName: string) => {
  const name = envData.getEnvName();
  expect(name).to.equal(expectedName);
});

Given('I have the fixture file with endpoints', () => {
  envData = new EnvDataUtil();
});

When('I call the getEndpoint method with {string}', (key: any) => {
  cy.wrap(envData.getEndpoint(key)).as('result');
});

Then('I should receive the value {string}', (expectedValue: string) => {
  cy.get('@result').should('equal', expectedValue);
});


When('I call the getUserByUsername method with {string}', (key: any) => {
  // Get the actual data
  const actualData = envData.users.getUserByUsername(key);
  currentUserData = actualData;
});

Then('the UserData object should be {string}', (expectedValue: string) => {

  cy.log(`expectedValue: ${expectedValue}`);

  // Use the parseJSON method to convert the string into an object
  const expectedValue_parsedJSONObject = CommonUtils.parseJSON(expectedValue);

  // Perform the comparison
  expect(currentUserData).to.deep.equal(expectedValue_parsedJSONObject);
});

When('I initialize a User object with the fromFixture method with {string}', (key: any) => {
  // Get the actual data
  cy.log(`Loading data for: ${key}`);
  const actualDataUser = User.fromFixture(envData, key);
  currentUserData = actualDataUser.userData;
});