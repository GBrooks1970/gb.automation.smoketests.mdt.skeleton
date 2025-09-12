import axios from 'axios';
import { JSDOM } from 'jsdom';

class CommonUtils {
    constructor() { };

    /**
     * Converts a JSON object to a string with optional formatting and escaping.
     * @param jsonObject - The object to stringify.
     * @param options - Options for formatting and escaping.
     * @returns The JSON string.
     */
    static toJSONString(jsonObject: any, options?: { unformatted?: boolean; escaped?: boolean }): string {
        let jsonString = JSON.stringify(jsonObject, options?.unformatted ? undefined : null, options?.unformatted ? 0 : 2);
        if (options?.escaped) {
            jsonString = jsonString.replace(/[\\]/g, '\\\\').replace(/[\/]/g, '\\/');
        }
        return jsonString;
    }

    /**
     * Parses a JSON string into an object.
     * @param jsonString - The JSON string to parse.
     * @returns The parsed object.
     * @throws Error if the string is invalid.
     */
    static parseJSON(jsonString: string): any {
        try {
            return JSON.parse(jsonString);
        } catch (error) {
            throw new Error("Invalid JSON string: " + error);
        }
    };

    /**
     * Checks for duplicate values in an array.
     * @param array - The array to check.
     * @returns True if duplicates exist, false otherwise.
     */
    static hasDuplicates(array: any[]): boolean {
        return new Set(array).size !== array.length;
    }

    /**
     * Finds the intersection of two sets.
     * @param setA - The first set.
     * @param setB - The second set.
     * @returns A new set containing the intersection.
     */
    static getSetIntersection(setA: Set<any>, setB: Set<any>): Set<any> {
        return new Set([...setA].filter(x => setB.has(x)));
    }

    static getSetDifferences(setA: Set<any>, setB: Set<any>): Set<any> {
        let difference = new Set(
            [...setA].filter(x => !setB.has(x)));
        return difference;
    };

    static getSetUnion(setA: Set<any>, setB: Set<any>): Set<any> {
        let union = new Set([...setA, ...setB]);
        return union;
    };

    /**
     * Checks if a given string is a palindrome.
     * @param word - The string to check.
     * @returns True if the string is a palindrome, false otherwise.
     */
    static isPalindrome(word: string): boolean {
        return word === word.split('').reverse().join('');
    }

    /**
     * Checks if all strings in the given array are palindromes.
     * @param stringArray - The array of strings to check.
     * @returns True if all strings are palindromes, false otherwise.
     */
    static areAllStringsPalindromes(stringArray: string[]): boolean {
        for (const word of stringArray) {
            if (!CommonUtils.isPalindrome(word)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Checks if a given number is a prime number.
     * @param num - The number to check.
     * @returns True if the number is prime, false otherwise.
     */
    static isPrime(num: number): boolean {
        if (num <= 1) {
            return false; // Numbers less than or equal to 1 are not prime
        }
        if (num <= 3) {
            return true; // 2 and 3 are prime numbers
        }
        if (num % 2 === 0 || num % 3 === 0) {
            return false; // Eliminate multiples of 2 and 3
        }
        for (let i = 5; i * i <= num; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) {
                return false; // Check divisors up to the square root of the number
            }
        }
        return true; // The number is prime
    }

    /**
    * Calculates the frequency of each digit in a given positive integer.
    * @param n - The positive integer to analyze.
    * @returns A dictionary (object) where the keys are digits and the values are their frequencies.
    */
    static getDigitFrequency(n: number): Record<number, number> {
        if (n < 0) {
            throw new Error("Input must be a positive integer.");
        }

        const frequencyMap: Record<number, number> = {};

        while (n > 0) {
            const digit = n % 10; // Get the last digit
            if (digit >= 0 && digit <= 9) { // Ensure the digit is valid (0-9)
                frequencyMap[digit] = (frequencyMap[digit] || 0) + 1; // Update the frequency map
            }
            n = Math.floor(n / 10); // Remove the last digit
        }

        return frequencyMap;
    }
}

export default CommonUtils;