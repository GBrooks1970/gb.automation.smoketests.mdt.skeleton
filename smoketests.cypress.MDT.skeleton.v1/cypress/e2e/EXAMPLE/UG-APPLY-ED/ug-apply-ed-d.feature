Feature: Validation of Place of Education Details
  As a Student wanting to apply for an undergraduate course
  I want feedback on the validity of my Place of Education
  So that I can correct any errors before submitting my application

  Background:
    Given the User is a Registered Student User With an Unsubmitted UG Application
  # And the User Signs In Using Valid Credentials, and Waits to Be Fully Signed In
  # And the User Navigates to the Education section of their UG Application

  @runBeforeHook_UG_APPLY_ED_D_001
  Scenario Outline: UG-APPLY-ED-D-001 - A Student cannot add a Place of Education without specifying mandatory details
    When the User inputs Place of Education with the details
      | Name   | StartDate   | EndDate   | StudyType   | Qualifications   |
      | <Name> | <StartDate> | <EndDate> | <StudyType> | <Qualifications> |
    And the User saves the Place of Education
    Then the "<ErrorMessage>" message for "<ErrorType>" type is reported for the "<ErrorField>" field in the Place Of Education

    Examples:
      | Name    | StartDate | EndDate | StudyType | Qualifications | ErrorField     | ErrorType | ErrorMessage           |
      | [BLANK] | [VALID]   | [VALID] | [VALID]   | [VALID]        | Name           | NoValue   | Please specify a value |
      | [VALID] | [BLANK]   | [VALID] | [VALID]   | [VALID]        | StartDate      | NoValue   | Please specify a value |
      | [VALID] | [VALID]   | [BLANK] | [VALID]   | [VALID]        | EndDate        | NoValue   | Please specify a value |
      | [VALID] | [VALID]   | [VALID] | [BLANK]   | [VALID]        | StudyType      | NoValue   | Please specify a value |
      | [VALID] | [VALID]   | [VALID] | [VALID]   | [BLANK]        | Qualifications | NoValue   | Please specify a value |


  Scenario Outline: UG-APPLY-ED-D-002 - A Student cannot add a Place of Education where the Attendence End Date is before the Start Date
    When the User inputs Place of Education with the details
      | StartDate   | EndDate   |
      | <StartDate> | <EndDate> |
    And the User saves the Place of Education
    Then the "<ErrorMessage>" message for "<ErrorType>" type is reported for the "<ErrorField>" field in the Place Of Education

    Examples:
      | StartDate      | EndDate              | ErrorField | ErrorType       | ErrorMessage                                 |
      | [TODAY-1YEAR]  | [TODAY-2YEAR-4MONTH] | EndDate    | BeforeStartDate | The End date cannot be before the Start date |
      | [TODAY-1MONTH] | [TODAY-3MONTH]       | EndDate    | BeforeStartDate | The End date cannot be before the Start date |

  #TODO - Need to make sure this repeats the 3 examples - does not at preesent!!!!
  Scenario: UG-APPLY-ED-D-003 - An error or warning is generated if attendance at Second Place of Education overlaps with attendence at a Full-time Place of Education
    Given the User inputs Place of Education with the details
      | Name    | StartDate     | EndDate        | StudyType      | Qualifications |
      | [VALID] | [TODAY-3YEAR] | [TODAY+2MONTH] | <studyType001> | [VALID]        |
    And the User saves the Place of Education
    When the User inputs a Second Place of Education with the details
      | Name    | StartDate      | EndDate       | StudyType      | Qualifications |
      | [VALID] | [TODAY-1MONTH] | [TODAY+2YEAR] | <studyType002> | [VALID]        |
    And the User saves the Place of Education
    Then the "<ErrorMessage>" message for "<ErrorType>" type is reported for the "<ErrorField>" field in the Place Of Education

    Examples:
      | studyType001 | studyType002 | ErrorField | ErrorType      | ErrorMessage                                                                                                                                                                 |
      | Full time    | Full time    | Name       | OverlappingPOE | You cannot be full-time at more than one school or college at the same time - please check the start and finish dates you have entered.                                      |  
      | Full time    | Part time    | Name       | TwoOrMorePOE   | The details you have entered show that you have attended two or more different schools or colleges at the same time. If this is correct, please ignore this warning message. |
      | Full time    | Sandwich     | Name       | TwoOrMorePOE   | The details you have entered show that you have attended two or more different schools or colleges at the same time. If this is correct, please ignore this warning message. |
