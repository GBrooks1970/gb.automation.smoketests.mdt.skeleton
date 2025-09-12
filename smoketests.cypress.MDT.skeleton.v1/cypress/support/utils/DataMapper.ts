import CommonUtils from "./common-utils";
import { UkAddress, NonUKAddress, UkAddressWithCountry, BFPOAddress } from "./env/Address";
import { TopazApplicantMaintainFeeDetails_Flattened, TopazApplicantSearchDetails_Flattened } from "./env/TopazData_Flattened";
import { MoreAboutYouAndExtraActivities, TopazApplicant, TopazReferenceDetails } from "./env/TopazData_TopazApplicant";
import { TopazApplicantOtherDetails } from "./env/TopazData_TopazApplicantOtherDetails";
/**
 * NestedKeys type is a TypeScript utility type. 
 * It is designed to generate all possible keys from a nested object, 
 * including dot-separated paths for nested properties. 
 * It is used to enable type-safe access to deeply nested fields when working with dynamic data structures.
 * 
 * How It Works
 * Mapped Type:
 * 
 * Iterates over all keys (K) of a given object type T.
 * Recursive Type Check:
 * 
 * For each key K, it checks if the corresponding value T[K] is an object:
 * If yes, it recursively generates keys for that object (e.g., Employee.Name).
 * If no, it simply returns the key K.
 * 
 * String Concatenation:
 * Combines the current key with nested keys using a dot (.) to represent the path (e.g., Employee.Name).
 * 
 * Union of Keys:
 * Combines all keys (direct and nested) into a single union type.
 * 
 * e.g.
 * For the following object type:
 * type Example = {
 *     Employee: {
 *         Name: string;
 *         ID: number;
 *     };
 *     Department: string;
 * };
 * 
 * The resulting NestedKeys<Example> type will be:
 * type Result = "Employee" | "Employee.Name" | "Employee.ID" | "Department";
 */
export type NestedKeys<T> = {
    [K in keyof T]: T[K] extends object
    ? `${K & string}` | `${K & string}.${NestedKeys<T[K]>}`
    : `${K & string}`;
}[keyof T];

/**
 * Utility class for mapping and transforming data structures.
 */
export class DataMapper {

    /**
     * Generates an array of property paths for all nested properties of an object.
     * If the object contains an array of objects, it adds an index suffix instead of a prefix.
     *
     * @param obj - The object to extract property paths from.
     * @param prefix - The prefix for nested properties (default: empty string).
     * @returns An array of flattened dot-separated property paths with index suffix for arrays.
     *
     * @example
     * const example = { Employee: { Name: "John", ID: 123 }, Department: "HR" };
     * const result = DataMapper.getNestedKeys(example);
     * // result: ["Employee", "Employee.Name", "Employee.ID", "Department"]
     * 
     * const example = {"AddressLines":["123 Street","City","State","Country"],"PostCode":"AB12CD"};
     * const result = DataMapper.getNestedKeys(example);
     * // result: ["AddressLines.0","AddressLines.1","AddressLines.2","AddressLines.3","PostCode"]
     */
    static getNestedKeys<T extends Record<string, any>>(obj: T, prefix: string = ""): string[] {
        return Object.entries(obj).reduce<string[]>((keys, [key, value]) => {
            if (Array.isArray(value) && value.length > 0 && typeof value[0] === "object") {
                // Handle arrays of objects by appending an index suffix instead of a prefix
                return keys.concat(
                    value.reduce<string[]>((arrKeys, item, index) => {
                        const indexedSuffix = `${prefix}${key}${index + 1}`;
                        return arrKeys.concat(DataMapper.getNestedKeys(item, indexedSuffix + "."));
                    }, [])
                );
            } else if (typeof value === "object" && value !== null) {
                // Recursively handle nested objects
                return keys.concat(DataMapper.getNestedKeys(value, `${prefix}${key}.`));
            } else {
                // Add the final key and remove trailing dots if present
                keys.push(`${prefix}${key}`.replace(/\.$/, ""));
                return keys;
            }
        }, []);
    }

    /**
     * Flattens an object into a key-value pair object where
     * the key is the flattened property path.
     *
     * Depending on the options provided, the output can be:
     * - A flattened object (if asObject is true),
     * - An array of property paths (if asPathArray is true), or
     * - An array of objects with each { path, value } pair.
     *
     * Additionally, if returnPropName is true, the values in the flattened output
     * will be the original property names rather than the stringified values.
     *
     * @param obj - The object to be flattened.
     * @param prefix - The prefix for property paths (default: empty string).
     * @param asObject - If true, output will be a single flattened object.
     * @param asPathArray - If true, output will be an array of property paths.
     * @param returnPropName - If true, the output values will be the original property names.
     * @returns A flattened object with paths as keys and values as corresponding values,
     *          an array of { path, value } objects, or an array of paths.
     */
    static mapAndflattenObjectData<T extends Record<string, any>>(
        obj: T,
        prefix: string = "",
        asObject: boolean = false,
        asPathArray: boolean = false,
        returnPropName: boolean = false
    ): Record<string, string> | Array<{ path: string; value: any }> | string[] {
        const flattened: Record<string, string> = Object.entries(obj).reduce((acc, [key, value]) => {
            const newKey = `${prefix}${key}`;
            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    if (typeof item === "object" && item !== null) {
                        Object.assign(
                            acc,
                            DataMapper.mapAndflattenObjectData(
                                item,
                                `${newKey}.${index + 1}.`,
                                true,
                                false,
                                returnPropName
                            )
                        );
                    } else {
                        // For array items that are primitives, use the original property name if requested.
                        acc[`${newKey}.${index + 1}`] = returnPropName ? key : item;
                    }
                });
            } else if (typeof value === "object" && value !== null) {
                Object.assign(
                    acc,
                    DataMapper.mapAndflattenObjectData(value, `${newKey}.`, true, false, returnPropName)
                );
            } else {
                // If returnPropName is true, assign the original property name instead of the value.
                acc[newKey] = returnPropName ? key : value;
            }
            return acc;
        }, {} as Record<string, string>);

        if (asPathArray) {
            return Object.keys(flattened);
        }

        if (asObject) {
            return flattened;
        }

        return Object.entries(flattened).map(([path, value]) => ({ path, value }));
    }


    /**
     * Maps an array of objects into a flattened object using dynamically generated keys based on fields.
     *
     * @param array - The array of objects to transform.
     * @param keyPrefix - The base key prefix for the resulting object's keys.
     * @param fields - The list of fields to include in the resulting object (supports nested paths).
     * @param includeIndex - Whether to include the index suffix in the resulting keys (default: true).
     * @returns A flattened object with keys dynamically generated by combining the keyPrefix, field names, and index.
     */
    static mapArrayData<T>(
        array: T[],
        keyPrefix: string,
        fields: NestedKeys<T>[],
        includeIndex: boolean = true
    ): Record<string, any> {
        return array.reduce((accumulator, currentItem, currentIndex) => {
            const keyIndex = includeIndex && array.length > 1 ? currentIndex + 1 : "";
            fields.forEach(field => {
                const value = DataMapper.resolveNestedValue(currentItem, field);
                accumulator[`${keyPrefix}${field}${keyIndex}`] = value;
            });
            return accumulator;
        }, {} as Record<string, any>);
    }

    /**
     * Resolves a nested value in an object using a dot-separated path.
     *
     * @param obj - The object to resolve the value from.
     * @param path - The dot-separated path to the property (e.g., "Employee.Name").
     * @returns The resolved value or undefined if the path doesn't exist.
     */
    private static resolveNestedValue<T>(obj: T, path: string): any {
        return path.split('.').reduce((current, key) => {
            if (current && typeof current === 'object') {
                return current[key as keyof typeof current];
            } else {
                console.warn(`Path "${path}" could not be resolved at key "${key}".`);
                return undefined;
            }
        }, obj as any);
    }

    /**
     * Converts an array into an object with index-suffixed keys.
     * 
     * @param keyName - The base name for the keys in the resulting object.
     * @param array - The array of values to be converted.
     * @returns An object with keys suffixed by index (1-based) and corresponding values.
     */
    static mapArrayToIndexedObject(keyName: string, array: string[]): Record<string, string> {
        return array.reduce((acc, value, index) => {
            acc[`${keyName}.${index + 1}`] = value || ""; // Adding index suffix (1-based) and handling empty values
            return acc;
        }, {} as Record<string, string>);
    }


    /**
     * Generates an array of objects that match the FieldDetail_Base structure.
     * Each "Name" property will contain the flattened path of the given object.
     * Other properties (Selector and ValueType) can be set via parameters.
     *
     * @param obj - The object to be processed.
     * @param selector - Default value for the "Selector" field.
     * @param valueType - Default value for the "ValueType" field.
     * @returns An array of FieldDetail_Base objects.
     */
    static GenerateFieldDetail_BaseArray<T extends Record<string, any>>(
        obj: T,
        selector: string = "",
        valueType: string = ""
    ): { Name: string; Selector: string; ValueType: string }[] {
        const baseOptionTemplate = { Selector: selector, ValueType: valueType };
        return DataMapper.GenerateFieldDetailsArray(obj, baseOptionTemplate);
    }

    /**
     * Generates an array of objects that match a provided option object structure.
     * If the "Name" property does not exist in the option object, it is added.
     * Each "Name" property will contain the flattened path of the given input object.
     * Other properties will be set to the values in the given option object.
     *
     * @param obj - The input object to be processed.
     * @param optionTemplate - The template object for additional properties.
     * @returns An array of objects matching the provided structure.
     */
    static GenerateFieldDetailsArray<T extends Record<string, any>, O extends Record<string, any>>(
        obj: T,
        optionTemplate: O
    ): (O & { Name: string })[] {
        const paths = DataMapper.mapAndflattenObjectData(obj, "", false, true) as string[];
        return paths.map(path => ({
            ...optionTemplate,
            Name: path
        }));
    }


    /**
     * Generates an object with empty string values for all properties of the given interface.
     * @param {T} schema - The interface schema to generate an empty object from.
     * @returns {Record<string, any>} - An object with empty string values.
     */
    static generateEmptyObject = <T extends Record<string, any>>(schema: T): Record<string, any> => {
        return Object.keys(schema).reduce((acc, key) => {
            acc[key] = "";
            return acc;
        }, {} as Record<string, any>);
    };

    /**
     * Deep merges a partial object into the original object.
     * - Supports an option to either merge arrays or replace them.
     * - If a property in `updates` is an object, it recursively merges it.
     * - If a property is a primitive value, it replaces the original.
     *
     * @param original - The original object to update.
     * @param updates - A partial object with properties to update.
     * @param mergeArrays - If true, arrays will be merged instead of replaced.
     * @returns A new object with merged properties.
     */
    static DeepMergeObject<T extends Record<string, any>>(
        original: T,
        updates: Partial<T>,
        mergeArrays: boolean = false
    ): T {
        return (Object.keys(updates) as Array<keyof T>).reduce((acc, key) => {
            const originalValue = acc[key];
            const updateValue = updates[key];

            if (Array.isArray(originalValue) && Array.isArray(updateValue)) {
                acc[key] = mergeArrays
                    ? [...originalValue, ...updateValue] as T[keyof T] // ✅ Explicitly cast to T[keyof T]
                    : updateValue as T[keyof T]; // ✅ Replace with correct type
            } else if (
                originalValue &&
                updateValue &&
                typeof originalValue === "object" &&
                typeof updateValue === "object" &&
                !Array.isArray(originalValue) &&
                !Array.isArray(updateValue)
            ) {
                acc[key] = DataMapper.DeepMergeObject(originalValue, updateValue, mergeArrays) as T[keyof T]; // ✅ Ensure deep merge maintains type safety
            } else {
                acc[key] = updateValue as T[keyof T]; // ✅ Correct type assignment
            }

            return acc;
        }, { ...original });
    }
    /**
     * Merges properties from `dataObject` into `templateObject`, but only includes properties present in `templateObject`.
     * If a property exists in `templateObject` but not in `dataObject`, it remains unchanged.
     * Supports deep merging of nested objects and allows merging or replacing arrays.
     *
     * @param templateObject - The reference object specifying which properties should be included in the result.
     * @param dataObject - The full data source containing all possible properties.
     * @param mergeArrays - Whether to merge arrays (true) or replace them (false). Default is false.
     * @returns A new object containing only the properties that exist in the `templateObject`, merged with values from `dataObject`.
     */
    static MergeWithTemplate<T extends Record<string, any>, U extends Partial<T>>(
        templateObject: U,
        dataObject: T,
        mergeArrays: boolean = false
    ): U {
        return (Object.keys(templateObject) as Array<keyof U>).reduce((acc, key) => {
            const templateValue = templateObject[key];
            const dataValue = dataObject[key as keyof T];

            if (
                Array.isArray(templateValue) &&
                Array.isArray(dataValue)
            ) {
                acc[key] = mergeArrays
                    ? ([...templateValue, ...dataValue] as U[keyof U])
                    : (dataValue as U[keyof U]);
            } else if (
                templateValue &&
                dataValue &&
                typeof templateValue === "object" &&
                typeof dataValue === "object" &&
                !Array.isArray(templateValue) &&
                !Array.isArray(dataValue)
            ) {
                acc[key] = this.MergeWithTemplate(templateValue, dataValue, mergeArrays) as U[keyof U];
            } else {
                acc[key] = (dataValue !== undefined ? dataValue : templateValue) as U[keyof U];
            }

            return acc;
        }, { ...templateObject });
    }

    /**
     * Recursively maps an object to a new object that preserves the original structure,
     * but replaces each leaf value with its dot‑separated property path.
     *
     * For example, given the input:
     *   { a: { b: 1, c: 2 }, d: 3 }
     *
     * The output will be:
     *   { a: { b: "a.b", c: "a.c" }, d: "d" }
     *
     * For array values, each element is processed similarly. A 1-indexed notation is used for array positions.
     * For example, given:
     *   { a: [ { b: 1 }, 2 ] }
     *
     * The output will be:
     *   { a: [ { b: "a.1.b" }, "a.2" ] }
     *
     * @param obj - The input object.
     * @param parentKey - The base key for recursion (used internally).
     * @returns A new object with the same structure as the input, but with each leaf value replaced
     *          by its full property path.
     */
    static mapObjectWithPropertyPaths(obj: any, parentKey: string = ""): any {
        if (Array.isArray(obj)) {
            // Process each element in the array.
            return obj.map((item, index) => {
                // Use a 1-indexed position for the array element.
                const newKey = parentKey ? `${parentKey}.${index + 1}` : `${index + 1}`;
                return (item !== null && typeof item === "object")
                    ? DataMapper.mapObjectWithPropertyPaths(item, newKey)
                    : newKey;
            });
        } else if (obj !== null && typeof obj === "object") {
            // Process a plain object.
            const result: any = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    // Construct the full property path.
                    const fullKey = parentKey ? `${parentKey}.${key}` : key;
                    result[key] = (obj[key] !== null && typeof obj[key] === "object")
                        ? DataMapper.mapObjectWithPropertyPaths(obj[key], fullKey)
                        : fullKey;
                }
            }
            return result;
        } else {
            // For primitive values (should not occur at the root level), return the current path.
            return parentKey;
        }
    }

    /**
     * Randomly picks a property key from the supplied object.
     *
     * For example, given:
     * {
     *   UCAS: 'UCAS',
     *   CUKAS: 'CUKAS',
     *   GTTR: 'GTTR'
     * }
     *
     * The method may return "UCAS", "CUKAS", or "GTTR" at random.
     *
     * @param obj - The object from which to pick a random property.
     * @returns The randomly selected property key value.
     */
    static pickRandomProperty(obj: Record<string, any>): string {
        const keys = Object.keys(obj);
        const randomIndex = Math.floor(Math.random() * keys.length);
        return obj[keys[randomIndex]];
    }
}
