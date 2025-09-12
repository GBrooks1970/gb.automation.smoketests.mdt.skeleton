@UTILTEST @DATAMAPPER
Feature: DataMapper - Merge object with template in DataMapper
    As a developer
    I want to test the DataMapper utility method MergeWithTemplate
    So that I can ensure the correct key-value pairs and properties are merged to the template.


    Scenario Outline: DATAMAPPER-MERGE-TEMPLATE-OBJECTS-001 - DataMapper method Merging data object with a template object
        Given a template object:
            """
            <templateObject>
            """
        And a data object:
            """
            <dataObject>
            """
        And merge arrays option is "<mergeArrays>"
        When I call the MergeWithTemplate method
        Then the merged template result should be:
            """
            <expectedResult>
            """

        Examples:
            | templateObject                                | dataObject                                               | mergeArrays | expectedResult                                      |
            | {"name": "","details": {"age": 0,"city": ""}} | {"name": "Alice","details": {"age": 30,"country": "UK"}} | false       | {"name": "Alice","details": {"age": 30,"city": ""}} |
            | {"skills": [""]}                              | {"skills": ["JavaScript","TypeScript"]}                  | true        | {"skills": ["","JavaScript","TypeScript"]}          |
            | {"skills": [""]}                              | {"skills": ["JavaScript","TypeScript"]}                  | false       | {"skills": ["JavaScript","TypeScript"]}             |
            | {"name": "","email": ""}                      | {"name": "Bob","email": "bob@example.com","age": 25}     | false       | {"name": "Bob","email": "bob@example.com"}          |
