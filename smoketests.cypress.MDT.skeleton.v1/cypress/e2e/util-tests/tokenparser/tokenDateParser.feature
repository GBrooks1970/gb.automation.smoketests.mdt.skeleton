@UTILTEST
Feature: Parsing dates from token format strings using TokenDateParser

    In order to accurately compute dates from token format strings
    As a user of the TokenDateParser class
    I want to be able to input a variety of token strings and get the correct date output

    Scenario: TOKENPARSER-DATE-001 - Parsing today - [STARTDATE][+ve/-ve][DATEPART][+ve/-ve][DATEPART][+ve/-ve][DATEPART]
        Given I have a date token "[TODAY]"
        When I parse the token
        Then the result should be today's date

    Scenario: TOKENPARSER-DATE-002 - Parsing tomorrow - [STARTDATE][+ve/-ve][DATEPART][+ve/-ve][DATEPART][+ve/-ve][DATEPART]
        Given I have a date token "[TOMORROW]"
        When I parse the token
        Then the result should be tomorrow's date

    Scenario: TOKENPARSER-DATE-003 - Parsing yesterday - [STARTDATE][+ve/-ve][DATEPART][+ve/-ve][DATEPART][+ve/-ve][DATEPART]
        Given I have a date token "[YESTERDAY]"
        When I parse the token
        Then the result should be yesterday's date

    Scenario: TOKENPARSER-DATE-004 - Parsing today minus two year and four month - [STARTDATE][+ve/-ve][DATEPART][+ve/-ve][DATEPART][+ve/-ve][DATEPART]
        Given I have a date token "[TODAY-2YEAR-4MONTH]"
        When I parse the token
        Then the result should be today's date minus two year and four month

    Scenario: TOKENPARSER-DATE-005 - Parsing today minus one year and one month - [STARTDATE][+ve/-ve][DATEPART][+ve/-ve][DATEPART][+ve/-ve][DATEPART]
        Given I have a date token "[TODAY-1YEAR-1MONTH]"
        When I parse the token
        Then the result should be today's date minus one year and one month

    Scenario: TOKENPARSER-DATE-006 - Parsing today minus one year, two months, and three days - [STARTDATE][+ve/-ve][DATEPART][+ve/-ve][DATEPART][+ve/-ve][DATEPART]
        Given I have a date token "[TODAY-1YEAR-2MONTH-3DAY]"
        When I parse the token
        Then the result should be today's date minus one year, two months, and three days

    Scenario: TOKENPARSER-DATE-007 - Parsing today plus one year, minus one month, and plus one day - [STARTDATE][+ve/-ve][DATEPART][+ve/-ve][DATEPART][+ve/-ve][DATEPART]
        Given I have a date token "[TODAY+1YEAR-1MONTH+1DAY]"
        When I parse the token
        Then the result should be today's date plus one year, minus one month, and plus one day

    Scenario: TOKENPARSER-DATE-008 - Parsing today minus one year and one month with regex - [STARTDATE][+ve/-ve][DATEPART][+ve/-ve][DATEPART][+ve/-ve][DATEPART]
        Given I have a date token "[TODAY-1YEAR-1MONTH]"
        When I parse the token
        Then the result should be today's date minus one year and one month

    Scenario: TOKENPARSER-DATE-009 - Parsing today plus two years - [STARTDATE][+ve/-ve][DATEPART][+ve/-ve][DATEPART][+ve/-ve][DATEPART]
        Given I have a date token "[TODAY+2YEAR]"
        When I parse the token
        Then the result should be today's date plus two years

    Scenario: TOKENPARSER-DATE-010 - Parsing today plus five months - [STARTDATE][+ve/-ve][DATEPART][+ve/-ve][DATEPART][+ve/-ve][DATEPART]
        Given I have a date token "[TODAY+5MONTH]"
        When I parse the token
        Then the result should be today's date plus five months

    Scenario: TOKENPARSER-DATE-011 - Parsing tomorrow plus five months - [STARTDATE][+ve/-ve][DATEPART][+ve/-ve][DATEPART][+ve/-ve][DATEPART]
        Given I have a date token "[TOMORROW+5MONTH]"
        When I parse the token
        Then the result should be tomorrow's date plus five months

    Scenario: TOKENPARSER-DATE-012 - Parsing yesterday plus five months and minus one year - [STARTDATE][+ve/-ve][DATEPART][+ve/-ve][DATEPART][+ve/-ve][DATEPART]
        Given I have a date token "[YESTERDAY+5MONTH-1YEAR]"
        When I parse the token
        Then the result should be yesterday's date plus five months and minus one year

    Scenario: TOKENPARSER-DATE-013 - Handling null or invalid token input - [STARTDATE][+ve/-ve][DATEPART][+ve/-ve][DATEPART][+ve/-ve][DATEPART]
        Given I have an invalid date range string "INVALID-TOKEN"
        When I parse the token
        Then an error should be thrown with message "Invalid date token format: INVALID-TOKEN"

    Scenario Outline: TOKENPARSER-DATE-014 - Parsing several instances of a second format of date string tokens - [MONTHENDSTART][MONTH][YEAR]
        Given I have a date string "<dateStringToken>"
        When I parse the date string token
        Then the result should be "<expectedDate>"

        Examples:
            | dateStringToken       | expectedDate |
            | [START-JANUARY-2024]  | 2024-01-01   |
            | [END-FEBRUARY-2024]   | 2024-02-29   |
            | [END-FEBRUARY-2022]   | 2022-02-28   |
            | [END-OCTOBER-2020]    | 2020-10-31   |
            | [START-DECEMBER-2000] | 2000-12-01   |
            | [END-JUNE-2025]       | 2025-06-30   |

    Scenario Outline: TOKENPARSER-DATE-015 - Parsing several instances of date range token strings - [MONTHENDSTART][MONTH][YEAR]<->[MONTHENDSTART][MONTH][YEAR]
        Given I have a date range string "<dateRangeTokenString>"
        When I parse the date range string
        Then the start date should be "<StartDate>" and the end date should be "<EndDate>"

        Examples:
            | dateRangeTokenString                     | StartDate  | EndDate    |
            | [START-JANUARY-2024<->END-FEBRUARY-2024] | 2024-01-01 | 2024-02-29 |
            | [END-OCTOBER-2020<->END-FEBRUARY-2022]   | 2020-10-31 | 2022-02-28 |
            | [START-DECEMBER-2021<->END-JUNE-2025]    | 2021-12-01 | 2025-06-30 |
            | [START-JULY-2021<->START-MARCH-2023]     | 2021-07-01 | 2023-03-01 |