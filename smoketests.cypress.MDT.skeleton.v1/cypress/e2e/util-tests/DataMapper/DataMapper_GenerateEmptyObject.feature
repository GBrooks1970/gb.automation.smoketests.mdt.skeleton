@UTILTEST @DATAMAPPER
Feature: DataMapper - Generate Empty Object from Interface

    Scenario Outline: DATAMAPPER-GENERATE-EMPTY-OBJECTS-001 - DataMapper method Generate an object with empty values based on an interface
        Given I have a "<interfaceName>" structure
        When I call generateEmptyObject with the interface
        Then the result should be an object with all properties set to ""

        Examples:
            | interfaceName                  |
            | TopazApplicant                 |
            | TopazApplicantProfile          |
            | TopazQualification             |
            | TopazReferenceDetails          |
            | MoreAboutYouAndExtraActivities |
            | TopazApplicantOtherDetails     |
            | TopazEmergencyContact          |
            | TopazPassportDetails           |
            | TopazOtherEducationDetails     |
