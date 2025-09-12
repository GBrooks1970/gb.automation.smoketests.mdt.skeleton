import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { DataMapper } from "cypress/support/utils/DataMapper";

let templateObject: Record<string, any>;
let dataObject: Record<string, any>;
let mergeArrays: boolean;
let mergedResult: Record<string, any>;

Given("a template object:", (templateObjectString: string) => {
  templateObject = JSON.parse(templateObjectString);
});

Given("a data object:", (dataObjectString: string) => {
  dataObject = JSON.parse(dataObjectString);
});

Given("merge arrays option is {string}", (mergeArraysOption: string) => {
  mergeArrays = mergeArraysOption === "true";
});

When("I call the MergeWithTemplate method", () => {
  mergedResult = DataMapper.MergeWithTemplate(templateObject, dataObject, mergeArrays);
});

Then("the merged template result should be:", (expectedResultString: string) => {
  const expectedResult = JSON.parse(expectedResultString);
  expect(mergedResult).to.deep.equal(expectedResult);
});
