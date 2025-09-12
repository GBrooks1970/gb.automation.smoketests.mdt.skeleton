@UTILTEST @MAPPINGUTILS
Feature: MappingUtils - Map objects to key-value pairs - mapToKeyValuePairs method

    Scenario: Map object to key-value pairs
        Given I have an object, described in a transposed datatable
            | id      | 1                                                                                                         |
            | Name    | Test Object                                                                                               |
            | details | {"age": 30, "hobbies": ["reading", "gaming"], "metadata": {"registered": true, "tags": ["user", "test"]}} |
        When I map the object to key-value pairs - mapToKeyValuePairs method
        Then the result should be
            | id                          | 1                     |
            | Name                        | Test Object           |
            | details.age                 | 30                    |
            | details.hobbies             | ["reading", "gaming"] |
            | details.metadata.registered | true                  |
            | details.metadata.tags       | ["user", "test"]      |

    Scenario: Map complex object to key-value pairs
        Given I have an object, described in a transposed datatable
            | id    | 2                                                                                                                   |
            | title | Complex Object                                                                                                      |
            | info  | {"description": "A complex object", "attributes": {"size": "large", "color": "red", "tags": ["complex", "object"]}} |
        When I map the object to key-value pairs - mapToKeyValuePairs method
        Then the result should be
            | id                    | 2                     |
            | title                 | Complex Object        |
            | info.description      | A complex object      |
            | info.attributes.size  | large                 |
            | info.attributes.color | red                   |
            | info.attributes.tags  | ["complex", "object"] |
