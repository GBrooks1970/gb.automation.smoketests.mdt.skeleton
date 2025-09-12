import { Given, When, Then, Before, After, DataTable } from "@badeball/cypress-cucumber-preprocessor";
import CommonUtils from 'cypress/support/utils/common-utils';
import MappingUtils from "cypress/support/utils/MappingUtils";
import { createObjectFromTransposedDataTable } from "../test_util_methods/createObjectFromTransposedDataTable";

let obj_dataTable: any;
let obj1: any;
let obj2: any;
let result: any;

Given('I have an object, described in a transposed datatable', (dataTable: DataTable) => {
    obj_dataTable = createObjectFromTransposedDataTable(dataTable);

    cy.log(`obj: ${CommonUtils.toJSONString(obj_dataTable,{ unformatted: false })}`);
});

When('I map the object to key-value pairs - mapToKeyValuePairs method', () => {
    result = MappingUtils.MapToKeyValuePairs(obj_dataTable);
});

Then('the result should be', (dataTable: DataTable) => {
    
    const exp_obj_dataTable = createObjectFromTransposedDataTable(dataTable);
    const resultObject = Object.fromEntries(result);    
    cy.log(`resultObject: ${CommonUtils.toJSONString(resultObject,{ unformatted: false })}`);
    cy.log(`expected: ${CommonUtils.toJSONString(exp_obj_dataTable,{ unformatted: false })}`);

    expect(resultObject).to.deep.equal(exp_obj_dataTable);
});

Given('I have two objects, described in a transposed datatable and json', (dataTable: DataTable) => {
    obj1 = JSON.parse(dataTable.rowsHash().obj1);
    obj2 = JSON.parse(dataTable.rowsHash().obj2);

    cy.log(`obj1: ${CommonUtils.toJSONString(obj1,{ unformatted: false })}`);
    cy.log(`obj2: ${CommonUtils.toJSONString(obj2,{ unformatted: false })}`);
});

When('I compare the two objects - compareObjectsByKeyValuePairs method', function () {
    result = MappingUtils.compareObjectsByKeyValuePairs(obj1, obj2);
    cy.log(`result: ${CommonUtils.toJSONString(result,{ unformatted: false })}`);
});

When('I compare the two objects - compareObjectsByKeyValuePairs_v2 method', function () {
    result = MappingUtils.compareObjectsByKeyValuePairs_v2(obj1, obj2);
    cy.log(`result: ${CommonUtils.toJSONString(result,{ unformatted: false })}`);
});

Then('the result should have', (dataTable: DataTable) => {
    const expected = dataTable.rowsHash();
    expect(result.matchCount).to.equal(parseInt(expected.matchCount));
    expect(result.matchPercentage).to.equal(parseFloat(expected.matchPercentage));
    expect(result.totalProperties).to.equal(parseInt(expected.totalProperties));
    expect(result.matchedProperties).to.deep.equal(JSON.parse(expected.matchedProperties));
});