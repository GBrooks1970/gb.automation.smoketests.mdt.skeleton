import { Before, DataTable, Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import CommonUtils from "cypress/support/utils/common-utils";
import { ScenarioUtils } from "cypress/support/screenplay/core/ScenarioUtils";
import { TopazUser } from "cypress/support/screenplay/actors/TopazUser";
import { assertNestedObjectContainsSubset } from "../test_util_methods/assertNestedObjectContainsSubset";

let extractedTags: string[];

Before({ tags: "@runBeforeHook_Scenario_Context_Management" }, () => {
    cy.log("Before - @runBeforeHook_Scenario_Context_Management");
    const globalData = ScenarioUtils.getGlobalTestData();
    const scenarioTitle = ScenarioUtils.getCurrentScenarioTitle();
    const scenarioTag = ScenarioUtils.getCurrentScenarioTag();
    cy.log(`Scenario: ${scenarioTitle} `);
});

Given("I have a bacground step - scenario_context", () => {
    const extractedBeforeTags = ScenarioUtils.getCurrentCurrentTestTags();
    cy.log(`Extracted Tags: ${JSON.stringify(extractedBeforeTags)}`);
});

Given("the test scenario has tags", () => {
    extractedTags = ScenarioUtils.getCurrentCurrentTestTags();
    cy.log(`Extracted Tags: ${JSON.stringify(extractedTags)}`);
});

Then("I verify the extracted tag includes {string}", (expectedTag: string) => {
    expect(extractedTags).to.include(expectedTag);
});
