@UTILTEST
Feature: env-data Fixture Data Loading Test

  Scenario: DATA-LOADING-TEST-001 - Loading specific data from the fixture file
    Given I have loaded the data for the env-data fixture file
    Then I should have access to the name "EnvironmentName"

  Scenario: DATA-LOADING-TEST-002 -Retrieve the 'accountLogin' endpoint
    Given I have the fixture file with endpoints
    When I call the getEndpoint method with "accountLogin"
    Then I should receive the value "Account/Login"

  Scenario: DATA-LOADING-TEST-003 -Retrieve the 'accountLogout' endpoint
    Given I have the fixture file with endpoints
    When I call the getEndpoint method with "accountLogout"
    Then I should receive the value "Account/Logout"

  Scenario: DATA-LOADING-TEST-004 - Loading specific user data from the fixture file using getUserByUsername
    Given I have loaded the data for the env-data fixture file
    When I call the getUserByUsername method with "UCAS Admin User"
    Then the UserData object should be '{\"username\":\"UCAS Admin User\",\"email\":\"bbtsuperuser@ucas.ac.uk\",\"password\":\"F1ndMyBugz!\",\"passwordChange\":\"UCASpa$$w0rd002!\",\"userType\":\"UCAS\"}'

  Scenario Outline: DATA-LOADING-TEST-005 - Loading specific named user from the fixture file using fromFixture
    Given I have loaded the data for the env-data fixture file
    When I initialize a User object with the fromFixture method with <username>
    Then the UserData object should be <JSONObject>

    Examples:
      | username          | JSONObject                                                                                                                                                            |
      | "UCAS Admin User" | "{\"username\":\"UCAS Admin User\",\"email\":\"bbtsuperuser@ucas.ac.uk\",\"password\":\"F1ndMyBugz!\",\"passwordChange\":\"UCASpa$$w0rd002!\",\"userType\":\"UCAS\"}" |
