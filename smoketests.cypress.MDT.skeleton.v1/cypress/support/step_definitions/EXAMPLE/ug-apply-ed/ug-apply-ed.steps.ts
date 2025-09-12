
import { Given, When, Then, Before, DataTable, After, } from "@badeball/cypress-cucumber-preprocessor";
import { User } from '../../../screenplay/actors/User';
import { EnvDataUtil } from '../../../utils/env/EnvDataUtil';
import CommonUtils from "../../../utils/common-utils";
import { EducationDetails, EDQualification, PlaceOfEducation } from "../../../utils/env/ApplyData";
import { Manage_EducationData_EducationDetails } from "cypress/support/screenplay/tasks/EXAMPLE/ug-apply-ed/Manage_EducationData_EducationDetails";
import { Is_EducationData_EducationDetails } from "cypress/support/screenplay/questions/EXAMPLE/ug-apply-ed/Is_EducationData_EducationDetails";
import { Manage_EducationData_PlaceOfEducation } from "cypress/support/screenplay/tasks/EXAMPLE/ug-apply-ed/Manage_EducationData_PlaceOfEducation";
import { Is_EducationData_PlaceOfEducation } from "cypress/support/screenplay/questions/EXAMPLE/ug-apply-ed/Is_EducationData_PlaceOfEducation";
import { Manage_EducationData_PlaceOfEduction_Qualification } from "cypress/support/screenplay/tasks/EXAMPLE/ug-apply-ed/Manage_EducationData_PlaceOfEduction_Qualification";
import { DataPickerUtil } from "cypress/support/utils/DataPickerUtil";
import MappingUtils from "cypress/support/utils/MappingUtils";

/// TEST-DEBUG-COMMENT
/// FEATURE FILES IMPLEMENTED --- UG_APPLY_ED_A to UG_APPLY_ED_F
///

let envData: EnvDataUtil = new EnvDataUtil();
let user: User;
let recordData: Record<string, string>;
let mappedRecordData: any[] = [];

let UG_APPLY_ED_currentEducationDetails: EducationDetails;
let UG_APPLY_ED_PlaceOfEducation: PlaceOfEducation[] = [];

let UG_APPLY_ED_A_001_dataPickerUtil: DataPickerUtil<EducationDetails>;
let UG_APPLY_ED_A_001_setup: boolean;
let UG_APPLY_ED_A_001_initial: EducationDetails[];

export type scenario_context<dataType> =
    {
        dataPickerUtil?: DataPickerUtil<dataType>,
        setup: boolean,
        initial: any[],
    };

let UG_APPLY_ED_A_001: scenario_context<EducationDetails> = {
    dataPickerUtil: undefined,
    setup: false,
    initial: [],
};

let UG_APPLY_ED_C_001: scenario_context<PlaceOfEducation> = {
    dataPickerUtil: undefined,
    setup: false,
    initial: [],
};

let UG_APPLY_ED_D_001: scenario_context<PlaceOfEducation> = {
    dataPickerUtil: undefined,
    setup: false,
    initial: [],
};

Before({ tags: "@runBeforeHook_UG_APPLY_ED_A_001" }, () => {
    cy.log("Before - @runBeforeHook_UG_APPLY_ED_A_001");

    if (!UG_APPLY_ED_A_001.setup) {
        cy.log("Running initial setup step. runBeforeHook_UG_APPLY_ED_A...");
        UG_APPLY_ED_A_001.setup = true;
        UG_APPLY_ED_A_001.initial = envData.applyData.getAllEducationDetails();
        UG_APPLY_ED_A_001.dataPickerUtil = new DataPickerUtil(UG_APPLY_ED_A_001.initial);
    };

    if (UG_APPLY_ED_A_001.dataPickerUtil)
        UG_APPLY_ED_currentEducationDetails = UG_APPLY_ED_A_001.dataPickerUtil.getRandomMemberWithoutRepetition();

    //cy.log(`UG_APPLY_ED_A_001.initialEducationDetails: ${CommonUtils.toJSONString(UG_APPLY_ED_A_001.initial)}`);
    cy.log(`UG_APPLY_ED_currentPick: ${CommonUtils.toJSONString(UG_APPLY_ED_currentEducationDetails)}`);
});

Before({ tags: "@runBeforeHook_UG_APPLY_ED_B_001" }, () => {
    cy.log("Before - @runBeforeHook_UG_APPLY_ED_B_001");

    if (!UG_APPLY_ED_A_001.setup) {
        cy.log("Running initial setup step. runBeforeHook_UG_APPLY_ED_B_001...");
        UG_APPLY_ED_A_001.setup = true;
        UG_APPLY_ED_A_001.initial = envData.applyData.getAllEducationDetails();
        UG_APPLY_ED_A_001.dataPickerUtil = new DataPickerUtil(UG_APPLY_ED_A_001.initial);
    };

    if (UG_APPLY_ED_A_001.dataPickerUtil)
        UG_APPLY_ED_currentEducationDetails = UG_APPLY_ED_A_001.dataPickerUtil.getRandomMemberWithoutRepetition();

    //cy.log(`UG_APPLY_ED_A_001.initialEducationDetails: ${CommonUtils.toJSONString(UG_APPLY_ED_A_001.initial)}`);
    cy.log(`UG_APPLY_ED_currentPick: ${CommonUtils.toJSONString(UG_APPLY_ED_currentEducationDetails)}`);
});

Before({ tags: "@runBeforeHook_UG_APPLY_ED_C_001" }, () => {
    cy.log("Before - @runBeforeHook_UG_APPLY_ED_C_001");

    if (!UG_APPLY_ED_C_001.setup) {
        cy.log("Running initial setup step. runBeforeHook_UG_APPLY_ED_C_001...");
        UG_APPLY_ED_C_001.setup = true;
        UG_APPLY_ED_C_001.initial = envData.applyData.getAllPlacesOfEducation();
        UG_APPLY_ED_C_001.dataPickerUtil = new DataPickerUtil(UG_APPLY_ED_C_001.initial);
    };

    if (UG_APPLY_ED_C_001.dataPickerUtil)
        UG_APPLY_ED_PlaceOfEducation[0] = UG_APPLY_ED_C_001.dataPickerUtil.getRandomMemberWithoutRepetition();

    //cy.log(`UG_APPLY_ED_C_001.initialEducationDetails: ${CommonUtils.toJSONString(UG_APPLY_ED_C_001.initial)}`);
    cy.log(`UG_APPLY_ED_PlaceOfEducation[0]: ${CommonUtils.toJSONString(UG_APPLY_ED_PlaceOfEducation[0])}`);
});

Before({ tags: "@runBeforeHook_UG_APPLY_ED_D_001" }, () => {
    cy.log("Before - @runBeforeHook_UG_APPLY_ED_D_001");

    if (!UG_APPLY_ED_D_001.setup) {
        cy.log("Running initial setup step. runBeforeHook_UG_APPLY_ED_D_001...");
        UG_APPLY_ED_D_001.setup = true;
        UG_APPLY_ED_D_001.initial = envData.applyData.getAllPlacesOfEducation();
        UG_APPLY_ED_D_001.dataPickerUtil = new DataPickerUtil(UG_APPLY_ED_D_001.initial);
    };

    if (UG_APPLY_ED_D_001.dataPickerUtil)
        UG_APPLY_ED_PlaceOfEducation[0] = UG_APPLY_ED_D_001.dataPickerUtil.getRandomMemberWithoutRepetition();

    //cy.log(`UG_APPLY_ED_C_001.initialEducationDetails: ${CommonUtils.toJSONString(UG_APPLY_ED_C_001.initial)}`);
    cy.log(`UG_APPLY_ED_PlaceOfEducation[0]: ${CommonUtils.toJSONString(UG_APPLY_ED_PlaceOfEducation[0])}`);
});

Given('the User is a Registered Student User With an Unsubmitted UG Application', () => {
    user = User.fromFixture(envData, `Student.unsubmittedUser001`);
});

When('the User inputs Education Details with the details', (dataTable: DataTable) => {
    recordData = dataTable.hashes()[0];

    //Map/Parse the tokens from the dataTable to sustitute values
    mappedRecordData[0] = MappingUtils.mapAndParseRecordDataWithSubstituteObj(recordData, UG_APPLY_ED_currentEducationDetails);
    cy.log(`mappedRecordData[0]: ${CommonUtils.toJSONString(mappedRecordData[0])}`);

    //Input the resulting recordData into the application
    user.attemptsTo(new Manage_EducationData_EducationDetails(user).InputUsingRecordData(mappedRecordData[0]));
});

When('the User saves the Education Details', () => {
    user.attemptsTo(new Manage_EducationData_EducationDetails(user).SaveEducationDetails());
});

When('the User saves the Place of Education', () => {
    user.attemptsTo(new Manage_EducationData_PlaceOfEducation(user).SavePlaceOfEducation());
});

Then('the User Education Details have been stored correctly', () => {
    user.asks(new Is_EducationData_EducationDetails(user).SavedCorrectly(mappedRecordData[0]));
});

Then('the {string} message for {string} type is reported for the {string} field in the Education Details', (errorMessage: string, errorType: string, errorField: string) => {
    user.asks(new Is_EducationData_EducationDetails(user).ValidationErrorMessagePresent(errorMessage, errorType, errorField));
});

When("the User inputs Place of Education with the details", (dataTable: DataTable) => {
    let Index = 0;
    Input_POE(dataTable, Index);
});

When("the User inputs a Second Place of Education with the details", (dataTable: DataTable) => {
    let Index = 1;
    //Get a second Place Of Education  
    if (UG_APPLY_ED_D_001.dataPickerUtil)
        UG_APPLY_ED_PlaceOfEducation[Index] = UG_APPLY_ED_D_001.dataPickerUtil.getRandomMemberWithoutRepetition();
    cy.log(`UG_APPLY_ED_PlaceOfEducation[${Index}]: ${CommonUtils.toJSONString(UG_APPLY_ED_PlaceOfEducation[Index])}`);
    Input_POE(dataTable, Index);
});
When("the User inputs updated Place of Education with the details", (dataTable: DataTable) => {
    let Index = 1;
    //Get a second Place Of Education   
    if (UG_APPLY_ED_D_001.dataPickerUtil)
        UG_APPLY_ED_PlaceOfEducation[Index] = UG_APPLY_ED_D_001.dataPickerUtil.getRandomMemberWithoutRepetition();
    cy.log(`UG_APPLY_ED_PlaceOfEducation[${Index}]: ${CommonUtils.toJSONString(UG_APPLY_ED_PlaceOfEducation[Index])}`);
    Input_POE(dataTable, Index);
});

Then('the Place of Education has been stored correctly', () => {
    user.asks(new Is_EducationData_PlaceOfEducation(user).SavedCorrectly(mappedRecordData[0]));
});

Then('the updated Place of Education has been stored correctly', () => {
    user.asks(new Is_EducationData_PlaceOfEducation(user).SavedCorrectly(mappedRecordData[1]));
});

Then('the {string} message for {string} type is reported for the {string} field in the Place Of Education', (errorMessage: string, errorType: string, errorField: string) => {
    user.asks(new Is_EducationData_PlaceOfEducation(user).ValidationErrorMessagePresent(errorMessage, errorType, errorField));
});

function Input_POE(dataTable: DataTable, Index = 1): void {
    recordData = dataTable.hashes()[0];

    //Map/Parse the tokens from the dataTable to sustitute values
    mappedRecordData[Index] = MappingUtils.mapAndParseRecordDataWithSubstituteObj(recordData, UG_APPLY_ED_PlaceOfEducation[Index]);
    cy.log(`mappedRecordData[${Index}]: ${CommonUtils.toJSONString(mappedRecordData[Index])}`);

    //Input the resulting recordData into the application
    user.attemptsTo(new Manage_EducationData_PlaceOfEducation(user).InputUsingRecordData(mappedRecordData[Index]));
}

When(`the User has no Places of Education listed`, (index: number) => {
    cy.log('Not implemented');
});

When(`the User deletes Place of Education Item#{int}`, (index: number) => {
    user.attemptsTo(new Manage_EducationData_PlaceOfEducation(user).DeletePlaceOfEducationByIndex(index - 1));
});

When(`the User confirms deletion of the Place of Education`, () => {
    user.attemptsTo(new Manage_EducationData_PlaceOfEducation(user).DeleteConfirm(true));
});

When(`the User cancels deletion of the Place of Education`, () => {
    user.attemptsTo(new Manage_EducationData_PlaceOfEducation(user).DeleteConfirm(false));
});

Then(`the Place of Education has been deleted`, () => {
    user.asks(new Is_EducationData_PlaceOfEducation(user).IsPresent(mappedRecordData[0], false));
});

Then(`the Place of Education has not been deleted`, () => {
    user.asks(new Is_EducationData_PlaceOfEducation(user).IsPresent(mappedRecordData[0], true));
});

Then(`the User is unable to add Qualifications to Place of Education`, () => {
    cy.log('Not implemented');
});

When(`the User inputs a Qualification to Place of Education Item#{int} with details`, (index: number) => {
    cy.log('Not implemented');
    //user.attemptsTo(new Manage_EducationData_PlaceOfEduction_Qualification(user).InputUsingRecordData(...));
});


When(`the User inputs a Module to Qualification Item#{int} of Place of Education Item#{int} with details`, (index1: number,index2: number) => {
    cy.log('Not implemented');
});

Then(`the Qualifications for Place of Education Item#{int} are stored correctly`, (index: number) => {
    cy.log('Not implemented');
});
