Feature: Validation of Unique Learning Number
  As a Student wanting to apply for an undergraduate course
  I want my Unique Learning Number to be validated and any error reported
  So that I can correct any errors before I submit my application

  Background:
    Given the User is a Registered Student User With an Unsubmitted UG Application
  # And the User Signs In Using Valid Credentials, and Waits to Be Fully Signed In
  # And the User Navigates to the Education section of their UG Application

  Scenario Outline: UG-APPLY-ED-B-001 - Suitable error messages are returned for the ULN if it fails Validation
    When the User inputs Education Details with the details
      | ULN   |
      | <ULN> |
    And the User saves the Education Details
    Then the "<ErrorMessage>" message for "<ErrorType>" type is reported for the "<ErrorField>" field in the Education Details

    Examples:
      | ULN          | ErrorField | ErrorType           | ErrorMessage                                                               |
      | 123456789A   | ULN        | Invalid             | Please enter a valid Unique Learner Number.                                |
      | B234566753   | ULN        | CharacterValidation | You have entered characters (B) which are not allowed.                     |
      | 023Z566753   | ULN        | Invalid             | Please enter a valid Unique Learner Number.                                |
      | 123456789$   | ULN        | Invalid             | Please enter a valid Unique Learner Number.                                |
      | #234566753   | ULN        | CharacterValidation | You have entered characters (#) which are not allowed.                     |
      | 023^566753   | ULN        | Invalid             | Please enter a valid Unique Learner Number.                                |
      | [NUMERIC-9]  | ULN        | MinLength           | You have not entered the minimum number of characters (10) for this field. |
      | [NUMERIC-1]  | ULN        | MinLength           | You have not entered the minimum number of characters (10) for this field. |
      | [NUMERIC-11] | ULN        | MaxLength           | You have exceeded the maximum allowed characters (10) for this field.      |