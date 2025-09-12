@UTILTEST @ALL_Scenario_Context_Management
Feature: Scenario_Context - Scenario Context Management Another Feature file

    Scenario: Scenario_Context_Management-D-001 - Add and retrieve scenario context in another feature file
        Given I add a Topaz scenario context with key "Session-001"
        Then I retrieve Topaz scenario context by key "Session-001"

    Scenario: Scenario_Context_Management-D-002 - Add and retrieve multiple scenario contexts in another feature file
        Given I add or update multiple Topaz scenario context objects
            | key                               | name           | email                | password | passwordChange | userType |
            | SHARED-CONTEXT-001                | Fred Blogs     | fred@example.com     | 77777    | 88888          | Student  |
            | Scenario_Context_Management-D-002 | Geiger Counter | ticktock@example.com | 66666    | 99999          | Adviser  |
        Then I retrieve Topaz scenario context by key "SHARED-CONTEXT-001" and validate name "Fred Blogs"
        And I retrieve the Topaz scenario context by the scenario tag and validate name "Geiger Counter"


    Scenario: Scenario_Context_Management-D-003 - Add and retrieve multiple scenario contexts in another test in another feature file
        Given I add or update multiple Topaz scenario context objects
            | key                               | name       | email              | password | passwordChange | userType |
            | SHARED-CONTEXT-001                | Fred Blogs | freddy@example.com | 77677    | 88788          | Student  |
            | Scenario_Context_Management-D-003 | Who Me     | whome@example.com  | 00000    | 33333          | Ucas     |
        Then I retrieve Topaz scenario context by key "SHARED-CONTEXT-001" and validate name "Fred Blogs"
        And I retrieve the Topaz scenario context by the scenario tag and validate name "Who Me"


    Scenario Outline: Scenario_Context_Management-D-004 - Get nested keys from various predefined objects
        Given I have the predefined object "<objectName>"
        When I call the DataMapper getNestedKeys method
        And I should get some of the following nested property paths:
            """
            <expectedKeys>
            """

        Examples:
            | objectName              | expectedKeys                                                                                                     |
            | TestData_TopazApplicant | ["PID", "Scheme", "Profile.Forenames", "Profile.Initials", "Profile.Surname", "Profile.Email", "Profile.Gender"] |


    Scenario Outline: Scenario_Context_Management-D-005 - Get nested keys from various predefined objects
        Given I have the predefined object "<objectName>" and add to a Topaz scenario context with key "Scenario_Context_Management-D-005"
        When I call the DataMapper mapAndflattenObjectData method with asObject set to true - Scenario_Context_Management
        Then I should get some of the following flattened key value pairs:
            """
            <expectedPartialKeysResult>
            """
        And I retrieve the Topaz scenario context by the scenario tag and validate following key value pairs:
            """
            <subsetObject>
            """

        Examples:
            | objectName              | expectedPartialKeysResult                                                                                                                             | subsetObject                                                                       |
            | TestData_TopazApplicant | {"PID":"1234567890","Scheme":"UCAS","Profile.Forenames":"John","Profile.Initials":"J","Profile.Surname":"Doe","Profile.Email":"john.doe@example.com"} | {"Profile":{"Forenames":"John","Initials":"J","Surname":"Doe"},"RefundAmount":"0"} |


    Scenario Outline: Scenario_Context_Management-D-006 - Add and update Topaz Applicant within Scenerio Context
        Given I have the predefined object "<objectName>" and add to a Topaz scenario context with key of scenario tag
        When I add or update multiple Topaz scenario context objects
            | key                               | name   | email             | password | passwordChange | userType | PID         | Forenames |
            | Scenario_Context_Management-D-006 | Who Me | whome@example.com | 00000    | 33333          | Ucas     | X0000000001 | Joe       |
        Then I retrieve the Topaz scenario context by the scenario tag and validate following key value pairs:
            """
            <subsetObject>
            """

        Examples:
            | objectName              | subsetObject                                                                                          |
            | TestData_TopazApplicant | {"PID":"X0000000001","Profile":{"Forenames":"Joe","Initials":"J","Surname":"Doe"},"RefundAmount":"0"} |