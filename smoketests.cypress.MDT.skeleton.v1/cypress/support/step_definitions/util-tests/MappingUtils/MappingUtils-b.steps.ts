import { Given, When, Then, Before, After, DataTable } from "@badeball/cypress-cucumber-preprocessor";
import CommonUtils from 'cypress/support/utils/common-utils';
import { PickleTable, PickleTableCell, PickleTableRow, DataTableUtils } from '../../../utils/datatable/DataTableUtils'; // Path to your DataTableConverter class
import MappingUtils from "cypress/support/utils/MappingUtils";
import { PlaceOfEducation } from "cypress/support/utils/env/ApplyData";

export interface WorkExperience {
    companyName: string;
    position: string;
    StartDate: string;
    EndDate: string;
    responsibilities: string;
}

const alphaNumericRegex = /^[A-Za-z0-9\r\n]+$/;

let recordData: Record<string, string>;
let placeOfEducation: PlaceOfEducation;
let workExperience: WorkExperience;
let resultAny: any;
let targetObj:any;

Given('a RecordData object with properties', (dataTable: DataTable) => {
    recordData = {};
    dataTable.raw().forEach(([key, value]) => {
        recordData[key] = value;
    });
});

Given('a substitute object with empty properties - PlaceOfEducation', (dataTable: DataTable) => {
    placeOfEducation = {} as PlaceOfEducation;
    dataTable.raw().forEach(([key, value]) => {
        placeOfEducation[key as keyof PlaceOfEducation] = value;
    });
});

Given('a substitute object with properties - PlaceOfEducation', (dataTable: DataTable) => {
    placeOfEducation = {} as PlaceOfEducation;
    dataTable.raw().forEach(([key, value]) => {
        placeOfEducation[key as keyof PlaceOfEducation] = value;
    });
});

Given('a substitute object with properties - Target Object', (dataTable: DataTable) => {
    targetObj = {};
    dataTable.raw().forEach(([key, value]) => {
        targetObj[key] = value;
    });
});

Given('a WorkExperience object with empty properties', (dataTable: DataTable) => {
    workExperience = {} as WorkExperience;
    dataTable.raw().forEach(([key, value]) => {
        workExperience[key as keyof WorkExperience] = value;
    });
});

When('the mapRecordDataToTargetObj method is called', () => {
    resultAny = MappingUtils.mapRecordDataToTargetObj(recordData, placeOfEducation);
});

When('the MapAndParseRecordDataWithSubstituteObj method is called - PlaceOfEducation', () => {
    //let temp  = MappingUtils.mapRecordDataToTargetObj (recordData, placeOfEducation);
    resultAny = MappingUtils.mapAndParseRecordDataWithSubstituteObj (recordData, placeOfEducation);
});

When('the mapRecordDataToTargetObj method is called - WorkExperience', () => {
    resultAny = MappingUtils.mapRecordDataToTargetObj(recordData, workExperience);
});

When('the MapAndParseRecordDataWithSubstituteObj method is called - Target Object', () => {
    //let temp  = MappingUtils.mapRecordDataToTargetObj (recordData, placeOfEducation);
    resultAny = MappingUtils.mapAndParseRecordDataWithSubstituteObj (recordData, targetObj);
});

Then('the resulting PlaceOfEducation object should have properties', (dataTable: DataTable) => {
    cy.log(`resultAny: ${CommonUtils.toJSONString(resultAny)}`);
    dataTable.raw().forEach(([key, value]) => {
        expect(resultAny[key as keyof PlaceOfEducation]).to.equal(value);
    });
});

Then('the resulting WorkExperience object should have properties', (dataTable: DataTable) => {
    cy.log(`resultAny: ${CommonUtils.toJSONString(resultAny)}`);
    dataTable.raw().forEach(([key, value]) => {
        expect(resultAny[key as keyof WorkExperience]).to.equal(value);
    });
});

Then('the resulting Target Object should have properties', (dataTable: DataTable) => {
    cy.log(`resultAny: ${CommonUtils.toJSONString(resultAny)}`);
    dataTable.raw().forEach(([key, value]) => {
        expect(resultAny[key]).to.equal(value);
    });
});

Given('a DataTable object with properties', (dataTable: DataTable) => {

    //Show the output of common DataTable methods for info purposes
    cy.log(`DataTable: ${CommonUtils.toJSONString(dataTable)}`);;
    cy.log(`hashes(): ${CommonUtils.toJSONString(dataTable.hashes())}`);
    cy.log(`rows(): ${CommonUtils.toJSONString(dataTable.rows())}`);
    cy.log(`raw(): ${CommonUtils.toJSONString(dataTable.raw())}`);

    recordData = dataTable.hashes()[0];

    // Iterate over the keys of the targetObj object
   //recordData = MappingUtils.parseRecordDataSymbolToken(recordData);
});

Given('the record data contains the following values', (dataTable:DataTable) => {
    recordData = {};
    dataTable.raw().forEach(([key, value]) => {
        recordData[key] = value;
    });
});

When('the parseRecordDataSymbolToken method is called', () => {
    recordData = MappingUtils.parseRecordDataSymbolToken(recordData);
});

Then('the record data should be', (dataTable:DataTable) => {
    const expectedRecordData: Record<string, string> = {};
    dataTable.raw().forEach(([key, value]) => {
        expectedRecordData[key] = value;
    });
    cy.log(`recordData: ${CommonUtils.toJSONString(recordData)}`);
    cy.log(`expectedRecordData: ${CommonUtils.toJSONString(expectedRecordData)}`);
    expect(recordData).to.deep.equal(expectedRecordData);
});

Then(`the resulting Target Object 'Name' property should be parsed to an Alpha Numeric string containing 12 characters`, () => {
    cy.log(`resultAny: ${CommonUtils.toJSONString(resultAny)}`);
    expect(resultAny.Name.length).to.equal(12);
    expect(resultAny.Name).to.match(alphaNumericRegex);
});

Then(`the resulting Target Object 'StartDate' and 'EndDate' properties should be parsed as`, (dataTable: DataTable) => {
    cy.log(`resultAny: ${CommonUtils.toJSONString(resultAny)}`);
    dataTable.raw().forEach(([key, value]) => {
        expect(resultAny[key]).to.equal(value);
    });
});

Then(`the resulting Target Object properties with non-dynamic or invalid tokens should remain unchanged`, (dataTable: DataTable) => {
    cy.log(`resultAny: ${CommonUtils.toJSONString(resultAny)}`);
    dataTable.raw().forEach(([key, value]) => {
        expect(resultAny[key]).to.equal(value);
    });
});