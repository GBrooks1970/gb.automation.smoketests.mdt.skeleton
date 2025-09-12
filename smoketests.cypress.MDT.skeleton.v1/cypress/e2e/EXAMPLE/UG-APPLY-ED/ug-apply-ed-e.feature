Feature: A Student can update a Place of Education
  As a Student wanting to apply for an undergraduate course
  I want to be able to update the details for a Place of Education
  So that I share my updated Education Details with the Institutions that I apply to

  Background:
    Given the User is a Registered Student User With an Unsubmitted UG Application
  # And the User Signs In Using Valid Credentials, and Waits to Be Fully Signed In
  # And the User Navigates to the Education section of their UG Application

  @runBeforeHook_UG_APPLY_ED_D_001
  Scenario: UG-APPLY-ED-E-001 - A student can update a Place of Education with new details
    When the User inputs Place of Education with the details
      | Name    | StartDate | EndDate | StudyType | Qualifications |
      | [VALID] | [VALID]   | [VALID] | [VALID]   | [VALID]        |
    And the User saves the Place of Education
    When the User inputs updated Place of Education with the details
      | Name          | StartDate     | EndDate       | StudyType     | Qualifications |
      | [UPDATEVALID] | [UPDATEVALID] | [UPDATEVALID] | [UPDATEVALID] | [UPDATEVALID]  |
    And the User saves the Place of Education
    Then the Place of Education has been stored correctly