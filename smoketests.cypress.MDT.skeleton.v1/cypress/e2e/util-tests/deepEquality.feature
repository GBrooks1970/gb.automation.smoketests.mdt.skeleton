@UTILTEST
Feature: Custom Deep Equality of JSON objects

    Scenario: DEEPLY-EQUAL-001 - Compare two identical JSON objects
        Given I have two identical JSON objects
        When I compare them for deep equality
        Then they should be considered deeply equal

    Scenario: DEEPLY-EQUAL-002 - Compare two other identical JSON objects
        Given I have two other identical JSON objects
        When I compare them for deep equality
        Then they should be considered deeply equal

    Scenario: DEEPLY-EQUAL-003 - Compare two different JSON objects
        Given I have two different JSON objects
        When I compare them for deep equality
        Then they should not be considered deeply equal

    Scenario: DEEPLY-EQUAL-004 - Compare two JSON objects with special characters in their values
        Given I have two JSON objects with special characters in their values
        When I compare them for deep equality
        Then they should be considered deeply equal

    Scenario: DEEPLY-EQUAL-005 - Compare two JSON objects with identical Date properties
        Given I have two JSON objects with identical Date properties
        When I compare them for deep equality
        Then they should be considered deeply equal

    Scenario: DEEPLY-EQUAL-006 - Compare two JSON objects with different Date properties
        Given I have two JSON objects with different Date properties
        When I compare them for deep equality
        Then they should not be considered deeply equal

    Scenario: DEEPLY-EQUAL-007 - Compare two created JSON objects with identical properties
        Given I have two identical created JSON objects
        When I compare them for deep equality
        Then they should be considered deeply equal