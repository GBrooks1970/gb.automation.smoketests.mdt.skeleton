Feature: A Student can remove a Place of Education
  As a Student wanting to apply for an undergraduate course
  I want to be able to remove the details for a Place of Education
  So that I share my updated Education Details with the Institutions that I apply to

  Background:
    Given the User is a Registered Student User With an Unsubmitted UG Application
  # And the User Signs In Using Valid Credentials, and Waits to Be Fully Signed In
  # And the User Navigates to the Education section of their UG Application

  @runBeforeHook_UG_APPLY_ED_D_001
  Scenario: UG-APPLY-ED-F-001 - A Student can remove an existing Place of Education
    When the User inputs Place of Education with the details
      | Name    | StartDate | EndDate | StudyType | Qualifications |
      | [VALID] | [VALID]   | [VALID] | [VALID]   | [VALID]        |
    When the User deletes Place of Education Item#1
    And the User confirms deletion of the Place of Education
    Then the Place of Education has been deleted

  Scenario: UG-APPLY-ED-F-002 - A Student can abort the removal of an existing Place of Education
    Given the User has no Places of Education listed
    And the User inputs Place of Education with the details
      | Name    | StartDate | EndDate | StudyType | Qualifications |
      | [VALID] | [VALID]   | [VALID] | [VALID]   | [VALID]        |
    When the User deletes Place of Education Item#1
    And the User cancels deletion of the Place of Education
    Then the Place of Education has not been deleted