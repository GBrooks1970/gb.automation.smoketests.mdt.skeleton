@UTILTEST
Feature: User object created with fromFixture method

  Scenario: USER-FROMFIXTURE-001 - Create a UCAS Admin User using the fromFixture method
    Given I am a UCAS Admin User object created with fromFixture method
    When I display The User credentials
    Then the UserData object fromFixture method should match this <JSONObject>
    And the two objects should be considered deeply equal

    Examples:
      | username          | JSONObject                                                                                                                                                            |
      | "UCAS Admin User" | "{\"username\":\"UCAS Admin User\",\"email\":\"bbtsuperuser@ucas.ac.uk\",\"password\":\"F1ndMyBugz!\",\"passwordChange\":\"UCASpa$$w0rd002!\",\"userType\":\"UCAS\"}" |

  Scenario: USER-FROMFIXTURE-002 - Create a User from a matching Username in the fixture file
    Given I am a specific <username> User object created with fromFixture method
    When I display The User credentials
    Then the UserData object fromFixture method should match this <JSONObject>
    And the two objects should be considered deeply equal

    Examples:
      | username              | JSONObject                                                                                                                                                                                   |
      | "Student.userType001" | "{\"username\":\"Student.userType001\",\"email\":\"student.usertype001@mailinator.com\",\"password\":\"UCASpa$$w0rd001!\",\"passwordChange\":\"UCASpa$$w0rd002!\",\"userType\":\"Student\"}" |
      | "Student.userType002" | "{\"username\":\"Student.userType002\",\"email\":\"student.usertype002@mailinator.com\",\"password\":\"UCASpa$$w0rd001!\",\"passwordChange\":\"UCASpa$$w0rd002!\",\"userType\":\"Student\"}" |
      | "Student.userType004" | "{\"username\":\"Student.userType004\",\"email\":\"student.usertype004@mailinator.com\",\"password\":\"Blandpassword1!\",\"passwordChange\":\"Blandpassword02!\",\"userType\":\"Student\"}"  |

  Scenario Outline: USER-FROMFIXTURE-003 - Create a User without using the fromFixture method
    Given I am a User object created without the fromFixture method
    When I display The User credentials
    Then the UserData object fromFixture method should match this <JSONObject>
    And the two objects should be considered deeply equal
    Examples:
      | username          | JSONObject                                                                                                                                                                                 |
      | "InvalidUsername" | "{\"username\":\"InvalidUsername\",\"email\":\"InvalidEmail@example.com\",\"password\":\"InvalidPassword\",\"passwordChange\":\"InvalidPasswordChange\",\"userType\":\"InvalidUserType\"}" |

@runBeforeHook_SetUserList_OnlyOnce_USER-FROMFIXTURE-004
Scenario Outline: USER-FROMFIXTURE-004 - Create a random valid User Object using the fromFixture method
  Given I create a '<randomvaliduser>' User object with fromFixture method
  When I display The User credentials
  Then the UserData object that is unique each time

  Examples:
    | randomvaliduser |
    | [VALID]         |
    | [VALID]         |
    | [VALID]         |
    | [VALID]         |