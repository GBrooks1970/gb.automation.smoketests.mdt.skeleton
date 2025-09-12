import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import { GlobalTestData, scenario_context } from "../../../screenplay/core/scenario_context";
import { User } from "cypress/support/screenplay/actors/User";
import { EnvDataUtil } from "cypress/support/utils/env/EnvDataUtil";
import { ScenarioUtils } from "cypress/support/screenplay/core/ScenarioUtils";

let envData = new EnvDataUtil();

Given("I add a scenario context with key {string}", (key: string) => {
    const newScenarioContext: scenario_context<any> = {
        setup: false,
        User: User.fromDefault(envData),
    };

    const globalData = ScenarioUtils.getGlobalTestData(); 
    globalData.Scenario_context[key] = newScenarioContext;
    ScenarioUtils.setGlobalTestData(globalData);
});

Then("I retrieve scenario context by key {string} and validate name {string}", (key: string, expectedName: string) => {
    const context = ScenarioUtils.getCurrentScenarioContext(key);    
    expect(context).to.exist;
    expect(context.User.Name).to.equal(expectedName);
});
