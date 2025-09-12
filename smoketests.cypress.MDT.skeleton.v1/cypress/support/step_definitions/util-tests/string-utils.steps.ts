import { Given, When, Then, Before, After } from "@badeball/cypress-cucumber-preprocessor";
import { StringUtils } from "../../utils/string-utils";

let dynamicString: string;
let parsedString: string;
let staticString: string;
let generatedString: string;
let expectedStringLength: any;

Given('I want to generate a dynamic string of "[ALPHA-NUMERIC-10]"', () => {
  dynamicString = '[ALPHA-NUMERIC-10]'
});

Given('I want to generate a static string "[This is a static string]"', () => {
  staticString = '[This is a static string]'
});

Given('I want to generate a dynamic string of "[NUMERIC-10]"', () => {
  dynamicString = '[NUMERIC-10]'
});

Given('I want to generate an alphanumeric string with a length of {int}', (length: number) => {
  expectedStringLength = length
  cy.log('Expected String Length:', expectedStringLength);
});

Given('I want to generate a numeric string with a length of {int}', (length: number) => {
  expectedStringLength = length
  cy.log('Expected String Length:', expectedStringLength);
});

Given('I want to generate an alpha string with a length of {int}', (length: number) => {
  expectedStringLength = length
  cy.log('Expected String Length:', expectedStringLength);
});

When('I parse the dynamic string', () => {
  parsedString = StringUtils.parseDynamicString(dynamicString);
});

When('I parse the static string', () => {
  parsedString = StringUtils.parseDynamicString(staticString);
});

When('I generate the alphanumeric string', () => {
  generatedString = StringUtils.generateAlphaNumericString(expectedStringLength);  
  cy.log('Generated String:', generatedString);
});

When('I generate the numeric string', () => {
  generatedString = StringUtils.generateNumericString(expectedStringLength);  
  cy.log('Generated String:', generatedString);
});

When('I generate the alpha string', () => {
  generatedString = StringUtils.generateAlphaString(expectedStringLength);  
  cy.log('Generated String:', generatedString);
});

Then('the parsed dynamic string should be alphanumeric of length 10', () => {
  cy.log('Check if a Parsed Dynamic Alphanumeric String has been Generated');
  expect(parsedString).to.match(/^[a-zA-Z0-9]{10}$/); 
});

Then('the parsed string should be the same as the static string', () => {
  cy.log('Check if a Parsed Static String has been Generated')
  expect(parsedString).to.equal(staticString); 
});

Then('the generated string should be alphanumeric of length {int}', (length: number) => {
  if (length !== 0) {
  cy.log('Check if the Parsed String generated is Alphanumeric with a Length of', expectedStringLength);
  expect(generatedString).to.match(/^[a-zA-Z0-9]+$/); 
  expect(generatedString.length).to.equal(expectedStringLength);
  } else {
  cy.log('Check Generated String is Empty')
  expect(generatedString).to.equal(''); 
  };
});

Then('the generated string should be numeric of length {int}', (length: number) => {
  if (length !== 0) {
  cy.log('Check if the Parsed String generated is numeric with a Length of', expectedStringLength);
  expect(generatedString).to.match(/^[0-9]+$/); 
  expect(generatedString.length).to.equal(expectedStringLength);
  } else {
  cy.log('Check Generated String is Empty')
  expect(generatedString).to.equal(''); 
  };
});

Then('the generated string should be alpha of length {int}', (length: number) => {
  if (length !== 0) {
  cy.log('Check if the Parsed String generated is alpha with a Length of', expectedStringLength);
  expect(generatedString).to.match(/^[a-zA-Z]+$/); 
  expect(generatedString.length).to.equal(expectedStringLength);
  } else {
  cy.log('Check Generated String is Empty')
  expect(generatedString).to.equal(''); 
  };
});