import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import CommonUtils from "cypress/support/utils/common-utils";
import { DataMapper } from "cypress/support/utils/DataMapper";

let originalObject: Record<string, any>;
let updateObject: Record<string, any>;
let mergeArrays: boolean;
let mergedResult: Record<string, any>;


// Step to set the original object
Given("I have an original object:", (docString: string) => {
  originalObject = CommonUtils.parseJSON(docString);
  cy.log("Original Object:", originalObject);
});

// Step to set the update object
Given("I have an update object:", (docString: string) => {
  updateObject = CommonUtils.parseJSON(docString);
  cy.log("Update Object:", updateObject);
});

// Step to set the mergeArrays option
Given("the mergeArrays option is {string}", (option: string) => {
  mergeArrays = option === "true";
  cy.log(`Merge Arrays Option: ${mergeArrays}`);
});

// Step to call the DeepMergeObject method
When("I call the DeepMergeObject method", () => {
  mergedResult = DataMapper.DeepMergeObject(originalObject, updateObject, mergeArrays);
  cy.log("Merged Result:", mergedResult);
});

// Step to validate the merged result
Then("the merged result should be:", (expectedResult: string) => {
  const expectedObject = CommonUtils.parseJSON(expectedResult);
  cy.log(`expectedObject: ${CommonUtils.toJSONString(expectedObject)}`);
  expect(mergedResult).to.deep.equal(expectedObject);
});
