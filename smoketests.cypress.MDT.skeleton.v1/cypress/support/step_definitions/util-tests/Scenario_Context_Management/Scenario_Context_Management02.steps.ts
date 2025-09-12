import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import { EnvDataUtil } from "cypress/support/utils/env/EnvDataUtil";
import CommonUtils from "cypress/support/utils/common-utils";
import { ScenarioUtils } from "cypress/support/screenplay/core/ScenarioUtils";
import { User } from "cypress/support/screenplay/actors/User";
import { scenario_context, scenario_context_topaz } from "cypress/support/screenplay/core/scenario_context";
import { TopazUser } from "cypress/support/screenplay/actors/TopazUser";
import { TestData_sampleObjectArray } from "cypress/support/utils/TestDataObjects/TestData_sampleObjectArray";
import { TestData_TopazApplicant_01 } from "cypress/support/utils/TestDataObjects/TestData_TopazApplicant_01";
import { TestData_UkAddress_01, TestData_UkAddressWithCountry } from "cypress/support/utils/TestDataObjects/TestData_UkAddress_01";
import { TopazApplicant } from "cypress/support/utils/env/TopazData_TopazApplicant";

let envData = new EnvDataUtil();
let testObject: Record<string, any>;


Then("I retrieve another scenario context by key {string} and validate name {string}", (key: string, expectedName: string) => {
    const globalData = ScenarioUtils.getGlobalTestData();

    const context = globalData.Scenario_context[key];
    cy.log(`Scenario_context: ${CommonUtils.toJSONString(context)}`);

    expect(context).to.exist;
    expect(context.User.Name).to.equal(expectedName);

});

Then("I retrieve Topaz scenario context by key {string} and validate name {string}", (key: string, expectedName: string) => {
    const globalData = ScenarioUtils.getGlobalTestData();

    const context = globalData.Topaz_Scenario_context[key];
    cy.log(`Scenario_context: ${CommonUtils.toJSONString(context)}`);

    expect(context).to.exist;
    expect(context.User.Name).to.equal(expectedName);

});

Then("I retrieve the Topaz scenario context by the scenario tag and validate name {string}", (expectedName: string) => {
    const context = ScenarioUtils.getCurrentTopazScenarioContextByTag();

    expect(context).to.exist;
    expect(context.User.Name).to.equal(expectedName);
});

Given("I add a Topaz scenario context with key {string}", (key: string) => {
    const newScenarioContext: scenario_context_topaz<any> = {
        setup: false,
        User: TopazUser.fromDefault(envData),
    };

    const globalData = ScenarioUtils.getGlobalTestData();
    globalData.Topaz_Scenario_context[key] = newScenarioContext;
    ScenarioUtils.setGlobalTestData(globalData);


    const globalDataAfter = ScenarioUtils.getGlobalTestData();
    cy.log(`globalData: ${CommonUtils.toJSONString(globalDataAfter)}`);

});


Given("I have the predefined object {string} and add to a Topaz scenario context with key {string}", (objectName: string, key: string) => {
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

    const newScenarioContext: scenario_context_topaz<any> = {
        setup: false,
        User: TopazUser.fromDefault(envData),
        TopazApplicant: testObject as TopazApplicant
    };

    const globalData = ScenarioUtils.getGlobalTestData(); 
    globalData.Topaz_Scenario_context[key] = newScenarioContext;
    ScenarioUtils.setGlobalTestData(globalData);
});



Given("I have the predefined object {string} and add to a Topaz scenario context with key of scenario tag", (objectName: string) => {
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

    const newScenarioContext: scenario_context_topaz<any> = {
        setup: false,
        User: TopazUser.fromDefault(envData),
        TopazApplicant: testObject as TopazApplicant
    };

    const globalData = ScenarioUtils.getGlobalTestData();
    const tag = ScenarioUtils.getCurrentScenarioTag();
    

    globalData.Topaz_Scenario_context[tag] = newScenarioContext;
    ScenarioUtils.setGlobalTestData(globalData);
});