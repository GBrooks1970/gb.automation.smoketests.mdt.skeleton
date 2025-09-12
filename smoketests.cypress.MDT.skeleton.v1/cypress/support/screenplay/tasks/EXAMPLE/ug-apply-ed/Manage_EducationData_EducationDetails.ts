import { EducationDetails } from 'cypress/support/utils/env/ApplyData';
import { DataTable } from "@badeball/cypress-cucumber-preprocessor";
import { InputPageFieldDetails } from '../../../core/InputPageFieldDetails';
import CommonUtils from 'cypress/support/utils/common-utils';
import { FieldDetail_Assert, FieldDetail_Input, FieldDetail } from '../../../core/FieldDetail_Base';
import { User } from 'cypress/support/screenplay/actors/User';
import { Button } from 'cypress/support/screenplay/interactions/DOM.interactions';

let fieldDetails: FieldDetail_Input[];

const saveBtn = `#save`;
const afterSaveWait = 1000;

export class Manage_EducationData_EducationDetails {
    user: User;
    constructor(user: User) {
        this.user = user;
    };

    private EducationData_EducationDetail_FieldDetails: FieldDetail_Input[] = [
        {
            Name: 'ULN',
            Selector: '#uniqueLearnerNumber',
            ValueType: FieldDetail.ValueType.AlphaNumeric,
            InputType: FieldDetail.InputType.Fill,
            ClearBeforeInput: true,
        },
        {
            Name: 'HighestExpectedQualification',
            Selector: '[id="HEQ"]',
            ValueType: FieldDetail.ValueType.AlphaNumeric,
            InputType: FieldDetail.InputType.Dropdown,
        }
    ];


    InputUsingRecordData(recordData: Record<string, string>) {
        return {
            performAs: () => {
                fieldDetails = this.EducationData_EducationDetail_FieldDetails;
                this.user.attemptsTo(new InputPageFieldDetails(this.user).usingFieldDetailsAndRecordData(recordData, fieldDetails));
            }
        }
    };

    SaveEducationDetails() {
        return {
            performAs: () => {
                cy.log('this.user.attemptsTo(Click.button(saveBtn));')
                //TEST-DEBUG-COMMENT - Commented out for TEST purposes
                //this.user.attemptsTo(Click.button(saveBtn));
                this.user.waitsFor(afterSaveWait);
            }
        };
    };

};