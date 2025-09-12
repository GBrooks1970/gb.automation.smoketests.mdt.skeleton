import { DataTable } from "@badeball/cypress-cucumber-preprocessor";
import { keys } from "cypress/types/lodash";

//This is a from @cucumber/messages PickleTable
export type PickleTableCell = {
    value: string
};

export type PickleTableRow = {
    cells: PickleTableCell[]
};

export type PickleTable = {
    rows: PickleTableRow[]
};

export class DataTableUtils {

    static ConvertToIndexedObject(dataTable: PickleTable): Record<string, any>[] {
        const indexedObjects: Record<string, any>[] = [];

        // Extract column headers from the first row
        const headers = dataTable.rows[0].cells.map(cell => cell.value);

        // Iterate through each row starting from index 1 (skipping headers)
        for (let rowIndex = 1; rowIndex < dataTable.rows.length; rowIndex++) {
            const row = dataTable.rows[rowIndex];
            const indexedObject: Record<string, any> = {};

            // Iterate through each column and assign the value to the corresponding key in indexedObject
            headers.forEach((header, columnIndex) => {
                indexedObject[header] = row.cells[columnIndex].value;
            });

            // Add the indexed object to the array
            indexedObjects.push(indexedObject);
        }

        return indexedObjects;
    }

    static transposeDataTable(dataTable: DataTable): DataTable {
        const transposed: string[][] = [];
        let w = dataTable.raw()[0].length;
        console.log(`w:${w}`);
        for (let i = 0; i < w; i++) {
            let thisRow = dataTable.raw().map(row => row[i]);
            console.log(`thisRow:${thisRow}`);
            transposed[i] = thisRow;
        }
        let d = new DataTable(transposed);
        return d;
    }

    static displayDataTable(dataTable: DataTable): void {
        dataTable.raw().forEach(row => console.log(row.join(' | ')));
    }

}
