Feature: User Site Sign-Out
    In order to restrict access to the site
    And identify myself
    As a registered user
    I want to be able to sign-out of the site and terminate my session


  Background:


  @runBeforeHook_SetUserList_OnlyOnce_SHARED-SERVICES-SIGN-OUT-A-001
  Scenario: SHARED-SERVICES-SIGN-OUT-A-001 - Successful Sign-out
    Given I have a DEFAULT registered Valid user that is signed in
    When I click the Sign-out button
    Then after waiting for process to complete, I should be be fully signed out

  @runBeforeHook_SetUserList_OnlyOnce_SHARED-SERVICES-SIGN-OUT-A-001
  Scenario: SHARED-SERVICES-SIGN-OUT-A-002 - Ensure session is terminated after Sign-out
    Given I have a DEFAULT registered Valid user that is signed in
    When I click the Sign-out button
    And after waiting for process to complete, I should be be fully signed out
    And I navigate to the dashboard page
    Then I should be redirected to the Sign-in page