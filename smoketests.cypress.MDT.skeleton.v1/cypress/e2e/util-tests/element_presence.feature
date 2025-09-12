@UTILTEST
Feature: Element Presence

  Scenario: Check if an element is present on the page
    Given I open the page "http://example.com"
    When I check for the presence of element with selector "h1"
    Then the element should be present

  Scenario: Check if an element is not present on the page
    Given I open the page "http://example.com"
    When I check for the presence of element with selector "#nonExistingElement"
    Then the element should not be present

    Scenario: Wait for an element to be present on the page
    Given I open the page "https://sit-ucascom.ucasenvironments.com/Account/Login"
    When I wait for the presence of an element with selector "#gigya-login-form > section > div > div > div > div:nth-child(6) > label"
    Then the element should be present
    
    Scenario: Wait for an element to be hidden
    Given I open the page "https://sit-ucascom.ucasenvironments.com/Account/Login"
    And I select the Register button
    When I select the Terms and Conditions Help Text
    And I unselect the Terms and Conditions Help Text
    Then the element with selector "#TermsAndConditions-aria" will become hidden