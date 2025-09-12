@UTILTEST
Feature: Date Formatting and other related utilities

    Scenario Outline: DATE-UTILS-001 - Formatting a date to a string
        Given I have the date "<Date>"
        When I format the date to a string
        Then the formatted date string should be "<Expected Date>"

        Examples:
            | Date       | Expected Date |
            | 2024-11-01 | 2024-11-01    |
            | 2024-05-15 | 2024-05-15    |

    Scenario Outline: DATE-UTILS-002 - Update format of date string
        Given I have the date string "<DateString>"
        When I update the date from "<Provided Format>" to the format "<Expected Format>"
        Then the date string returned should be "<Updated Date>"

        Examples:
            | DateString       | Provided Format | Expected Format | Updated Date     |
            | 1/05/2024        | dd/mm/yyyy      | yyyy-mm-dd      | 2024-05-1        |
            | 2024-05-15       | yyyy-mm-dd      | dd/mm/yyyy      | 15/05/2024       |
            | 2024-05-15       | yyyy-mm-dd      | Month yyyy      | May 2024         |
            | 2024-11-01       | yyyy-mm-dd      | Month yyyy      | November 2024    |
            | 15/June/2024     | dd/mm/yyyy      | yyyy-mm-dd      | 2024-June-15     |
            | 2024-November-03 | yyyy-mm-dd      | dd/mm/yyyy      | 03/November/2024 |
            | 2013-December-13 | yyyy-mm-dd      | dd/mm/yyyy      | 13/December/2013 |
            | 2013-December-13 | yyyy-mm-dd      | Month yyyy      | December 2013    |