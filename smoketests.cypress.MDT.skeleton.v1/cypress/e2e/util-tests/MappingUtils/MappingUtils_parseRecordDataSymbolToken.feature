@UTILTEST @MAPPINGUTILS
Feature: MappingUtils - Parse Record Data Symbol Token - parseRecordDataSymbolToken method

    Scenario: Values matching the DataSymbolToken - Replace matching tokens with 'FOUND-TOKEN'
        Given the record data contains the following values
            | key1 | [VALID]          |
            | key2 | SOME_OTHER_VALUE |
            | key3 | [UPDATEVALID]    |
            | key4 | [IGNORE]         |
            | key5 | SOME_OTHER_VALUE |
        When the parseRecordDataSymbolToken method is called
        Then the record data should be
            | key1 | FOUND-TOKEN      |
            | key2 | SOME_OTHER_VALUE |
            | key3 | FOUND-TOKEN      |
            | key4 | FOUND-TOKEN      |
            | key5 | SOME_OTHER_VALUE |

    Scenario: Values matching the DateStringToken -  Replace matching tokens with 'FOUND-TOKEN'
        Given the record data contains the following values
            | key1 | [TODAY+1YEAR]     |
            | key2 | [TOMORROW-3MONTH] |
            | key3 | [YESTERDAY+10DAY] |
            | key4 | [START-JAN-2023]  |
            | key5 | [END-DEC-2024]    |
            | key6 | [MIDDLE-DEC-2024] |
            | key7 | [SOMEDAY+1YEAR]   |
        When the parseRecordDataSymbolToken method is called
        Then the record data should be
            | key1 | FOUND-TOKEN       |
            | key2 | FOUND-TOKEN       |
            | key3 | FOUND-TOKEN       |
            | key4 | FOUND-TOKEN       |
            | key5 | FOUND-TOKEN       |
            | key6 | [MIDDLE-DEC-2024] |
            | key7 | [SOMEDAY+1YEAR]   |

    Scenario: Values matching the DynamicStringToken -  Replace matching tokens with 'FOUND-TOKEN'
        Given the record data contains the following values
            | key1 | [ALPHA-NUMERIC-10]             |
            | key2 | [SPECIAL-6]                    |
            | key3 | [ALPHA-NUMERIC-5-LINES-2]      |
            | key4 | [ALPHA-NUMERIC-PUNCTUATION-12] |
            | key5 | [SUPERDUPER-NUMERIC-5-LINES-2] |
        When the parseRecordDataSymbolToken method is called
        Then the record data should be
            | key1 | FOUND-TOKEN                    |
            | key2 | FOUND-TOKEN                    |
            | key3 | FOUND-TOKEN                    |
            | key4 | FOUND-TOKEN                    |
            | key5 | [SUPERDUPER-NUMERIC-5-LINES-2] |