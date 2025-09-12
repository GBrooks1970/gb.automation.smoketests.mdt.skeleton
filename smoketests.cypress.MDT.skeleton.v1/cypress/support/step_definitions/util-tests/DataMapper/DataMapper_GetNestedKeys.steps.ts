import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import CommonUtils from "cypress/support/utils/common-utils";
import { DataMapper } from "cypress/support/utils/DataMapper";
import { TestData_sampleObjectArray } from "cypress/support/utils/TestDataObjects/TestData_sampleObjectArray";
import { TestData_TopazApplicant_01 } from "cypress/support/utils/TestDataObjects/TestData_TopazApplicant_01";
import { TestData_UkAddress_01, TestData_UkAddressWithCountry } from "cypress/support/utils/TestDataObjects/TestData_UkAddress_01";
import { forEach } from "cypress/types/lodash";

let testObject: Record<string, any>;
let nestedKeysResult: Record<string, any>;;//string[];
let mapAndflattenObjectData: Record<string, any>;

Given("I have the following object:", (inputObject: string) => {
    testObject = CommonUtils.parseJSON(inputObject);
    cy.log(`testObject: ${CommonUtils.toJSONString(testObject)}`);
});

Given("I have the predefined object {string}", (objectName: string) => {
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

When("I call the DataMapper getNestedKeys method", () => {
    //Superseded method
    //nestedKeysResult = DataMapper.getNestedKeys(testObject);
    nestedKeysResult = DataMapper.mapAndflattenObjectData(testObject, "", false, true);
    cy.log(`nestedKeysResult: ${CommonUtils.toJSONString(nestedKeysResult)}`);
});


When("I call the DataMapper mapAndflattenObjectData method with asObject set to true - Scenario_Context_Management", () => {
    cy.log(`inputObject: ${CommonUtils.toJSONString(testObject)}`);
    mapAndflattenObjectData = DataMapper.mapAndflattenObjectData(testObject, "", true);
    cy.log(`mapAndflattenObjectData: ${CommonUtils.toJSONString(mapAndflattenObjectData)}`);
});

Then("I should get some of the following flattened key value pairs:", (expectedPartialKeysResult: string) => {
    const expected = CommonUtils.parseJSON(expectedPartialKeysResult);
    cy.log(`expected: ${CommonUtils.toJSONString(expected)}`);

    Object.entries(expected).forEach(([key, value]) => {
        cy.log(`expected key: ${key} value: ${value}`);
        expect(mapAndflattenObjectData).to.have.property(key, value);
      });
});

Then("I should get the following nested property paths:", (expectedKeys: string) => {
    const expectedArray:string[] = CommonUtils.parseJSON(expectedKeys);
    cy.log(`expectedArray: ${CommonUtils.toJSONString(expectedArray)}`);
    //Match all members
    //expect(nestedKeysResult).to.have.members(expectedArray);
    expectedArray.forEach((expectedKey) => {
        expect(expectedArray).to.include(
            expectedKey,
            `Array is missing expected key: ${expectedKey}`
          );
    });
});

Then("I should get some of the following nested property paths:", (expectedKeys: string) => {
    const expectedArray: string[] = CommonUtils.parseJSON(expectedKeys);
    cy.log(`expectedArray: ${CommonUtils.toJSONString(expectedArray)}`);
    expectedArray.forEach((expectedKey) => {
        expect(expectedArray).to.include(
            expectedKey,
            `Array is missing expected key: ${expectedKey}`
          );
    });
});