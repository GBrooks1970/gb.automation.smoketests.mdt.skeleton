Feature: Fetch and Print Grid from Table
  As a user
  I want to fetch a grid of characters from a table in a webpage
  So that I can verify the grid is correctly parsed and displayed

  Scenario: Fetch and print a grid of characters from a valid URL
    Given a valid URL is fixedURL
    When I fetch and parse the grid from the table
    Then the grid should be printed as:
      """
      █
      █▀
      █▀▀
      """

  # Scenario: Handle a URL with no table
  #   Given a valid URL "https://example.com/no-table"
  #   When I fetch and parse the grid from the table
  #   Then an error message "No table found in the document." should be displayed
