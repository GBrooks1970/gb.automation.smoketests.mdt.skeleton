Feature: User Site Sign-in
        In order to restrict access to the site
        And identify myself
        As a registered user
        I want to be able to sign-in to the site with my credentials
        or
        As a registered user
        I want to be able to sign-in to the site with my credentials
        So that access is restricted to the site
        And I identify myself


    Background:

    @runBeforeHook_SetUserList_OnlyOnce_SHARED-SERVICES-SIGN-IN-A-001
    Scenario Outline: SHARED-SERVICES-SIGN-IN-A-001 - Multiple Registered User Login
        Given I have a registered '<UserType>' user with valid credentials
        And The User navigates to the Sign-in Page
        And The User selects 'Accept all' on the Cookie Popup
        And The User's email '<EmailAddress>' is entered
        And The User's password '<Password>' is entered
        When The User clicks the Sign-in button
        Then The User should be signed in and redirected to their '<UserType>' Landing Page
        And finally The User navigates to the Sign-out Page, waiting to be fully signed out

        Examples:
            | UserType | EmailAddress | Password | UserTypeLandingPage |
            | Student  | [VALID]      | [VALID]  | StudentLandingPage  |
            | Adviser  | [VALID]      | [VALID]  | AdviserLandingPage  |
            | Provider | [VALID]      | [VALID]  | ProviderLandingPage |
            | Employer | [VALID]      | [VALID]  | EmployerLandingPage |
            | UCAS     | [VALID]      | [VALID]  | UCASLandingPage     |

    @runBeforeHook_SetUserList_OnlyOnce_SHARED-SERVICES-SIGN-IN-A-002
    Scenario: SHARED-SERVICES-SIGN-IN-A-002 - Unsuccessful login with invalid credentials
        Given I have a unregistered user with invalid credentials
        And The User navigates to the Sign-in Page
        And The User selects 'Accept all' on the Cookie Popup 
        And The User enters their credentials
        When The User clicks the Sign-in button
        Then The User should not be signed in and the Sign-in Error Message should be displayed
