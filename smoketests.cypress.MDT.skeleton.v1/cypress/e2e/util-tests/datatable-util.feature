@UTILTEST
Feature: Convert Cypress DataTable to Indexed Object

    Scenario: DATATABLE-TESTS-001 - Convert a given DataTable to an array of indexed objects
        Given a DataTable with headers and rows
        When the ConvertToIndexedObject method is called
        Then the returned object should be an array of indexed objects representing the DataTable

    Scenario:  DATATABLE-TESTS-002 - Hashes method of a given Cypress DataTable is an array of indexed objects
        Given a DataTable with headers and rows like
            | header1     | header2     |
            | row 1 col 1 | row 1 col 2 |
            | row 2 col 1 | row 2 col 2 |
        When the DataTable.Hashes method is called
        Then the returned object should be an array of indexed objects representing the given DataTable

    Scenario: Transpose a DataTable
        Given I have a data table
            | A | B | C |
            | 1 | 2 | 3 |
            | X | Y | Z |
        When I transpose the data table
        Then the transposed table should be
            | A | 1 | X |
            | B | 2 | Y |
            | C | 3 | Z |

    Scenario: Transpose a DataTable with inbuilt function
        Given I have a data table
            | A | B | C | D |
            | 1 | 2 | 3 | 4 |
            | W | X | Y | Z |
        When I transpose the data table with inbuilt function
        Then the transposed table should be
            | A | 1 | W |
            | B | 2 | X |
            | C | 3 | Y |
            | D | 4 | Z |