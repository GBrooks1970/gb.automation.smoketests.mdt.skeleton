import { Before, DataTable, Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import CommonUtils from "cypress/support/utils/common-utils";
import { ScenarioUtils } from "cypress/support/screenplay/core/ScenarioUtils";

/**
 * This Before hook will be run before all scenarios
 * It is used to collect and set the glovaldata tags proporty
 */
Before({}, ({ pickle }) => {
    const scenarioTags = pickle.tags.map(tag => tag.name);
    const globalData = ScenarioUtils.getGlobalTestData();

    cy.log(`ALL Scenario Tags: ${scenarioTags.join(", ")}`);
    console.log(`ALL Scenario Tags:`, scenarioTags);

    globalData.tags = scenarioTags;
    const primaryTag = scenarioTags.length > 0 ? scenarioTags[0] : undefined;
    const scenarioTitle = primaryTag ? `${primaryTag} - ${pickle.name}` : pickle.name;

    globalData.currentScenario = {
        name: pickle.name,
        title: scenarioTitle,
        primaryTag,
        tags: scenarioTags,
        uri: (pickle as any).uri,
        id: (pickle as any).id
    };
    ScenarioUtils.setGlobalTestData(globalData);

    //console.log(`globalData: ${CommonUtils.toJSONString(globalData)}`);    
    //console.log(`pickle: ${CommonUtils.toJSONString(pickle)}`);
});
