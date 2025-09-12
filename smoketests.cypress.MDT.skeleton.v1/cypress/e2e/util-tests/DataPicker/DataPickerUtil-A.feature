@UTILTEST
Feature: DataPickerUtil - Random Data Selection Without Repetition with differing collection types

  @runBeforeHook
  Scenario: DATA-PICKER-A-001 - Select a random user without repetition
    Given there is a list of users
    When I request a random user multiple times - users list count times
    Then each user should be unique

  @runBeforeHook_SetUserList_OnlyOnce_DATA-PICKER-002
  Scenario Outline: DATA-PICKER-A-002 - Select a random user without repetition from table
    Given I display the initial list of users
    When I request a '<randomvaliduser>' user
    Then each requested user should be unique

    Examples:
      | randomvaliduser |
      | [VALID]         |
      | [VALID]         |
      | [VALID]         |
      | [VALID]         |
      | [VALID]         |

  @runBeforeHook
  Scenario: DATA-PICKER-A-003 - Select a random place of education without repetition
    Given there is a list of places of education
    When I request a random place of education multiple times - POE list count times
    Then each POE should be unique

  @runBeforeHook_SetPOEList_OnlyOnce_DATA-PICKER-004
  Scenario Outline: DATA-PICKER-A-004 - Select a random place of education without repetition from table
    Given I display the initial list of places of education
    When I request a '<randomvalidPOE>' POE
    Then each requested POE should be unique

    Examples:
      | randomvalidPOE |
      | [VALID]        |
      | [VALID]        |
      | [VALID]        |
      | [VALID]        |
      | [VALID]        |
      | [VALID]        |
      | [VALID]        |

  @runBeforeHook
  Scenario: DATA-PICKER-A-005 - Select next user without repetition
    Given there is a list of users
    When I request the user next in list multiple times - users list count times
    Then each user should be unique

  @runBeforeHook_SetUserList_OnlyOnce_DATA-PICKER-006
  Scenario Outline: DATA-PICKER-A-006 - Select next user without repetition from table
    Given I display the initial list of users
    When I request the next '<nextvaliduser>' user
    Then each requested user should be unique
    
    Examples:
      | nextvaliduser |
      | [VALID]       |
      | [VALID]       |
      | [VALID]       |
      | [VALID]       |
      | [VALID]       |