@UTILTEST @MAPPINGUTILS
Feature: MappingUtils - Map And Parse RecordData with Substitute Object - MapAndParseRecordDataWithSubstituteObj

    Scenario: Map And Parse - matching properties from DataTable to PlaceOfEducation
        Given a DataTable object with properties
            | Name            | StartDate            | EndDate             | StudyType | Qualifications | otherProperty |
            | Example College | [START-JANUARY-2024] | [END-DECEMBER-2025] | [VALID]   | BSc Psychiatry | Other STuff   |
        And a substitute object with properties - PlaceOfEducation
            | Name           | ""          |
            | StartDate      | ""          |
            | EndDate        | ""          |
            | StudyType      | Full time   |
            | Qualifications | ""          |
            | extraProperty  | Extra Value |
        When the MapAndParseRecordDataWithSubstituteObj method is called - PlaceOfEducation
        Then the resulting PlaceOfEducation object should have properties
            | Name           | Example College |
            | StartDate      | 2024-01-01      |
            | EndDate        | 2025-12-31      |
            | StudyType      | Full time       |
            | Qualifications | BSc Psychiatry  |

    Scenario: Map And Parse - Handle missing properties in RecordData
        Given a DataTable object with properties
            | Name               | StartDate  | StudyType |
            | Example University | 2020-09-01 | [VALID]   |
        And a substitute object with properties - PlaceOfEducation
            | Name           | ""        |
            | StartDate      | ""        |
            | EndDate        | ""        |
            | StudyType      | Part time |
            | Qualifications | ""        |
        When the MapAndParseRecordDataWithSubstituteObj method is called - PlaceOfEducation
        Then the resulting PlaceOfEducation object should have properties
            | Name           | Example University |
            | StartDate      | 2020-09-01         |
            | EndDate        | ""                 |
            | StudyType      | Part time          |
            | Qualifications | ""                 |

    Scenario: Map And Parse - matching properties from DataTable to Target Object
        Given a DataTable object with properties
            | Name            | StartDate            | EndDate             | StudyType | Qualifications | otherProperty | blankProperty | updateBlankProperty |
            | Example College | [START-JANUARY-2024] | [END-DECEMBER-2025] | [VALID]   | BSc Psychiatry | Other STuff   | [BLANK]       | [UPDATEBLANK]       |
        And a substitute object with properties - Target Object
            | Name                | ""            |
            | StartDate           | ""            |
            | EndDate             | ""            |
            | StudyType           | Full time     |
            | Qualifications      | ""            |
            | extraProperty       | Extra Value   |
            | stringProperty      | "Test String" |
            | blankProperty       | ""            |
            | updateBlankProperty | ""            |
        When the MapAndParseRecordDataWithSubstituteObj method is called - Target Object
        Then the resulting Target Object should have properties
            | Name                | Example College |
            | StartDate           | 2024-01-01      |
            | EndDate             | 2025-12-31      |
            | StudyType           | Full time       |
            | Qualifications      | BSc Psychiatry  |
            | stringProperty      | "Test String"   |
            | blankProperty       | [BLANK]         |
            | updateBlankProperty | [UPDATEBLANK]   |

    Scenario: Map and Parse - Parsing ONLY Dynamic String and Date Tokens mapped from a substitute object
        Given a DataTable object with properties
            | Name           | StartDate | EndDate | StudyType | Qualifications | otherProperty |
            | [VALID]        | [VALID]   | [VALID] | [VALID]   | [VALID]        | [VALID]       |
        And a substitute object with properties - Target Object
            | Name            | [ALPHA-NUMERIC-12]   |
            | StartDate       | [START-JANUARY-2024] |
            | EndDate         | [END-DECEMBER-2025]  |
            | StudyType       | [VALID]              |
            | Qualifications  | [SUPER_DUPER_TOKEN]  |
            | extraProperty   | [IGNORE]             |
            | stringProperty  | [BLANK]              |
        When the MapAndParseRecordDataWithSubstituteObj method is called - Target Object
        Then the resulting Target Object 'Name' property should be parsed to an Alpha Numeric string containing 12 characters
        And the resulting Target Object 'StartDate' and 'EndDate' properties should be parsed as
            | StartDate      | 2024-01-01      |
            | EndDate        | 2025-12-31      |
        And the resulting Target Object properties with non-dynamic or invalid tokens should remain unchanged
            | StudyType      | [VALID]             |
            | Qualifications | [SUPER_DUPER_TOKEN] |
            | extraProperty  | [IGNORE]            |
            | stringProperty | [BLANK]             |