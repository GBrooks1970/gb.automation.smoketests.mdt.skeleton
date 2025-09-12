@UTILTEST
Feature: Flatten a Complex Data object with multiple lists
        To generate a ComplexObjects List With Index
        Use ComplexObjects List With Index in a Data Picker Selection Examples

  @runBeforeHook
  Scenario: DATA-PICKER-EXAMPLE-001 - Flatten a Complex Data object and then Select a random member without repetition
    Given there is a ParentComplexData with multiple properties that are lists
    And the ParentComplexData is flattened to generate a ComplexObjects List With Index
    And a DataPicker is created to iterate the ComplexObjects List With Index
    When I request a random member multiple times - members list count times
    Then each member should be unique

  @runBeforeHook
  Scenario: DATA-PICKER-EXAMPLE-002 - Flatten a Complex Data object and then Select next member without repetition
    Given there is a ParentComplexData with multiple properties that are lists
    And the ParentComplexData is flattened to generate a ComplexObjects List With Index
    And a DataPicker is created to iterate the ComplexObjects List With Index
    When I request the next member in list multiple times - members list count times
    Then each member should be unique


  @runBeforeHook
  Scenario: DATA-PICKER-EXAMPLE-003 - Flatten and Ramdomize a Complex Data object and then Select next member without repetition
    Given there is a ParentComplexData with multiple properties that are lists
    And the ParentComplexData is ramdomized and flattened to generate a ComplexObjects List With Index
    And a DataPicker is created to iterate the ComplexObjects List With Index
    When I request the next member in list multiple times - members list count times
    Then each member should be unique
