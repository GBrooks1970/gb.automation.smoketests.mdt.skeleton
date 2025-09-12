import { Given, When, Then, Before, After } from "@badeball/cypress-cucumber-preprocessor";
import CommonUtils from "../../../utils/common-utils";
import { TokenDynamicStringParser } from '../../../utils/tokenparser/TokenDynamicStringParser';

let generatedString: string;
let token: string;

Given('a token {string}', (inputToken: string) => {
    token = inputToken;
});

When('I parse and generate the string', () => {
    generatedString = TokenDynamicStringParser.parseAndGenerate(token);
});

Then('the generated string should have a length of {int}', (expectedLength: number) => {
    expect(generatedString.replace(/\r\n/g, '').length).to.equal(expectedLength);
});

Then('the generated string should match the character set {string}', (characterSet: string) => {
    let regex: RegExp;
    switch (characterSet) {
        case 'ALPHA':
            regex = /^[A-Za-z\r\n]+$/;
            break;
        case 'NUMERIC':
            regex = /^[0-9\r\n]+$/;
            break;
        case 'ALPHA_NUMERIC':
            regex = /^[A-Za-z0-9\r\n]+$/;
            break;
        case 'ALPHA_NUMERIC_PUNCTUATION':
            regex = /^[A-Za-z0-9.,!?;:\r\n]+$/;
            break;
        case 'SPECIAL':
            regex = /^[!@#$%^&*()_+\[\]{}|;:,.<>?\r\n]+$/;
            break;
        case 'ALPHA_PUNCTUATION':
            regex = /^[A-Za-z.,!?;:\r\n]+$/;
            break;
        case 'PUNCTUATION':
            regex = /^[.,!?;:\r\n]+$/;
            break;
        case 'SPECIAL_PUNCTUATION':
            regex = /^[!@#$%^&*()_+\[\]{}|;:,.<>?.,!?;:\r\n]+$/;
            break;
        case 'ALPHA_NUMERIC_SPECIAL':
            regex = /^[A-Za-z0-9!@#$%^&*()_+\[\]{}|;:,.<>?\r\n]+$/;
            break;
        default:
            throw new Error(`Unknown character set: ${characterSet}`);
    };
    expect(generatedString).to.match(regex);
});

Then('the generated string should have {int} lines', (expectedLines: number) => {
    const lines = generatedString.split('\r\n');
    expect(lines.length).to.equal(expectedLines);
});