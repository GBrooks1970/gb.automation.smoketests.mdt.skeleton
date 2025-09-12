@UTILTEST @DATAMAPPER
Feature: DataMapper - Deep Merge Object in DataMapper
    As a developer
    I want to test the DataMapper utility method DeepMergeObject
    So that I can ensure the correct key-value pairs and properties are updated.

    Scenario Outline: DATAMAPPER-MERGE-OBJECTS-001 - DataMapper method Merging objects with optional array merging
        Given I have an original object:
            """
            <originalObject>
            """
        And I have an update object:
            """
            <updateObject>
            """
        And the mergeArrays option is "<mergeArrays>"
        When I call the DeepMergeObject method
        Then the merged result should be:
            """
            <expectedResult>
            """

        Examples:
            | originalObject                                                                                                                               | updateObject                                                                                                                            | mergeArrays | expectedResult                                                                                                                                                                            |
            | {"user":{"name":"Alice","details":{"age":30,"address":{"city":"London"},"hobbies":["reading","hiking"]}},"projects":[{"title":"Project A"}]} | {"user":{"name":"Alice Johnson","details":{"address":{"city":"Manchester"},"hobbies":["swimming"]}},"projects":[{"title":"Project C"}]} | false       | {"user":{"name":"Alice Johnson","details":{"age":30,"address":{"city":"Manchester"},"hobbies":["swimming"]}},"projects":[{"title":"Project C"}]}                                          |
            | {"user":{"name":"Alice","details":{"age":30,"address":{"city":"London"},"hobbies":["reading","hiking"]}},"projects":[{"title":"Project A"}]} | {"user":{"name":"Alice Johnson","details":{"address":{"city":"Manchester"},"hobbies":["swimming"]}},"projects":[{"title":"Project C"}]} | true        | {"user":{"name":"Alice Johnson","details":{"age":30,"address":{"city":"Manchester"},"hobbies":["reading","hiking","swimming"]}},"projects":[{"title":"Project A"},{"title":"Project C"}]} |
            | {"config":{"theme":"light","notifications":["email","sms"]},"preferences":{"language":"en"}}                                                 | {"config":{"theme":"dark","notifications":["push"]}}                                                                                    | false       | {"config":{"theme":"dark","notifications":["push"]},"preferences":{"language":"en"}}                                                                                                      |
            | {"config":{"theme":"light","notifications":["email","sms"]},"preferences":{"language":"en"}}                                                 | {"config":{"theme":"dark","notifications":["push"]}}                                                                                    | true        | {"config":{"theme":"dark","notifications":["email","sms","push"]},"preferences":{"language":"en"}}                                                                                        |
