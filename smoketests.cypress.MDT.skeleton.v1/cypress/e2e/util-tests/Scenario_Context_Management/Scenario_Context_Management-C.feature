@UTILTEST @ALL_Scenario_Context_Management
Feature: Scenario_Context - Scenario Context Management Another Feature file

    Scenario: Scenario_Context_Management-C-001 - Add and retrieve scenario context in another feature file
        Given I add a scenario context with key "Session-001"
        Then I retrieve scenario context by key "Session-001"

    Scenario: Scenario_Context_Management-C-002 - Add and retrieve multiple scenario contexts in another feature file
        Given I add multiple scenario context objects
            | key                               | name           | email                | password | passwordChange | userType |
            | SHARED-CONTEXT-001                | Fred Blogs     | fred@example.com     | 77777    | 88888          | Student  |
            | Scenario_Context_Management-C-002 | Geiger Counter | ticktock@example.com | 66666    | 99999          | Adviser  |
        Then I retrieve scenario context by key "SHARED-CONTEXT-001" and validate name "Fred Blogs"
        And I retrieve the scenario context by the scenario tag and validate name "Geiger Counter"