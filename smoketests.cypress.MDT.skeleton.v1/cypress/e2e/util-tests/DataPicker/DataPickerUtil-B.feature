@UTILTEST
Feature: DataPickerUtil - Random Member Selection Without Repetition

    Scenario Outline: DATA-PICKER-B-001 - Get a random member without repetition
        Given a DataPickerUtil instance with members "<member1>", "<member2>", and "<member3>"
        When I get a random member without repetition
        Then the member should be one of "<member1>", "<member2>", or "<member3>"
        And the member should not be available for future selections

        Examples:
            | member1 | member2 | member3 |
            | Dan     | Darnell | Paul    |
            | Alice   | Bob     | Charlie |
            | John    | Doe     | Jane    |

    Scenario Outline: DATA-PICKER-B-002 - Get the next member without repetition
        Given a DataPickerUtil instance with members "<member1>", "<member2>", and "<member3>"
        When I get the next member without repetition
        Then the member should be "<expectedMember>"
        And the member should not be available for future selections

        Examples:
            | member1 | member2 | member3 | expectedMember |
            | Dan     | Darnell | Paul    | Dan            |
            | Alice   | Bob     | Charlie | Alice          |
            | John    | Doe     | Jane    | John           |

    Scenario: DATA-PICKER-B-003 - Attempt to get a member when no members are available
        Given a DataPickerUtil instance with no available members
        When I try to get a member
        Then an error should be thrown

    Scenario Outline: DATA-PICKER-B-004 - Get a random member with a filter
        Given a DataPickerUtil instance with members "<member1>", "<member2>", "<member3>", and "<member4>"
        When I get a random member with a filter excluding "<excludedMember>"
        Then the selected member should not be "<excludedMember>"

        Examples:
            | member1 | member2 | member3 | member4 | excludedMember |
            | Dan     | Darnell | Paul    | Charlie | Dan            |
            | Alice   | Bob     | Charlie | Dave    | Bob            |

    Scenario Outline: DATA-PICKER-B-005 - Get the next member with a filter
        Given a DataPickerUtil instance with members "<member1>", "<member2>", "<member3>", and "<member4>"
        When I get the next member with a filter excluding "<excludedMember>"
        Then the selected member should not be "<excludedMember>"

        Examples:
            | member1 | member2 | member3 | member4 | excludedMember |
            | Dan     | Darnell | Paul    | Charlie | Dan            |
            | Alice   | Bob     | Charlie | Dave    | Bob            |
            | UCAS    | CUKAS   | GTTR    | UCAS2   | UCAS           |

    Scenario: DATA-PICKER-B-006 - Get a UserData member with userType equal to "BigClub"
        Given a DataPickerUtil instance with a collection of UserData variables
        When I get a random UserData member with a filter for userType "BigClub"
        Then the selected member should have userType "BigClub"