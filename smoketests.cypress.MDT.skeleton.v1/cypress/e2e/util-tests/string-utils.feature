@UTILTEST
Feature: Parsing Dynamic Alphanumeric Strings

    Scenario: STRING-UTILS-001 - Parsing a dynamic alphanumeric string
        Given I want to generate a dynamic string of "[ALPHA-NUMERIC-10]"
        When I parse the dynamic string
        Then the parsed dynamic string should be alphanumeric of length 10
    
    Scenario: STRING-UTILS-002 - Parsing a static string
        Given I want to generate a static string "[This is a static string]"
        When I parse the static string
        Then the parsed string should be the same as the static string
    
    Scenario: STRING-UTILS-003 - Generating an alphanumeric string
        Given I want to generate an alphanumeric string with a length of <length>
        When I generate the alphanumeric string
        Then the generated string should be alphanumeric of length <length>

        Examples:
            | length |
            | 0      |
            | 5      |
            | 10     |
    
    Scenario: STRING-UTILS-004 - Generating a numeric string
        Given I want to generate a numeric string with a length of <length>
        When I generate the numeric string
        Then the generated string should be numeric of length <length>

        Examples:
            | length |
            | 0      |
            | 5      |
            | 10     |
    
    Scenario: STRING-UTILS-005 - Generating an alpha string
        Given I want to generate an alpha string with a length of <length>
        When I generate the alpha string
        Then the generated string should be alpha of length <length>

        Examples:
            | length |
            | 0      |
            | 5      |
            | 10     |