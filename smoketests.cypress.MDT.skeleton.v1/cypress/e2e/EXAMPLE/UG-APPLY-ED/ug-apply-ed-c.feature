Feature: A Student can add a Place of Education
  As a Student wanting to apply for an undergraduate course
  I want to be able to add a place of education
  So that they can be shared with the Institutions I want to apply to

  Background:
    Given the User is a Registered Student User With an Unsubmitted UG Application
  # And the User Signs In Using Valid Credentials, and Waits to Be Fully Signed In
  # And the User Navigates to the Education section of their UG Application

  @runBeforeHook_UG_APPLY_ED_C_001
  Scenario Outline: UG-APPLY-ED-C-001 - A Student can add a Place of Education
    When the User inputs Place of Education with the details
      | Name   | StartDate   | EndDate   | StudyType   | Qualifications   |
      | <Name> | <StartDate> | <EndDate> | <StudyType> | <Qualifications> |
    And the User saves the Place of Education
    Then the Place of Education has been stored correctly

    Examples:
      | Name    | StartDate | EndDate | StudyType | Qualifications |
      | [VALID] | [VALID]   | [VALID] | Full time | Yes            |
      | [VALID] | [VALID]   | [VALID] | Part time | No             |
      | [VALID] | [VALID]   | [VALID] | Sandwich  | Yes            |