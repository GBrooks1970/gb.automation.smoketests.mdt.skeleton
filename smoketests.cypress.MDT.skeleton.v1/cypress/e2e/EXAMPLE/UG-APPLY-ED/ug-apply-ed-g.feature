Feature: A Student can add a Qualification to a Place of Education
  As a Student wanting to apply for an undergraduate course
  I want to be able to add details of Qualifications for Places of Education that award Qualifications
  So that I share my updated Education Details with the institutions that I apply to

  Background:
    Given the User is a Registered Student User With an Unsubmitted UG Application
    # And the User Signs In Using Valid Credentials, and Waits to Be Fully Signed In
    # And the User Navigates to the Education section of their UG Application
    And the User has no Places of Education listed

  Scenario: UG-APPLY-ED-G-001 - A Student cannot add a qualification to a Place of Education that does not award Qualifications
    When the User inputs Place of Education with the details
      | Name   | StartDate   | EndDate   | StudyType   | Qualifications   |
      | <Name> | <StartDate> | <EndDate> | <StudyType> | <Qualifications> |
    And the User saves the Place of Education
    Then the "<ErrorMessage>" message for "<ErrorType>" type is reported for the "<ErrorField>" field in the Place Of Education
    And the User is unable to add Qualifications to Place of Education

    Examples:
      | Name    | StartDate | EndDate | StudyType | Qualifications | ErrorField | ErrorType        | ErrorMessage                                                        |
      | [BLANK] | [VALID]   | [VALID] | [VALID]   | No             | Name       | NoQualifications | You have indicated that you did not receive any Qualifications here |

  Scenario: UG-APPLY-ED-G-002 - A Student can add a qualification to a Place of Education that awards Qualifications
    When the User inputs Place of Education with the details
      | Name    | StartDate | EndDate | StudyType | Qualifications |
      | [VALID] | [VALID]   | [VALID] | [VALID]   | Yes            |
    And the User inputs a Qualification to Place of Education Item#1 with details
      | POE_Name | QualName | QualTitle | QualDate | AwardingBody | Grade   |
      | [VALID]  | [VALID]  | [VALID]   | [VALID]  | [VALID]      | [VALID] |
    Then the Qualifications for Place of Education Item#1 are stored correctly

  Scenario: UG-APPLY-ED-G-003 - A Student can add a Qualification with Modules to a Place of Education that awards Qualifications
    When the User inputs Place of Education with the details
      | Name    | StartDate | EndDate | StudyType | Qualifications |
      | [VALID] | [VALID]   | [VALID] | [VALID]   | Yes            |
    And the User inputs a Qualification to Place of Education Item#1 with details
      | QualName | QualTitle | QualDate | AwardingBody | Grade   | Module 1 | Module 1 Grade |
      | [VALID]  | [VALID]   | [VALID]  | [VALID]      | [VALID] | [VALID]  | [VALID]        |
    Then the Qualifications for Place of Education Item#1 are stored correctly

  Scenario: UG-APPLY-ED-G-004 - A Student can add multiple Modules to a Qualification
    When the User inputs Place of Education with the details
      | Name    | StartDate | EndDate | StudyType | Qualifications |
      | [VALID] | [VALID]   | [VALID] | [VALID]   | Yes            |
    And the User inputs a Qualification to Place of Education Item#1 with details
      | QualName | QualTitle | QualDate | AwardingBody | Grade   | GradeOther |
      | [VALID]  | [VALID]   | [VALID]  | [VALID]      | [VALID] | [VALID]    |
    And the User inputs a Module to Qualification Item#1 of Place of Education Item#1 with details
      | ModuleTitle | ModuleDate | Grade   | GradeOther |
      | [VALID]     | [VALID]    | [VALID] | [VALID]    |
      | [VALID]     | [VALID]    | [VALID] | [VALID]    |
      | [VALID]     | [VALID]    | [VALID] | [VALID]    |
    Then the Qualifications for Place of Education Item#1 are stored correctly

  Scenario Outline: UG-APPLY-ED-G-005 - A Student can add a Qualification where the Grade is not a standard Grade
    When the User inputs Place of Education with the details
      | Name    | StartDate | EndDate | StudyType | Qualifications |
      | [VALID] | [VALID]   | [VALID] | [VALID]   | Yes            |
    And the User inputs a Qualification to Place of Education Item#1 with details
      | QualName | QualTitle | QualDate | AwardingBody | Grade | GradeOther   |
      | [VALID]  | [VALID]   | [VALID]  | [VALID]      | Other | <GradeOther> |
    Then the Qualifications for Place of Education Item#1 are stored correctly

    Examples:
      | GradeOther      |
      | PASS            |
      | FAIL - 12345678 |

  Scenario: UG-APPLY-ED-G-006 - A Student can add multiple Qualifications for a Place of Education
    When the User inputs Place of Education with the details
      | Name    | StartDate | EndDate | StudyType | Qualifications |
      | [VALID] | [VALID]   | [VALID] | [VALID]   | Yes            |
    And the User inputs a Qualification to Place of Education Item#1 with details
      | QualName | QualTitle | QualDate | AwardingBody | Grade      | GradeOther |
      | [VALID]  | [VALID]   | [VALID]  | [VALID]      | [NotOther] | [BLANK]    |
      | [VALID]  | [VALID]   | [VALID]  | [VALID]      | [NotOther] | [BLANK]    |
      | [VALID]  | [VALID]   | [VALID]  | [VALID]      | [NotOther] | [BLANK]    |
      | [VALID]  | [VALID]   | [VALID]  | [VALID]      | [NotOther] | [BLANK]    |
      | [VALID]  | [VALID]   | [VALID]  | [VALID]      | Other      | [VALID]    |
    Then the Qualifications for Place of Education Item#1 are stored correctly