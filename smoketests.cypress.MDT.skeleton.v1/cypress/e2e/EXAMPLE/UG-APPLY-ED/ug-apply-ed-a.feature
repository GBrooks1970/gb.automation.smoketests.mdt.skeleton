Feature: Student can capture Education details
  As a Student wanting to apply for an undergraduate course
  I want to be able to provide a history of my education
  So that they can be shared with the Institutions I want to apply to

  Background:
  Given the User is a Registered Student User With an Unsubmitted UG Application
  # And the User Signs In Using Valid Credentials, and Waits to Be Fully Signed In
  # And the User Navigates to the Education section of their UG Application

  @runBeforeHook_UG_APPLY_ED_A_001
  Scenario Outline: UG-APPLY-ED-A-001 - A Student can store their Education details
    When the User inputs Education Details with the details
      | ULN   | HighestExpectedQualification   |
      | <ULN> | <HighestExpectedQualification> |
    And the User saves the Education Details
    Then the User Education Details have been stored correctly

    Examples:
      | ULN     | HighestExpectedQualification |
      | [BLANK] | [VALID]                      |
      | [VALID] | [BLANK]                      |
      | [VALID] | [VALID]                      |