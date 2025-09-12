import CommonUtils from "../common-utils";
import { SymbolsDS } from "../symbol-consts";

/*
Utility class that parses tokens with the specified format and generates a string based on the inputted token. 
The token can have combinations of ALPHA, NUMERIC, PUNCTUATION, and SPECIAL, 
followed by a number that specifies the length of the string to be generated.
*/
export class TokenDynamicStringParser {
    // Character sets for different token types
    private static readonly ALPHA_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    private static readonly NUMERIC_CHARS = '0123456789';
    private static readonly PUNCTUATION_CHARS = '.,!?;:';
    private static readonly SPECIAL_CHARS = '!@#$%^&*()_+[]{}|;:,.<>?';

    static isValidDynamicStringToken(token: string): boolean {
        try {
            const match = token.match(SymbolsDS.DynamicStringRegex);
            if (match && match.groups) {
                return true;
            }
        } catch (error) {
            console.log(`${this.isValidDynamicStringToken.name}: ERROR VALIDATING TOKEN DYNAMIC STRING ${token} : ${error}`);
            return false;
        }
        return false;
    }

    private static tryParseInt(value : string):number{
        const _val = parseInt(value, 10);      
        return Number.isNaN(_val) ? 0 : _val;
    }

    public static parseAndGenerate(token: string): string {
        const match = token.match(SymbolsDS.DynamicStringRegex);
        if (!match || !match.groups) {
            throw new Error(`${TokenDynamicStringParser.name} : Invalid dynamic string token format: ${token}`);
        }

        const { types, length, lines } = match.groups;
        // types - // ALPHA, NUMERIC, PUNCTUATION, SPECIAL
        // length - amount of characters on one line
        // lines - line count - Default to 1 line if LINES-XXX is not provided
        const lengthNum = this.tryParseInt(length); // ALL or 0 will produce 0, which means ALL Characters
        const linesNum = lines ? parseInt(lines, 10) : 1; // Default to 1 line if LINES-XXX is not provided

        console.log(`TOKEN ${token} : types ${CommonUtils.toJSONString(types)}`);
        console.log(`TOKEN ${token} : length ${CommonUtils.toJSONString(length)}`);
        console.log(`TOKEN ${token} : lines ${CommonUtils.toJSONString(lines)}`);

        console.log(`TOKEN ${token} : lengthNum ${CommonUtils.toJSONString(lengthNum)}`);
        console.log(`TOKEN ${token} : linesNum ${CommonUtils.toJSONString(linesNum)}`);

        if (lengthNum < 0) {
            throw new Error(`${TokenDynamicStringParser.name} : Invalid length in token: ${token}`);
        }
        if (linesNum <= 0) {
            throw new Error(`${TokenDynamicStringParser.name} : Invalid line count in token: ${token}`);
        }

        // Determine the character set based on the token types
        let charSet = '';
        types.split('-').forEach(type => {
            switch (type) {
                case SymbolsDS.ALPHA:
                    charSet += TokenDynamicStringParser.ALPHA_CHARS;
                    break;
                case SymbolsDS.NUMERIC:
                    charSet += TokenDynamicStringParser.NUMERIC_CHARS;
                    break;
                case SymbolsDS.PUNCTUATION:
                    charSet += TokenDynamicStringParser.PUNCTUATION_CHARS;
                    break;
                case SymbolsDS.SPECIAL:
                    charSet += TokenDynamicStringParser.SPECIAL_CHARS;
                    break;
            }
        });

        console.log(`TOKEN ${token} : charSet '${CommonUtils.toJSONString(charSet)}'`);

        if (charSet === '') {
            throw new Error(`${TokenDynamicStringParser.name} : No valid character types found in token: ${token}`);
        }

        let result = '';
        for (let line = 0; line < linesNum; line++) {
            let lineResult = '';
            if (lengthNum == 0) {
                console.log(`TOKEN ${token} : ALL charSet '${CommonUtils.toJSONString(charSet)}'`);
        
                lineResult += charSet;
            }
            else {
                for (let i = 0; i < lengthNum; i++) {
                    const randomIndex = Math.floor(Math.random() * charSet.length);
                    lineResult += charSet[randomIndex];
                }
            }

            console.log(`TOKEN ${token} : Generated string LINE[${line}]'${CommonUtils.toJSONString(lineResult)}'`);

            result += lineResult;
            if (line < linesNum - 1) {
                result += '\r\n'; // Add carriage return and line feed between lines
            }
        }


        console.log(`TOKEN ${token} : Generated string '${CommonUtils.toJSONString(result)}'`);
        return result;
    }
}
