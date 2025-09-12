@UTILTEST @ALL_Scenario_Context_Management
Feature: Scenario_Context - Scenario Context Management

    Scenario: Scenario_Context_Management-B-001 - Add and retrieve scenario context
        Given I add a scenario context with key "Session-001"
        Then I retrieve scenario context by key "Session-001"

    Scenario: Scenario_Context_Management-B-002 - Add and retrieve multiple scenario contexts
        Given I add multiple scenario context objects
            | key                               | name        | email             | password | passwordChange | userType |
            | SHARED-CONTEXT-001                | John Doe    | john@example.com  | 12345    | 09876          | Student  |
            | SHARED-CONTEXT-002                | Jane Smith  | jane@example.com  | abcde    | zzzzz          | Adviser  |
            | SHARED-CONTEXT-003                | Bob Smith   | bob@example.com   | 09876    | 12345          | Provider |
            | Scenario_Context_Management-B-002 | Jolly Roger | skull@example.com | 666      | 999            | Provider |
        Then I retrieve scenario context by key "SHARED-CONTEXT-001" and validate name "John Doe"
        And I retrieve another scenario context by key "SHARED-CONTEXT-002" and validate name "Jane Smith"
        And I retrieve another scenario context by key "Scenario_Context_Management-B-002" and validate name "Jolly Roger"