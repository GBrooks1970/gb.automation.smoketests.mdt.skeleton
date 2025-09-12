import { Given, When, Then, Before, After, DataTable } from "@badeball/cypress-cucumber-preprocessor";
import { PickleTable, PickleTableCell, PickleTableRow, DataTableUtils } from '../../utils/datatable/DataTableUtils'; // Path to your DataTableConverter class
import CommonUtils from '../../utils/common-utils';


let dataTable: PickleTable;
let indexedObjects: Record<string, any>[];
let indexedObjects02: Record<string, any>[];
let constructedCypressdataTable: DataTable;
let cypressdataTable01: DataTable;

let dataTableOrig: DataTable;
let transposedTable: DataTable;

Given('a DataTable with headers and rows', () => {

  //Example contructor of DataTable
  dataTable = {
    rows: [
      {
        cells: [{ value: "header 1" }, { value: "header 2" }],
      },
      {
        cells: [{ value: "row 1 col 1" }, { value: "row 1 col 2" }],
      },
      {
        cells: [{ value: "row 2 col 1" }, { value: "row 2 col 2" }],
      },
    ],
  };
  constructedCypressdataTable = new DataTable(dataTable);
});

When('the ConvertToIndexedObject method is called', () => {
  indexedObjects = DataTableUtils.ConvertToIndexedObject(dataTable);
});

Then('the returned object should be an array of indexed objects representing the DataTable', () => {
  expect(indexedObjects).to.deep.equal([
    { "header 1": "row 1 col 1", "header 2": "row 1 col 2" },
    { "header 1": "row 2 col 1", "header 2": "row 2 col 2" }
  ]);
});

Given('a DataTable with headers and rows like', (dataTable: DataTable) => {
  cypressdataTable01 = dataTable;

  //Show the output of common DataTable methods for info purposes
  cy.log(`DataTable: ${CommonUtils.toJSONString(cypressdataTable01)}`);
  cy.log(`rowsHash(): ${CommonUtils.toJSONString(dataTable.rowsHash())}`);
  cy.log(`hashes(): ${CommonUtils.toJSONString(dataTable.hashes())}`);
  cy.log(`rows(): ${CommonUtils.toJSONString(dataTable.rows())}`);
  cy.log(`raw(): ${CommonUtils.toJSONString(dataTable.raw())}`);
});

When('the DataTable.Hashes method is called', () => {
  indexedObjects02 = cypressdataTable01.hashes();
});

Then('the returned object should be an array of indexed objects representing the given DataTable', () => {
  expect(indexedObjects02).to.deep.equal([
    { "header1": "row 1 col 1", "header2": "row 1 col 2" },
    { "header1": "row 2 col 1", "header2": "row 2 col 2" }
  ]);
});



Given('I have a data table', function (dataTable: DataTable) {
  dataTableOrig = dataTable;
  DataTableUtils.displayDataTable(dataTableOrig);
});

When('I transpose the data table', function () {
  transposedTable = DataTableUtils.transposeDataTable(dataTableOrig);
  DataTableUtils.displayDataTable(transposedTable);
});


When('I transpose the data table with inbuilt function', function () {
  transposedTable = dataTableOrig.transpose();
  DataTableUtils.displayDataTable(transposedTable);
});

Then('the transposed table should be', function (dataTable: DataTable) {
  const expected = new DataTable(dataTable.raw());
  DataTableUtils.displayDataTable(expected);
  expect(transposedTable).to.deep.equal(expected);
});