import { Before, DataTable, Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import CommonUtils from "cypress/support/utils/common-utils";
import { ScenarioUtils } from "cypress/support/screenplay/core/ScenarioUtils";

Before({}, ({ pickle }) => {
    const scenarioTags = pickle.tags.map(tag => tag.name);
    const globalData = ScenarioUtils.getGlobalTestData();

    if (scenarioTags.includes("@ALL_Scenario_Context_Management")) {
        cy.log("ALL_Scenario_Context_Management Mode Enabled for this Scenario");
        console.log("ALL_Scenario_Context_Management Mode Enabled for this Scenario");
    }

    cy.log(`ALL Scenario Tags: ${scenarioTags.join(", ")}`);
    console.log(`ALL Scenario Tags:`, scenarioTags);

    globalData.tags = scenarioTags;
    ScenarioUtils.setGlobalTestData(globalData);
    //console.log(`globalData: ${CommonUtils.toJSONString(globalData)}`);    
    //console.log(`pickle: ${CommonUtils.toJSONString(pickle)}`);
});