import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import CommonUtils from "cypress/support/utils/common-utils";
import { DataMapper, NestedKeys } from "cypress/support/utils/DataMapper";

let inputObject: Record<string, any>;
let flattenedResult: Record<string, any>;

Given("an input object with values:", (inputJson: string) => {
    inputObject = CommonUtils.parseJSON(inputJson);
    cy.log(`Parsed input object: ${CommonUtils.toJSONString(inputObject, { unformatted: false })}`);
});

When("I call the DataMapper mapAndflattenObjectData method with asObject set to {string}", (asObject: string) => {
    const asObjectFlag = asObject.toLowerCase() === "true";
    flattenedResult = DataMapper.mapAndflattenObjectData(inputObject, "", asObjectFlag);
    cy.log(`Flattened result: ${CommonUtils.toJSONString(flattenedResult, { unformatted: false })}`);
});

Then("the flattened object as a StringArray result should be:", (expectedJson: string) => {
    const expectedResult = CommonUtils.parseJSON(expectedJson);
    cy.log(`expectedResult: ${CommonUtils.toJSONString(expectedResult)}`);
    expect(flattenedResult).to.deep.equal(expectedResult);
});
