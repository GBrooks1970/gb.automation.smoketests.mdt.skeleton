@UTILTEST @ALL_Scenario_Context_Management
Feature: Scenario_Context - Scenario Context Management Another Feature file
    As a Developer
    I want to be able to retrieve the tags attached to a scenario
    So that I can review their tags

    Background:
        Given I have a bacground step - scenario_context

    @runBeforeHook_Scenario_Context_Management
    Scenario: Scenario_Context_Management-D - A Topaz User can search for an Application under the UCAS or CUKAS Scheme
        Given the test scenario has tags
        Then I verify the extracted tag includes "@runBeforeHook_Scenario_Context_Management"
