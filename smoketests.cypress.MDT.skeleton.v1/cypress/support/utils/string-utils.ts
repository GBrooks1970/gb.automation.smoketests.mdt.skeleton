import { SymbolsDT } from "./symbol-consts";

export class StringUtils {

  static readonly AlphaNumericTokenRegex = /\[ALPHA-NUMERIC-(\d+)\]/;				//| Regular expression pattern to match "[ALPHA-NUMERIC-X]" where X is a number. 
  static readonly NumericTokenRegex = /\[NUMERIC-(\d+)\]/;						      //| Regular expression pattern to match "[NUMERIC-X]" where X is a number.
  static readonly AlphaTokenRegex = /\[ALPHA-(\d+)\]/;							        //| Regular expression pattern to match "[ALPHA-X]" where X is a number. 

  static parseDynamicString(value: string): string {
    // Define a regular expression pattern to match "[ALPHA-NUMERIC-X]" where X is a number.
    const dynamicStringRegex = this.AlphaNumericTokenRegex;
    const match = value.match(dynamicStringRegex);

    if (match) {
      const numericValue = parseInt(match[1]);
      cy.log(`Numeric Value: ${numericValue}`);

      // Generate a string containing alphanumeric characters of the specified length.
      const alphaNumericString = this.generateAlphaNumericString(numericValue);
      cy.log(`Generated Alpha-Numeric String: ${alphaNumericString}`);

      return alphaNumericString; // Return the generated string
    }

    return value; // If no dynamic string pattern is found, return the input string
  }

  static generateAlphaNumericString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  static parseDynamicNumericString(value: string): string {
    // Define a regular expression pattern to match "[NUMERIC-X]" where X is a number.
    const dynamicStringRegex = this.NumericTokenRegex;
    const match = value.match(dynamicStringRegex);

    if (match) {
      const numericValue = parseInt(match[1]);
      cy.log(`Numeric Value: ${numericValue}`);

      // Generate a string containing alphanumeric characters of the specified length.
      const NumericString = this.generateNumericString(numericValue);
      cy.log(`Generated Numeric String: ${NumericString}`);

      return NumericString; // Return the generated string
    }

    return value; // If no dynamic string pattern is found, return the input string
  }

  static generateNumericString(length: number): string {
    const characters = '0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  static parseDynamicAlphaString(value: string): string {
    // Define a regular expression pattern to match "[ALPHA-X]" where X is a number.
    const dynamicStringRegex = this.AlphaTokenRegex;
    const match = value.match(dynamicStringRegex);

    if (match) {
      const numericValue = parseInt(match[1]);
      cy.log(`Numeric Value: ${numericValue}`);

      // Generate a string containing alphanumeric characters of the specified length.
      const AlphaString = this.generateAlphaString(numericValue);
      cy.log(`Generated Alpha String: ${AlphaString}`);

      return AlphaString; // Return the generated string
    }

    return value; // If no dynamic string pattern is found, return the input string
  }

  static generateAlphaString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

}