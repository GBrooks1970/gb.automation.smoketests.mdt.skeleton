@UTILTEST @ALL_Scenario_Context_Management @scenario_context_TOPAZ
Feature: A User can search for an applicant
    As a Topaz User
    I want to be able to search for an applicant
    So that I can review their application details

    Background:
        Given I have a TOPAZ registered Valid user that is signed in - scenario_context_TOPAZ
        And the User Navigates to the Topaz Application Enquiry Page - scenario_context_TOPAZ

    @runBeforeHook_Scenario_Context_Management_AA_001
    Scenario Outline: Scenario_Context_Management-AA-001 - A Topaz User can search for an Application under the UCAS or CUKAS Scheme
        When the User Enquires About an Existing Application - scenario_context_TOPAZ
            | PID   | Scheme   | Profile.Surname   | Profile.Email   | Profile.HomeNumber   | Profile.Forenames   | Profile.Initials   | Profile.Gender   | Profile.DateOfBirth   | Profile.MobileNumber   | PostCode   |
            | <PID> | <Scheme> | <Profile.Surname> | <Profile.Email> | <Profile.HomeNumber> | <Profile.Forenames> | <Profile.Initials> | <Profile.Gender> | <Profile.DateOfBirth> | <Profile.MobileNumber> | <PostCode> |
        Then the Applicant Returned Has the Expected Details - scenario_context_TOPAZ
        And FINALLY the User signs out - scenario_context_TOPAZ

        Examples:
            | PID     | Scheme | Profile.Surname | Profile.Email | Profile.HomeNumber | Profile.Forenames | Profile.Initials | Profile.Gender | Profile.DateOfBirth | Profile.MobileNumber | PostCode |
            | [VALID] | UCAS   | [BLANK]         | [BLANK]       | [BLANK]            | [BLANK]           | [BLANK]          | [BLANK]        | [BLANK]             | [BLANK]              | [BLANK]  |
            | [BLANK] | UCAS   | [BLANK]         | [BLANK]       | [BLANK]            | [VALID]           | [BLANK]          | [BLANK]        | [BLANK]             | [BLANK]              | [BLANK]  |
            | [BLANK] | UCAS   | [BLANK]         | [BLANK]       | [BLANK]            | [BLANK]           | [BLANK]          | [BLANK]        | [BLANK]             | [VALID]              | [BLANK]  |
            | [BLANK] | CUKAS  | [VALID]         | [BLANK]       | [BLANK]            | [BLANK]           | [BLANK]          | [BLANK]        | [BLANK]             | [BLANK]              | [BLANK]  |
            # | [BLANK] | CUKAS  | [BLANK]         | [BLANK]       | [BLANK]            | [BLANK]           | [VALID]          | [BLANK]        | [BLANK]             | [BLANK]              | [BLANK]  |
            # | [BLANK] | CUKAS  | [BLANK]         | [BLANK]       | [BLANK]            | [BLANK]           | [BLANK]          | [BLANK]        | [BLANK]             | [BLANK]              | [VALID]  |
            # | [BLANK] | CUKAS  | [VALID]         | [BLANK]       | [VALID]            | [BLANK]           | [VALID]          | [BLANK]        | [VALID]             | [BLANK]              | [VALID]  |
            # | [VALID] | CUKAS  | [BLANK]         | [VALID]       | [BLANK]            | [VALID]           | [BLANK]          | [VALID]        | [BLANK]             | [VALID]              | [VALID]  |
            | [BLANK] | GTTR   | [BLANK]         | [VALID]       | [BLANK]            | [BLANK]           | [BLANK]          | [BLANK]        | [BLANK]             | [BLANK]              | [BLANK]  |
            # | [BLANK] | GTTR   | [BLANK]         | [BLANK]       | [VALID]            | [BLANK]           | [BLANK]          | [BLANK]        | [BLANK]             | [BLANK]              | [BLANK]  |
            # | [BLANK] | GTTR   | [BLANK]         | [BLANK]       | [BLANK]            | [BLANK]           | [BLANK]          | [VALID]        | [BLANK]             | [BLANK]              | [BLANK]  |
            # | [BLANK] | GTTR   | [BLANK]         | [BLANK]       | [BLANK]            | [BLANK]           | [BLANK]          | [BLANK]        | [VALID]             | [BLANK]              | [BLANK]  |