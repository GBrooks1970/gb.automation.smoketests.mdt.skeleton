@UTILTEST @DATAMAPPER
Feature: DataMapper - DataMapper.mapAndflattenObjectData
    As a developer
    I want to test the DataMapper.mapAndflattenObjectData method
    So that I can ensure it returns the correct flattened output for various parameter combinations

    # The Scenario Outline below tests different combinations of:
    # - A prefix to prepend to keys,
    # - The output type: flattened object or an array of key-value pairs or. just the keys (asPathArray),
    # - Whether the output values should be the original property names (returnPropName = true) or the actual values.

    Scenario Outline: Flatten an object with various options
        Given a JSON object:
            """
            <inputObject>
            """
        When I flatten the object using prefix "<prefix>", asObject "<asObject>", asPathArray "<asPathArray>", and returnPropName "<returnPropName>"
        Then the flattened result should equal:
            """
            <expectedResult>
            """

        Examples:
            | inputObject                                                                                                                                                                                                                 | prefix  | asObject | asPathArray | returnPropName | expectedResult                                                                                                                                                                                                                                                                           |
            | {"a": {"b": 1, "c": 2}}                                                                                                                                                                                                     |         | true     | false       | false          | {"a.b": 1, "a.c": 2}                                                                                                                                                                                                                                                                     |
            | {"a": {"b": 1, "c": 2}}                                                                                                                                                                                                     | x.      | true     | false       | false          | {"x.a.b": 1, "x.a.c": 2}                                                                                                                                                                                                                                                                 |
            | {"a": {"b": 1, "c": 2}}                                                                                                                                                                                                     |         | false    | false       | false          | [{"path": "a.b", "value": 1}, {"path": "a.c", "value": 2}]                                                                                                                                                                                                                               |
            | {"a": {"b": 1, "c": 2}}                                                                                                                                                                                                     |         | true     | false       | true           | {"a.b": "b", "a.c": "c"}                                                                                                                                                                                                                                                                 |
            | {"a": [ {"b": 1}, {"c": 2} ]}                                                                                                                                                                                               |         | true     | false       | false          | {"a.1.b": 1, "a.2.c": 2}                                                                                                                                                                                                                                                                 |
            | {"a": [ {"b": 1}, {"c": 2} ]}                                                                                                                                                                                               |         | false    | true        | false          | ["a.1.b", "a.2.c"]                                                                                                                                                                                                                                                                       |
            | {"a": [ {"b": 1}, {"c": 2} ]}                                                                                                                                                                                               | prefix. | true     | false       | true           | {"prefix.a.1.b": "b", "prefix.a.2.c": "c"}                                                                                                                                                                                                                                               |
            | {"Profile":{"Forenames":"Alice","Initials":"A","Surname":"Smith","Email":"alice.smith@example.com","Gender":"Female","DateOfBirth":"1985-05-15","HomeNumber":"1122334455","MobileNumber":"9988776655"},"PostCode":"XY99ZZ"} |         | true     | false       | true           | {"Profile.Forenames": "Forenames","Profile.Initials": "Initials","Profile.Surname": "Surname","Profile.Email": "Email","Profile.Gender": "Gender","Profile.DateOfBirth": "DateOfBirth","Profile.HomeNumber": "HomeNumber","Profile.MobileNumber": "MobileNumber","PostCode": "PostCode"} |