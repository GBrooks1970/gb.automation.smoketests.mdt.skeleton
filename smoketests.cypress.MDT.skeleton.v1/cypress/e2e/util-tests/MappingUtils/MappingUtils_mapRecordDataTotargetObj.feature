@UTILTEST @MAPPINGUTILS
Feature: MappingUtils - Map RecordData to Target Object - mapRecordDataToTargetObj method

    Scenario: Map matching properties from RecordData to PlaceOfEducation
        Given a RecordData object with properties
            | Name           | Example University   |
            | StartDate      | 2020-09-01           |
            | EndDate        | 2024-06-30           |
            | StudyType      | Bachelor's           |
            | Qualifications | BSc Computer Science |
        And a substitute object with empty properties - PlaceOfEducation
            | Name           | "" |
            | StartDate      | "" |
            | EndDate        | "" |
            | StudyType      | "" |
            | Qualifications | "" |
        When the mapRecordDataToTargetObj method is called
        Then the resulting PlaceOfEducation object should have properties
            | Name           | Example University   |
            | StartDate      | 2020-09-01           |
            | EndDate        | 2024-06-30           |
            | StudyType      | Bachelor's           |
            | Qualifications | BSc Computer Science |

    Scenario: Handle extra properties in RecordData
        Given a RecordData object with properties
            | Name           | Example University   |
            | StartDate      | 2020-09-01           |
            | EndDate        | 2024-06-30           |
            | StudyType      | Bachelor's           |
            | Qualifications | BSc Computer Science |
            | extraProperty  | Extra Value          |
        And a substitute object with empty properties - PlaceOfEducation
            | Name           | "" |
            | StartDate      | "" |
            | EndDate        | "" |
            | StudyType      | "" |
            | Qualifications | "" |
        When the mapRecordDataToTargetObj method is called
        Then the resulting PlaceOfEducation object should have properties
            | Name           | Example University   |
            | StartDate      | 2020-09-01           |
            | EndDate        | 2024-06-30           |
            | StudyType      | Bachelor's           |
            | Qualifications | BSc Computer Science |

    Scenario: Handle missing properties in RecordData
        Given a RecordData object with properties
            | Name      | Example University |
            | StartDate | 2020-09-01         |
            | StudyType | [VALID]            |
        And a substitute object with properties - PlaceOfEducation
            | Name           | "" |
            | StartDate      | "" |
            | EndDate        | "" |
            | StudyType      | "" |
            | Qualifications | "" |
        When the mapRecordDataToTargetObj method is called
        Then the resulting PlaceOfEducation object should have properties
            | Name           | Example University |
            | StartDate      | 2020-09-01         |
            | EndDate        | ""                 |
            | StudyType      | [VALID]            |
            | Qualifications | ""                 |

    Scenario: Map matching properties from RecordData to WorkExperience
        Given a RecordData object with properties
            | companyName      | Tech Corp         |
            | position         | Software Engineer |
            | StartDate        | 2021-01-01        |
            | EndDate          | 2023-12-31        |
            | responsibilities | Development       |
        And a WorkExperience object with empty properties
            | companyName      | "" |
            | position         | "" |
            | StartDate        | "" |
            | EndDate          | "" |
            | responsibilities | "" |
        When the mapRecordDataToTargetObj method is called - WorkExperience
        Then the resulting WorkExperience object should have properties
            | companyName      | Tech Corp         |
            | position         | Software Engineer |
            | StartDate        | 2021-01-01        |
            | EndDate          | 2023-12-31        |
            | responsibilities | Development       |