import { DataTable, Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import { User } from "cypress/support/screenplay/actors/User";
import { ScenarioUtils } from "cypress/support/screenplay/core/ScenarioUtils";

// Step to add multiple scenario context objects with specified keys
Given("I add multiple scenario context objects", (dataTable: DataTable) => {
    const globalData = ScenarioUtils.getGlobalTestData();

    dataTable.hashes().forEach(row => {
        globalData.Scenario_context[row.key] = {
            setup: false,
            User: User.namedWithUserData(row.name, {
                email: row.email,
                username: "",
                password: row.password,
                passwordChange: row.passwordChange,
                userType: row.userType,
            })
        };
    });
    ScenarioUtils.setGlobalTestData(globalData);
});

// Step to retrieve scenario context using the specified key
Then("I retrieve scenario context by key {string}", (key: string) => {
    const context = ScenarioUtils.getCurrentScenarioContext(key);
    expect(context).to.exist;
    expect(context.User.Name).to.equal("userdefault");
});
