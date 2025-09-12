# tokenparser (cypress/support/utils/tokenparser)

Small helpers to parse and replace token placeholders in strings/objects used by tests (dates, dynamic values, env refs).

## Files

- TokenDateParser.ts  
  - Purpose: parse and replace date-related tokens (e.g. {{TODAY}}, {{TODAY+3:YYYY-MM-DD}}, relative offsets and formatting).  
  - Use: call to produce concrete date strings for fixtures or assertions; e.g. TokenDateParser.parseString("due {{TODAY+7}}").

- TokenDynamicStringParser.ts  
  - Purpose: parse and replace dynamic tokens (random ids, environment variables, seeded values, references).  
  - Use: use to inject runtime values into fixtures or test payloads; e.g. TokenDynamicStringParser.parseString("user-{{RAND:6}}-{{ENV:TEST_ID}}").

- README.md  
  - This file: quick index and usage notes.

## Quick usage

- Import and run on strings or objects:
  - TS: `import TokenDateParser from './tokenparser/TokenDateParser';`  
    `TokenDateParser.parseString("start: {{TODAY:YYYY-MM-DD}}");`
  - TS: `import TokenDynamicStringParser from './tokenparser/TokenDynamicStringParser';`  
    `TokenDynamicStringParser.parseObject(payload, { env: process.env });`

Keep parsers pure where possible — run replacements during fixture construction or test setup to keep assertions deterministic.
