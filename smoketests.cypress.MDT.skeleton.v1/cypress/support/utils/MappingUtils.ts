import { DataTable } from "@badeball/cypress-cucumber-preprocessor";
import { DTO_ApplicationDetail } from "./env/TopazData";
import { TopazApplicant } from "./env/TopazData_TopazApplicant";
import CommonUtils from "./common-utils";
import { TokenDateParser } from "./tokenparser/TokenDateParser";
import { DateUtil } from "./date-utils";
import { SymbolsDate } from "./symbol-consts";
import { SymbolsDT } from "./symbol-consts";
import { SymbolsDS } from "./symbol-consts";
import { TokenDynamicStringParser } from "./tokenparser/TokenDynamicStringParser";

type KeyValueList = [string, any][];
type AnyObject = { [key: string]: any };

class MappingUtils {
    constructor() { };

    static readonly FOUND_SYMBOL_TOKEN = 'FOUND-SYMBOL-TOKEN';
    static readonly FOUND_TOKEN = 'FOUND-TOKEN';

    private static logger(message: string, verbose = true) {
        if (verbose)
            console.log(message);
    }

    static isValidSymbolToken(token: string): boolean {
        try {
            const symbolValues = Object.values(SymbolsDT);
            if (SymbolsDate.BracketedTokenRegex.test(token)) {
                return symbolValues.includes(token);
            }
        } catch (e) {
            return false;
        }
        return false;
    }

    static isValidDateToken(token: string): boolean {
        return TokenDateParser.isValidDateToken(token);
    }

    static isValidDynamicStringToken(token: string): boolean {
        return TokenDynamicStringParser.isValidDynamicStringToken(token);
    }

    static isValidJson(str: string): boolean {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    static mapTopazApplicantToDTO(a: TopazApplicant): DTO_ApplicationDetail {

        const mappedApplicationDetail: DTO_ApplicationDetail = {
            Surname: a.Profile.Surname,
            Forenames: a.Profile.Forenames,
            DateOfBirth: a.Profile.DateOfBirth,
            Gender: a.Profile.Gender,
            Scheme: a.Scheme,
            PostCode: a.PostCode
        };
        return mappedApplicationDetail;
    }


    /**
     * Test Parse Record Data Symbol Token
     * Returns a record data object
     * Replace matching tokens with 'FOUND-TOKEN' - others non-matched properties are not chnaged
     */
    static parseRecordDataSymbolToken(recordData: Record<string, string>): Record<string, string> {
        return MappingUtils.mapAndParseRecordDataWithSubstituteObj(recordData, null, true);
    }

    /**
     * Maps and parses tokens within properties from recordData to a generic object.
     *
     * This method takes a source object (`recordData`) and a template object (`templateObj`) to create a mapped and parsed result.
     * If the template object is not provided, the source recordData is used as the template.
     * The method performs the following steps:
     *
     * 1. **Mapping:**  
     *    It maps properties from `recordData` to an object based on the structure of `templateObj` using `mapRecordDataToTargetObj`.
     *
     * 2. **Substitute Object Copy:**  
     *    It creates a shallow copy of `templateObj` (named `mappedSubObj`) to avoid mutating the original object.
     *
     * 3. **Token Parsing:**  
     *    For each property in the mapped record data, the method:
     *      - Logs the current value.
     *      - Checks if the value is a valid token for a date, symbol, or dynamic string.
     *      - If running in test mode (`TEST` flag is true), it replaces valid tokens with a known placeholder (`FOUND_TOKEN`).
     *      - Otherwise, it parses the token based on its type:
     *          - **Date Tokens:** Parsed to a formatted date string.
     *          - **Symbol Tokens:** Depending on the symbol type, either maps from the template object or passes the original value.
     *          - **Dynamic String Tokens:** Parsed and generated using a dynamic string parser.
     *      - It re-checks if the parsed token itself qualifies as a date or dynamic string token, and re-parses if necessary.
     *
     * 4. **Final Output:**  
     *    The method returns the fully mapped and parsed object.
     *
     * @param recordData - The source record data with properties as a Record of key-value pairs (both keys and values are strings).
     * @param templateObj - A template object defining the structure for mapping. If null, recordData is used as the template.
     * @param TEST - A boolean flag indicating if the method should run in test mode. When true, valid tokens are replaced with a placeholder.
     * @returns An object containing the mapped and parsed data based on the template provided by `templateObj`.
     */
    static mapAndParseRecordDataWithSubstituteObj(recordData: Record<string, string>, templateObj: any, TEST: boolean = false): any {
        // Log the pre-mapped/parsed record data for debugging (commented out)
        // cy.log(`Pre-Mapped/Parsed Record Data: ${CommonUtils.toJSONString(recordData)}`);

        // If the template object is null, use the source recordData as the template.
        if (!templateObj) {
            templateObj = recordData;
        }

        // Map properties from recordData to a generic object with the same structure as templateObj.
        // This ensures that the resultant object has the correct keys and layout.
        let parsedRecordData = this.mapRecordDataToTargetObj(recordData, templateObj);
        this.logger(`parsedRecordData: ${CommonUtils.toJSONString(parsedRecordData)} `);

        // Create a shallow copy of templateObj to avoid mutating the original object.
        const mappedSubObj: any = { ...templateObj };
        this.logger(`mappedSubObj: ${CommonUtils.toJSONString(mappedSubObj)} `);

        // Iterate over each property in the mapped record data.
        for (const key in parsedRecordData) {
            this.logger(`recordData[${key}]: ${CommonUtils.toJSONString(parsedRecordData[key])}`);
            let recordDataValue = parsedRecordData[key];

            // Check if the current value qualifies as a valid token.
            let ValidSymbolToken = this.isValidSymbolToken(recordDataValue);
            let ValidDateToken = this.isValidDateToken(recordDataValue);
            let ValidDynamicStringToken = this.isValidDynamicStringToken(recordDataValue);
            let ValidToken = (ValidDateToken || ValidSymbolToken || ValidDynamicStringToken);

            if (TEST) {
                // In test mode, replace valid tokens with a predefined placeholder (FOUND_TOKEN).
                parsedRecordData[key] = ValidToken ? this.FOUND_TOKEN : recordDataValue;
            } else {
                let parsedToken = recordDataValue;
                if (ValidToken) {
                    this.logger(`${this.FOUND_TOKEN}: ABOUT TO PARSE : ${CommonUtils.toJSONString(recordDataValue)}`);

                    // Parse Date Tokens: Format the date string after parsing.
                    if (ValidDateToken) {
                        this.logger(`${this.FOUND_TOKEN}: DATE-TOKEN-TO-PARSE -> '${recordDataValue}'`);
                        parsedToken = DateUtil.formatDateToString(TokenDateParser.parseDateStringToken(recordDataValue));
                    }
                    // Parse Symbol Tokens: Handle various symbol tokens with a switch statement.
                    else if (ValidSymbolToken) {
                        this.logger(`${this.FOUND_TOKEN}: SYMBOL-TOKEN-TO-PARSE -> '${recordDataValue}'`);

                        // Determine the specific type of symbol token.
                        switch (recordDataValue) {
                            case SymbolsDT.VALID:
                            case SymbolsDT.UPDATEVALID:
                            case SymbolsDT.UPDATEINVALID:
                                // Map from mappedSubObj if the key exists, otherwise use the FOUND_SYMBOL_TOKEN placeholder.
                                parsedToken = mappedSubObj.hasOwnProperty(key) ? mappedSubObj[key] : this.FOUND_SYMBOL_TOKEN;
                                break;
                            case SymbolsDT.BLANK:
                            case SymbolsDT.UPDATEBLANK:
                            case SymbolsDT.IGNORE:
                                // For BLANK or IGNORE tokens, pass through the original value.
                                parsedToken = recordDataValue;
                                break;
                            default:
                                // For any unrecognized symbol token, retain the original value.
                                parsedToken = recordDataValue;
                        }
                    }
                    // Parse Dynamic String Tokens: Use the dynamic string parser.
                    else if (ValidDynamicStringToken) {
                        this.logger(`${this.FOUND_TOKEN}: DYNAMICSTRING-TOKEN-TO-PARSE -> '${recordDataValue}'`);
                        parsedToken = TokenDynamicStringParser.parseAndGenerate(recordDataValue);
                    }
                }

                // After the initial parsing, check again if the parsed token qualifies as a date or dynamic string token.
                if (this.isValidDateToken(parsedToken)) {
                    parsedToken = DateUtil.formatDateToString(TokenDateParser.parseDateStringToken(parsedToken));
                }
                else if (this.isValidDynamicStringToken(parsedToken)) {
                    parsedToken = TokenDynamicStringParser.parseAndGenerate(parsedToken);
                }

                // Update the parsed record data. If it was a valid token, use the parsed value; otherwise, retain the original.
                parsedRecordData[key] = ValidToken ? parsedToken : recordDataValue;
            }
        }

        // Log the final mapped/parsed record data (commented out).
        // cy.log(`Mapped/Parsed Record Data: ${CommonUtils.toJSONString(parsedRecordData)}`);

        return parsedRecordData;
    }


    /**
     * Maps properties from a source record object (recordData) to a target object.
     *
     * Creates a shallow copy of the provided target object and then iterates over its properties.
     * For each property in the target object, it checks if the source record (recordData) contains a matching key.
     * If a match is found, the value from the recordData is assigned to the corresponding property in the target object copy.
     *
     * This approach avoids directly mutating the original target object while ensuring that only properties 
     * that exist in the target object are updated with values from the recordData.
     *
     * @param recordData - A Record (object) with string keys and string values, typically representing data to map.
     * @param targetObj - The generic target object that will receive values from recordData where key matches occur.
     * @returns A new object that is a copy of targetObj, with its properties updated based on recordData.
     */
    static mapRecordDataToTargetObj(recordData: Record<string, string>, targetObj: Record<string, any>): Record<string, any> {
        //cy.log(`Record Data: ${CommonUtils.toJSONString(recordData)} `);
        // Create a shallow copy of targetObj to avoid mutating the original object.
        const mappedObj: Record<string, any> = { ...targetObj };

        // Iterate over each key in the target object copy.
        for (const key in mappedObj) {
            // Check if recordData has a property with the same key.
            if (recordData.hasOwnProperty(key)) {
                // If the key exists in recordData, update the value in mappedObj.
                mappedObj[key] = recordData[key];
            }
        }
        //cy.log(`mappedObj: ${CommonUtils.toJSONString(mappedObj)} `);

        // Return the modified copy of targetObj with mapped values.
        return mappedObj;
    }

    /**
     * Recursively extracts key-value pairs from a nested object.
     *
     * This method traverses the provided object recursively and creates an array of key-value pairs.
     * Each key in the output represents the complete path (using dot notation) to a value within the
     * nested structure. This flattened representation is useful when you need a uniform view of all
     * properties in a complex object.
     *
     * @param obj - The input object from which to extract key-value pairs.
     * @param parentKey - (Optional) A prefix for keys used during recursion to build full paths.
     * @returns An array of tuples(key-value pairs), where each tuple consists of a dot-notated key and its corresponding value.
     */
    static MapToKeyValuePairs(obj: any, parentKey: string = ''): KeyValueList {
        let entries: KeyValueList = [];

        // Iterate over each key-value pair in the object.
        for (const [key, value] of Object.entries(obj)) {
            // Build the full key path using dot notation.
            const fullKey = parentKey ? `${parentKey}.${key}` : key;

            // If the value is an object (and not an array), recursively extract its key-value pairs.
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                entries = [...entries, ...MappingUtils.MapToKeyValuePairs(value, fullKey)];
            } else {
                // Otherwise, add the current key-value pair to the entries list.
                entries.push([fullKey, value]);
            }
        }

        return entries;
    }


    /**
     * Recursively flattens a nested object into a single-level object.
     * Each key in the returned object represents the path (dot notation)
     * to the value in the original object.
     *
     * When the optional parameter `returnPropName` is set to true, the method returns an object
     * where each key is the dot-notated path and each value is the original property name (the last segment).
     *
     * @param obj - The object to be flattened.
     * @param parentKey - The base key for recursion (used internally).
     * @param returnPropName - If true, returns an object mapping full paths to original property names.
     * @returns A flattened object where keys are paths and values are either the string representations
     *          of the original values or the original property names.
     */
    static flattenObjectToRecordData(
        obj: any,
        parentKey: string = '',
        returnPropName: boolean = false
    ): Record<string, string> {
        let result: Record<string, string> = {};

        // Iterate over each key-value pair in the current object.
        for (const [key, value] of Object.entries(obj)) {
            // Create a new key with dot notation if a parentKey exists.
            const fullKey = parentKey ? `${parentKey}.${key}` : key;

            // If the value is a non-array object, recursively flatten it.
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                result = {
                    ...result,
                    ...MappingUtils.flattenObjectToRecordData(value, fullKey, returnPropName)
                };
            } else {
                // If returnPropName is true, use the original property name as the value;
                // otherwise, convert the value to a string.
                result[fullKey] = returnPropName ? key : String(value);
            }
        }

        return result;
    }




    static createStringArrayofObjectValues(obj: any): string[] {
        //Create a string array of expected values
        let x = obj as AnyObject;
        const keys = Object.keys(x);
        let expected_ElementValues: string[] = [];
        for (const key of keys) {
            expected_ElementValues.push(x[key]);
        };
        return expected_ElementValues;
    }



    /*
    compareObjectsByKeyValuePairs:

    Provides a flexible approach to compare objects, 
    accommodating both simple and complex structures, 
    and returning insights through match count, total property count and percentage metrics

    This function takes two objects as input.
    It uses mapToKeyValuePairs for both objects to get their key-value pairs.
    It calculates the totalProperties by summing the lengths of the key-value lists from both objects. 
    It creates a Set of unique keys from both objects.
    It iterates over these unique keys to compare the values of corresponding keys in both objects. 
    If both values exist and are equal, it increments the matchCount.
    The match percentage is calculated as (matchCount / uniqueKeys.size) * 100 
    and is rounded to two decimal places for readability.
    The result is returned, showing the match count, totalProperties and match percentage.
    */
    static compareObjectsByKeyValuePairs(obj1: any, obj2: any): {
        matchCount: number,
        totalProperties: number,
        matchPercentage: number,
        matchedProperties: KeyValueList
    } {
        const entries1 = MappingUtils.MapToKeyValuePairs(obj1);
        const entries2 = MappingUtils.MapToKeyValuePairs(obj2);
        let matchedProperties: KeyValueList = [];

        const totalProperties = entries1.length + entries2.length;
        const uniqueKeys = new Set([...entries1.map(([key]) => key), ...entries2.map(([key]) => key)]);

        let matchCount = 0;

        uniqueKeys.forEach(key => {
            const value1 = entries1.find(([entryKey]) => entryKey === key)?.[1];
            const value2 = entries2.find(([entryKey]) => entryKey === key)?.[1];
            if (value1 !== undefined && value2 !== undefined && value1 === value2) {
                matchCount++;
                matchedProperties.push([key, value1]);
            }
        });

        const matchPercentage = (matchCount / uniqueKeys.size) * 100;

        return {
            matchCount: matchCount,
            totalProperties: totalProperties,
            matchPercentage: parseFloat(matchPercentage.toFixed(2)), // rounded to two decimal places
            matchedProperties: matchedProperties
        };
    }

    /**
     * Compares two objects by their flattened key-value pairs and identifies matching properties.
     *
     * This method flattens both objects using `flattenObjectToRecord`, then:
     * - Retrieves the keys from both flattened objects.
     * - Computes the total number of properties by summing the key counts from both objects.
     * - Creates a Set of unique keys from both objects.
     * - Iterates over the unique keys to check if both objects have the key and if their corresponding
     *   values are identical.
     * - Builds an object (`matchedProperties`) that contains the matching key-value pairs.
     * - Calculates the match percentage as (matchCount / number of unique keys) * 100,
     *   rounded to two decimal places.
     *
     * @param obj1 - The first object to compare.
     * @param obj2 - The second object to compare.
     * @returns An object containing:
     *          - matchCount: The number of matching key-value pairs.
     *          - totalProperties: The sum of property counts from both flattened objects.
     *          - matchPercentage: The percentage of keys with matching values.
     *          - matchedProperties: An object with keys and their matching values from both objects.
     */
    static compareObjectsByKeyValuePairs_v2(obj1: any, obj2: any): {
        matchCount: number,
        totalProperties: number,
        matchPercentage: number,
        matchedProperties: Record<string, string>
    } {
        // Flatten both objects to a Record<string, string> format.
        const flatObj1 = MappingUtils.flattenObjectToRecordData(obj1);
        const flatObj2 = MappingUtils.flattenObjectToRecordData(obj2);

        // Extract keys from both flattened objects.
        const keys1 = Object.keys(flatObj1);
        const keys2 = Object.keys(flatObj2);

        // Calculate the total number of properties in both objects.
        const totalProperties = keys1.length + keys2.length;

        // Create a set of unique keys from both objects.
        const uniqueKeys = new Set([...keys1, ...keys2]);

        // Initialize the count of matching key-value pairs and the matched properties object.
        let matchCount = 0;
        const matchedProperties: Record<string, string> = {};

        // Iterate over each unique key and compare the values.
        uniqueKeys.forEach(key => {
            const value1 = flatObj1[key];
            const value2 = flatObj2[key];

            // Count as a match if both values are defined and equal.
            if (value1 !== undefined && value2 !== undefined && value1 === value2) {
                matchCount++;
                matchedProperties[key] = value1;
            }
        });

        // Calculate the match percentage, rounded to two decimal places.
        const matchPercentage = parseFloat(((matchCount / uniqueKeys.size) * 100).toFixed(2));

        return {
            matchCount: matchCount,
            totalProperties: totalProperties,
            matchPercentage: matchPercentage,
            matchedProperties: matchedProperties
        };
    }


}



export default MappingUtils;