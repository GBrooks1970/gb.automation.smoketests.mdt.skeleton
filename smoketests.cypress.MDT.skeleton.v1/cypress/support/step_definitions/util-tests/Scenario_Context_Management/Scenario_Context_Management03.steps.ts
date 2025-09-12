import { DataTable, Given, Then } from "@badeball/cypress-cucumber-preprocessor";;
import { User } from "cypress/support/screenplay/actors/User";
import CommonUtils from "cypress/support/utils/common-utils";
import { ScenarioUtils } from "cypress/support/screenplay/core/ScenarioUtils";

/**
 * Adds scenario context with the key as the Scenario tag extracted from the title.
 */
Given("I populate scenario context using the scenario tag", () => {
  const globalData = ScenarioUtils.getGlobalTestData();
  const scenarioTag = ScenarioUtils.getCurrentScenarioTag();

  // Add context based on the scenario tag
  globalData.Scenario_context[scenarioTag] = {
    setup: false,
    User: User.namedWithUserData("Test User", {
      email: "user@example.com",
      passwordChange: "initial_password",
      userType: "Admin",
      username: "",
      password: ""
    })
  };

  // Save updated global test data
  ScenarioUtils.setGlobalTestData(globalData);
  cy.log(`Scenario context added with tag: ${scenarioTag}`);
});

/**
 * Retrieves the scenario context, updates it, and saves it back.
 */
Then("I retrieve and update the scenario context by the scenario tag", () => {
  const globalData = ScenarioUtils.getGlobalTestData();

  // Retrieve the context
  const context = ScenarioUtils.getCurrentScenarioContextByTag();
  expect(context).to.exist;
  expect(context.User.Name).to.equal("Test User");

  // Update the context
  context.User.userData.passwordChange = "updated_password";
  ScenarioUtils.setGlobalTestData(globalData);
});

/**
 * Retrieves the scenario context, updates it, and saves it back.
 */
Then("I retrieve the scenario context by the scenario tag and validate name {string}", (expectedName: string) => {
  const context = ScenarioUtils.getCurrentScenarioContextByTag();  
  expect(context).to.exist;
  expect(context.User.Name).to.equal(expectedName);   
});

/**
 * Validates the updated scenario context.
 */
Then("I validate the updated scenario context by the scenario tag", () => {
  // Retrieve and validate the updated context
  const context = ScenarioUtils.getCurrentScenarioContextByTag();
  expect(context).to.exist;
  expect(context.User.userData.passwordChange).to.equal("updated_password");
});


