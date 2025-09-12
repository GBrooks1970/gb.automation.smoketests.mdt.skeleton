@UTILTEST @MAPPINGUTILS
Feature: MappingUtils - Compar objects by key-value pairs - compareObjectsByKeyValuePairs method

    Scenario: Compare two objects - v1
        Given I have two objects, described in a transposed datatable and json
            | obj1 | {"id": 1, "Name": "Test Object", "details": {"age": 30, "hobbies": ["reading", "gaming"], "metadata": {"registered": true, "tags": ["user", "test"]}}} |
            | obj2 | {"id": 1, "Name": "Test Object", "details": {"age": 30, "hobbies": ["reading", "gaming"], "metadata": {"registered": true, "tags": ["user", "demo"]}}} |
        When I compare the two objects - compareObjectsByKeyValuePairs method
        Then the result should have
            | matchCount        | 4                                                                                         |
            | matchPercentage   | 66.67                                                                                     |
            | totalProperties   | 12                                                                                        |
            | matchedProperties | [["id",1],["Name","Test Object"],["details.age",30],["details.metadata.registered",true]] |

    Scenario: Compare two different sized objects - v1
        Given I have two objects, described in a transposed datatable and json
            | obj1 | {"id": 1, "Name": "Test Object", "details": {"age": 30, "hobbies": ["reading", "rugby"], "metadata": {"registered": true, "tags": ["user", "test"]}}}                 |
            | obj2 | {"id": 1, "Name": "Test Object", "details": {"age": 31, "hobbies": ["reading", "gaming"], "metadata": {"registered": false, "tags": ["user", "demo"], "extra":true}}} |
        When I compare the two objects - compareObjectsByKeyValuePairs method
        Then the result should have
            | matchCount        | 2                                 |
            | matchPercentage   | 28.57                             |
            | totalProperties   | 13                                |
            | matchedProperties | [["id",1],["Name","Test Object"]] |


    Scenario: Compare two objects - v2
        Given I have two objects, described in a transposed datatable and json
            | obj1 | {"id": 1, "Name": "Test Object", "details": {"age": 30, "hobbies": ["reading", "gaming"], "metadata": {"registered": true, "tags": ["user", "test"]}}} |
            | obj2 | {"id": 1, "Name": "Test Object", "details": {"age": 30, "hobbies": ["reading", "gaming"], "metadata": {"registered": true, "tags": ["user", "demo"]}}} |
        When I compare the two objects - compareObjectsByKeyValuePairs_v2 method
        Then the result should have
            | matchCount        | 5                                                                                                                          |
            | matchPercentage   | 83.33                                                                                                                      |
            | totalProperties   | 12                                                                                                                         |
            | matchedProperties | {"id":"1","Name":"Test Object","details.age":"30","details.hobbies":"reading,gaming","details.metadata.registered":"true"} |


    Scenario: Compare two different sized objects - v2
        Given I have two objects, described in a transposed datatable and json
            | obj1 | {"id": 1, "Name": "Test Object", "details": {"age": 30, "hobbies": ["reading", "rugby"], "metadata": {"registered": true, "tags": ["user", "test"]}}}                 |
            | obj2 | {"id": 1, "Name": "Test Object", "details": {"age": 31, "hobbies": ["reading", "gaming"], "metadata": {"registered": false, "tags": ["user", "demo"], "extra":true}}} |
        When I compare the two objects - compareObjectsByKeyValuePairs_v2 method
        Then the result should have
            | matchCount        | 2                               |
            | matchPercentage   | 28.57                           |
            | totalProperties   | 13                              |
            | matchedProperties | {"id":"1","Name":"Test Object"} |
