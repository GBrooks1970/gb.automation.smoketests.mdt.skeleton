import { DataTable } from "@badeball/cypress-cucumber-preprocessor";
import CommonUtils from "cypress/support/utils/common-utils";
import MappingUtils from "cypress/support/utils/MappingUtils";

/**
 * Creates an object from a transposed data table.
 *
 * In a transposed data table, the property names and values are arranged vertically,
 * with the property names in the first column. The function assumes:
 * - The first row (retrieved via dataTable.raw()[0]) contains a property and its value.
 * - The subsequent rows (accessed via dataTable.rows()) are similarly structured as [property, value] pairs.
 *
 * For each value, the function checks if it is valid JSON using MappingUtils.isValidJson.
 * If so, it parses the JSON string to an object; otherwise, it uses the value as-is.
 *
 * @param dataTable - The transposed data table.
 * @returns An object constructed from the transposed data table's properties.
 */
export function createObjectFromTransposedDataTable(dataTable: DataTable): any {
    const obj: any = {};

    // Log the entire data table for debugging purposes.
    cy.log(`DataTable: ${CommonUtils.toJSONString(dataTable)}`);

    // Extract the first row which contains the header property and its value.
    const headers = dataTable.raw()[0];
    // Use the first cell as the property name and the second cell as the value.
    obj[headers[0]] = MappingUtils.isValidJson(headers[1]) ? JSON.parse(headers[1]) : headers[1];

    // Log headers for debugging.
    cy.log(`headers: ${CommonUtils.toJSONString(headers, { unformatted: false })}`);

    // Iterate over the remaining rows to process additional properties.
    dataTable.rows().forEach(([key, value]) => {
        obj[key] = MappingUtils.isValidJson(value) ? JSON.parse(value) : value;
    });

    // Log the final constructed object.
    cy.log(`obj: ${CommonUtils.toJSONString(obj, { unformatted: false })}`);

    return obj;
}