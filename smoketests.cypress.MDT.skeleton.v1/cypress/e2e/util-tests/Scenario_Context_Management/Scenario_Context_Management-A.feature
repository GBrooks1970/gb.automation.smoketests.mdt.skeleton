@UTILTEST @ALL_Scenario_Context_Management
Feature: Scenario_Context - Manage Scenario Context by Scenario Tag

  Scenario:  Scenario_Context_Management-A-001 - Populate, update, and validate scenario context
    Given I populate scenario context using the scenario tag
    When I retrieve and update the scenario context by the scenario tag
    Then I validate the updated scenario context by the scenario tag

  @runBeforeHook_Scenario_Context_Management_A_002
  Scenario:  Scenario_Context_Management-A-002 - Populate, update, and validate scenario context - different test
    Given I populate scenario context using the scenario tag
    When I retrieve and update the scenario context by the scenario tag
    Then I validate the updated scenario context by the scenario tag