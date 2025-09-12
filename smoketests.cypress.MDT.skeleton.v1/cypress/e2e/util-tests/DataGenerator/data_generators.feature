Feature: Random Data Generators
    As a developer
    I want to test all random data generators
    So that I can ensure they produce objects of the expected structure

    Scenario Outline: Validate structure of generated data
        Given I generate data using the "<generator>"
        Then the generated object should match the structure of "<interface>"

        Examples:
            | generator                                | interface                      |
            | generateRandomBaseAddress                | BaseAddress                    |
            | generateRandomUkAddress                  | UkAddress                      |
            | generateRandomBFPOAddress                | BFPOAddress                    |
            | generateRandomUkAddressWithCountry       | UkAddressWithCountry           |
            | generateRandomTopazApplicantProfile      | TopazApplicantProfile          |
            | generateRandomTopazQualification         | TopazQualification             |
            | generateRandomTopazReferenceDetails      | TopazReferenceDetails          |
            | generateRandomTopazApplicantOtherDetails | TopazApplicantOtherDetails     |
            | generateRandomTopazApplicant             | TopazApplicant                 |
            | generateMoreAboutYouAndExtraActivities   | MoreAboutYouAndExtraActivities |
