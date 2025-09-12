// cypress/integration/steps/data_mapper_property_paths.steps.ts
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import CommonUtils from 'cypress/support/utils/common-utils';
import { DataMapper } from 'cypress/support/utils/DataMapper';
import { TestData_sampleObjectArray } from 'cypress/support/utils/TestDataObjects/TestData_sampleObjectArray';
import { TestData_TopazApplicant_01 } from 'cypress/support/utils/TestDataObjects/TestData_TopazApplicant_01';
import { TestData_UkAddress_01, TestData_UkAddressWithCountry } from 'cypress/support/utils/TestDataObjects/TestData_UkAddress_01';

// Global variables to hold our test context
let inputObject: Record<string, any>;
let testObject: Record<string, any>;
let mappedResult: any;

Given('a specific nested JSON object:', (docString: string) => {
  // Parse the JSON object provided in the doc string
  inputObject = JSON.parse(docString);
  cy.log('Input object: ' + JSON.stringify(inputObject, null, 2));
});

Given("I have the predefined nested object {string}", (objectName: string) => {
  cy.log(`predefined objectName: ${CommonUtils.toJSONString(objectName)}`);
  switch (objectName) {
      case "TestData_TopazApplicant":
        testObject = TestData_TopazApplicant_01;
          break;
      case "TestData_UkAddress":
        testObject = TestData_UkAddress_01;
          break;
      case "TestData_UkAddressWithCountry":
        testObject = TestData_UkAddressWithCountry;
          break;
      case "TestData_sampleObjectArray":
        testObject = TestData_sampleObjectArray;
          break;
      default:
          throw new Error(`Unknown object name: ${objectName}`);
  }
  cy.log(`testObject: ${CommonUtils.toJSONString(testObject)}`);
});

When('I map the object with property paths', () => {
  // Call the method that maps each leaf value to its full property path
  mappedResult = DataMapper.mapObjectWithPropertyPaths(inputObject);
  cy.log('Mapped result: ' + JSON.stringify(mappedResult, null, 2));
});


When('I call the mapObjectWithPropertyPaths method', () => {
  cy.log(`testObject: ${CommonUtils.toJSONString(testObject)}`);
  // Call the method that maps each leaf value to its full property path
  mappedResult = DataMapper.mapObjectWithPropertyPaths(testObject);
  cy.log('Mapped result: ' + JSON.stringify(mappedResult));
});

Then('the resulting object should equal:', (docString: string) => {
  // Parse the expected output from the doc string
  const expectedObject = JSON.parse(docString);
  cy.log('Expected object: ' + JSON.stringify(expectedObject));
  // Assert that the mapped object equals the expected object
  expect(mappedResult).to.deep.equal(expectedObject);
});
