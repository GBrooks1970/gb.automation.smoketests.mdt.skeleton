@UTILTEST
Feature: Demonstrate Sharing Mocha context - sharing of the User object and changing its properties

  Scenario: SHARED-CONTEXT-TESTS-001 - Changing User object properties during a test case
    Given I initialize the User object with default properties
    When I change the username property of the User object
    And I change the password property of the User object
    Then I verify the changed properties of the User object
    
  Scenario: SHARED-CONTEXT-TESTS-002 - Share Mocha context (User object) across step files
    Given I initialize a User object with default properties
    When I change the username property of the shared User object
    Then I should see the shared User object has default properties
