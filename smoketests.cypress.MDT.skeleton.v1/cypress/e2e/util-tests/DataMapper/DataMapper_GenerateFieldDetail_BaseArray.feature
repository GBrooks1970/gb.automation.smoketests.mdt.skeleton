@UTILTEST @DATAMAPPER
Feature: DataMapper - Generate FieldDetails Array Methods
    As a developer
    I want to test the specific DataMapper utility methods
    So that I can ensure the correct FieldDetails Array is generated.


    Scenario Outline: DATAMAPPER-FIELDDETAILS-001 - DataMapper method GenerateFieldDetail_BaseArray processes various input objects correctly
        Given an generic input object:
            """
            <inputObject>
            """
        And a default selector: "<selector>"
        And a default valueType: "<valueType>"
        When I call the GenerateFieldDetail_BaseArray method
        Then the generated FieldDetail_Base array should be:
            """
            <expectedResult>
            """

        Examples:
            | inputObject                                                                                           | selector | valueType      | expectedResult                                                                                                                                                                                                                                                                                      |
            | {"Employee": {"Name": "John", "ID": 123}, "Department": "HR"}                                         | ""       | ""             | [{"Name":"Employee.Name","Selector":"","ValueType":""},{"Name":"Employee.ID","Selector":"","ValueType":""},{"Name":"Department","Selector":"","ValueType":""}]                                                                                                                                      |
            | {"Skills": [{"Type": "Programming", "Level": "Expert"}, {"Type": "Design", "Level": "Intermediate"}]} | "#input" | "AlphaNumeric" | [{"Name":"Skills.1.Type","Selector":"#input","ValueType":"AlphaNumeric"},{"Name":"Skills.1.Level","Selector":"#input","ValueType":"AlphaNumeric"},{"Name":"Skills.2.Type","Selector":"#input","ValueType":"AlphaNumeric"},{"Name":"Skills.2.Level","Selector":"#input","ValueType":"AlphaNumeric"}] |

    Scenario Outline: DATAMAPPER-FIELDDETAILS-002 - DataMapper method GenerateFieldDetailsArray processes input objects with provided templates correctly
        Given an generic input object:
            """
            <inputObject>
            """
        And an option template:
            """
            <optionTemplate>
            """
        When I call the GenerateFieldDetailsArray method
        Then the generated FieldDetails array should be:
            """
            <expectedResult>
            """

        Examples:
            | inputObject                                                                                           | optionTemplate                                                                                                                                          | expectedResult                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
            | {"Employee": {"Name": "John", "ID": 123}, "Department": "HR"}                                         | {"Selector": "default", "ValueType": "string"}                                                                                                          | [{"Name":"Employee.Name","Selector":"default","ValueType":"string"},{"Name":"Employee.ID","Selector":"default","ValueType":"string"},{"Name":"Department","Selector":"default","ValueType":"string"}]                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
            | {"Skills": [{"Type": "Programming", "Level": "Expert"}, {"Type": "Design", "Level": "Intermediate"}]} | {"Selector": "input", "ValueType": "text"}                                                                                                              | [{"Name":"Skills.1.Type","Selector":"input","ValueType":"text"},{"Name":"Skills.1.Level","Selector":"input","ValueType":"text"},{"Name":"Skills.2.Type","Selector":"input","ValueType":"text"},{"Name":"Skills.2.Level","Selector":"input","ValueType":"text"}]                                                                                                                                                                                                                                                                                                                                                                                             |
            | {"Skills": [{"Type": "Programming", "Level": "Expert"}, {"Type": "Design", "Level": "Intermediate"}]} | {"Selector": "input", "ValueType": "text", "AssertionProcess" :"WithinPageElement", "AssertionTarget":"value","AssertionType":"equal"}                  | [{"Selector": "input","ValueType": "text","AssertionProcess": "WithinPageElement","AssertionTarget": "value","AssertionType": "equal","Name": "Skills.1.Type"},{"Selector": "input","ValueType": "text","AssertionProcess": "WithinPageElement","AssertionTarget": "value","AssertionType": "equal","Name": "Skills.1.Level"},{"Selector": "input","ValueType": "text","AssertionProcess": "WithinPageElement","AssertionTarget": "value","AssertionType": "equal","Name": "Skills.2.Type"},{"Selector": "input","ValueType": "text","AssertionProcess": "WithinPageElement","AssertionTarget": "value","AssertionType": "equal","Name": "Skills.2.Level"}] |
            | {"Skills": [{"Type": "Programming", "Level": "Expert"}, {"Type": "Design", "Level": "Intermediate"}]} | {"Name":"ignored","Selector": "input", "ValueType": "text", "AssertionProcess" :"WithinPageElement", "AssertionTarget":"value","AssertionType":"equal"} | [{"Selector": "input","ValueType": "text","AssertionProcess": "WithinPageElement","AssertionTarget": "value","AssertionType": "equal","Name": "Skills.1.Type"},{"Selector": "input","ValueType": "text","AssertionProcess": "WithinPageElement","AssertionTarget": "value","AssertionType": "equal","Name": "Skills.1.Level"},{"Selector": "input","ValueType": "text","AssertionProcess": "WithinPageElement","AssertionTarget": "value","AssertionType": "equal","Name": "Skills.2.Type"},{"Selector": "input","ValueType": "text","AssertionProcess": "WithinPageElement","AssertionTarget": "value","AssertionType": "equal","Name": "Skills.2.Level"}] |
