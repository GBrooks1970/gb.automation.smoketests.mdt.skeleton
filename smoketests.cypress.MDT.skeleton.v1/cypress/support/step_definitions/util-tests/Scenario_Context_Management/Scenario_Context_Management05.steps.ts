import { DataTable, Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import CommonUtils from "cypress/support/utils/common-utils";
import { ScenarioUtils } from "cypress/support/screenplay/core/ScenarioUtils";
import { TopazUser } from "cypress/support/screenplay/actors/TopazUser";
import { assertNestedObjectContainsSubset } from "../test_util_methods/assertNestedObjectContainsSubset";

// Step to add multiple scenario context objects with specified keys
Given("I add or update multiple Topaz scenario context objects", (dataTable: DataTable) => {
    const globalData = ScenarioUtils.getGlobalTestData();

    dataTable.hashes().forEach(row => {
        let updateObject = globalData.Topaz_Scenario_context[row.key];

        if (updateObject && updateObject.TopazApplicant && updateObject.TopazApplicant.PID)
            updateObject.TopazApplicant.PID = row.PID;
        
        if (updateObject && updateObject.TopazApplicant && updateObject.TopazApplicant.Profile && updateObject.TopazApplicant.Profile.Forenames)
            updateObject.TopazApplicant.Profile.Forenames = row.Forenames;

        globalData.Topaz_Scenario_context[row.key] = {
            setup: updateObject ? updateObject.setup : false,
            User: TopazUser.namedWithUserData(row.name, {
                username: "",
                password: row.password,
            }),
            TopazApplicant: updateObject && updateObject.TopazApplicant ? updateObject.TopazApplicant : undefined
        };
    });

    ScenarioUtils.setGlobalTestData(globalData);
    cy.log(`globalData: ${CommonUtils.toJSONString(globalData)}`);
});


// Step to retrieve scenario context using the specified key
Then("I retrieve Topaz scenario context by key {string}", (key: string) => {
    const context = ScenarioUtils.getCurrentTopazScenarioContext(key);
    expect(context).to.exist;
    expect(context.User.Name).to.equal("TESTSUPERUSER");
});

// Step to retrieve another scenario context using the specified key
Then("I retrieve the Topaz scenario context by the scenario tag and validate following key value pairs:", (expectedPartialKeysResult: string) => {
    const context = ScenarioUtils.getCurrentTopazScenarioContextByTag();
    expect(context).to.exist;

    const subsetObject = CommonUtils.parseJSON(expectedPartialKeysResult);
    cy.log(`expected: ${CommonUtils.toJSONString(subsetObject)}`);

    let testObject: any = context.TopazApplicant;
    // Perform the nested check
    assertNestedObjectContainsSubset(testObject, subsetObject);
});

