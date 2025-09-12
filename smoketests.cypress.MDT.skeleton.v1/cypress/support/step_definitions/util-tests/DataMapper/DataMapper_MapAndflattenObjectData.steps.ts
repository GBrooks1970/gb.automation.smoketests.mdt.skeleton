import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { DataMapper } from 'cypress/support/utils/DataMapper';

// Global variables to hold the test context
let inputObject: any;
let flattenResult: any;

Given('a JSON object:', (docString: string) => {
  // Parse the provided JSON doc string into an object.
  cy.log('Parsing input JSON object');
  inputObject = JSON.parse(docString);
  cy.log('Input object: ' + JSON.stringify(inputObject, null, 2));
});

When(
  'I flatten the object using prefix {string}, asObject {string}, asPathArray {string}, and returnPropName {string}',
  (
    prefix: string,
    asObjectStr: string,
    asPathArrayStr: string,
    returnPropNameStr: string
  ) => {
    // Convert the boolean flags from string to actual booleans.
    const asObject = asObjectStr.toLowerCase() === 'true';
    const asPathArray = asPathArrayStr.toLowerCase() === 'true';
    const returnPropName = returnPropNameStr.toLowerCase() === 'true';

    cy.log(
      `Flattening object with prefix: ${prefix}, asObject: ${asObject}, asPathArray: ${asPathArray}, returnPropName: ${returnPropName}`
    );

    // Call the static method from DataMapper.
    flattenResult = DataMapper.mapAndflattenObjectData(
      inputObject,
      prefix,
      asObject,
      asPathArray,
      returnPropName
    );

    cy.log('Flatten result: ' + JSON.stringify(flattenResult, null, 2));
  }
);

Then('the flattened result should equal:', (docString: string) => {
  // Parse the expected result from the doc string.
  const expectedResult = JSON.parse(docString);
  cy.log('Expected result: ' + JSON.stringify(expectedResult, null, 2));
  
  // Assert deep equality between the method output and the expected result.
  expect(flattenResult).to.deep.equal(expectedResult);
});
