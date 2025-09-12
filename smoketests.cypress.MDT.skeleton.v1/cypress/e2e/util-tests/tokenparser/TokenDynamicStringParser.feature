@UTILTEST
Feature: TokenDynamicStringParser String Generation

    As a developer,
    I want to validate the correct functionality of the TokenDynamicStringParser class,
    So that it can generate the expected strings based on different token formats, including multi-line strings.

    Scenario Outline: TOKENPARSER-DYNAMICSTRING-001 - Generate string based on token input
        Given a token "<token>"
        When I parse and generate the string
        Then the generated string should have a length of <length>
        And the generated string should match the character set "<characterSet>"
        And the generated string should have <lines> lines

        Examples:
            | token                          | length | characterSet              | lines |
            | [ALPHA-5]                      | 5      | ALPHA                     | 1     |
            | [NUMERIC-5]                    | 5      | NUMERIC                   | 1     |
            | [ALPHA-NUMERIC-10]             | 10     | ALPHA_NUMERIC             | 1     |
            | [NUMERIC-ALPHA-20]             | 20     | ALPHA_NUMERIC             | 1     |
            | [ALPHA-NUMERIC-PUNCTUATION-12] | 12     | ALPHA_NUMERIC_PUNCTUATION | 1     |
            | [SPECIAL-6]                    | 6      | SPECIAL                   | 1     |
            | [ALPHA-PUNCTUATION-8]          | 8      | ALPHA_PUNCTUATION         | 1     |
            | [PUNCTUATION-ALPHA-123]        | 123    | ALPHA_PUNCTUATION         | 1     |
            | [ALPHA-NUMERIC-SPECIAL-15]     | 15     | ALPHA_NUMERIC_SPECIAL     | 1     |
            | [ALPHA-5-LINES-3]              | 15     | ALPHA                     | 3     |
            | [NUMERIC-4-LINES-4]            | 16     | NUMERIC                   | 4     |
            | [ALPHA-NUMERIC-5-LINES-2]      | 10     | ALPHA_NUMERIC             | 2     |
            | [SPECIAL-ALL]                  | 24     | SPECIAL                   | 1     |
            | [PUNCTUATION-ALL]              | 6      | PUNCTUATION               | 1     |
            | [SPECIAL-PUNCTUATION-ALL]      | 30     | SPECIAL_PUNCTUATION       | 1     |
