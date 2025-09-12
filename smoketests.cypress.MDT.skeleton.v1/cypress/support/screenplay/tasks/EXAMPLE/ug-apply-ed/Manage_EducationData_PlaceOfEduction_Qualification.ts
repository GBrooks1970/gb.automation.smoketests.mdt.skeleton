

import { InputPageFieldDetails } from 'cypress/support/screenplay/core/InputPageFieldDetails';
import { FieldDetail_Input, FieldDetail } from 'cypress/support/screenplay/core/FieldDetail_Base';
import { User } from 'cypress/support/screenplay/actors/User';
import { dateFormat } from 'cypress/support/utils/date-utils';



const addPlaceOfEducationButton = "button[id^='add-carditem']";
const deletePlaceOfEducationCardItem = "div#multiactionButtonContainer button[id^='delete-card-item-button']";
const dialogPlaceOfEducation = "aside[role='dialog']";
const cardsPlaceOfEducation = "education-section article[id^='cardItemArticle-']";
const confirmDeleteButton = {
    Yes: "#message > div.buttons > div > button.button.button--small.button--primary.spinner",
    No: "aside[role='dialog'] button.button--secondary"
};

let fieldDetails: FieldDetail_Input[];

const saveBtn = "div#PlaceOfStudyModal button#save";
const afterSaveWait = 1000;
const pageLoadWait = 500;

const toastMessageTimeout = 3000;
const afterDeleteWait = 1000;

export class Manage_EducationData_PlaceOfEduction_Qualification {
    user: User;
    constructor(user: User) {
        this.user = user;
    };


    private EducationData_PlaceOfEducation_Qualification_FieldDetails: FieldDetail_Input[] = [
        {
            Name: 'QualName',
            Selector: '#centreName',
            ValueType: FieldDetail.ValueType.AlphaNumeric,
            InputType: FieldDetail.InputType.PredictiveEntry,
            PredictiveEntrySelector: "div#PlaceOfStudyModal ul#autosuggest-result li"
        },
        {
            Name: 'QualDate',
            Selector: 'div#PlaceOfStudyModal select#monthstart',
            ValueType: FieldDetail.ValueType.Date,
            InputType: FieldDetail.InputType.Dropdown,
            dateFormat: dateFormat.mm,
            defaultValue: 'MM',
            //dateIndexAdjustment: -1 // Adjusting month by -1 here to adjust as selection page element begins with Jan at index 0
        },
        {
            Name: 'QualDate',
            Selector: 'div#PlaceOfStudyModal select#yearstart',
            ValueType: FieldDetail.ValueType.Date,
            InputType: FieldDetail.InputType.Dropdown,
            dateFormat: dateFormat.yyyy,
            defaultValue: 'YYYY'
        },
        {
            Name: 'QualTitle',
            Selector: '#title',
            ValueType: FieldDetail.ValueType.Date,
            InputType: FieldDetail.InputType.Fill,
        },
        {
            Name: 'EndDate',
            Selector: "div#PlaceOfStudyModal select#yearend",
            ValueType: FieldDetail.ValueType.Date,
            InputType: FieldDetail.InputType.Dropdown,
            dateFormat: dateFormat.yyyy,
            defaultValue: 'YYYY'
        },
        {
            Name: 'AwardingBody',
            Selector: '#AwardingBody',
            ValueType: FieldDetail.ValueType.AlphaNumeric,
            InputType: FieldDetail.InputType.Dropdown,
        },
        {
            Name: 'AwardingBodyOther',
            Selector: '#AwardingBodyOther',
            ValueType: FieldDetail.ValueType.AlphaNumeric,
            InputType: FieldDetail.InputType.Fill,
        },
        {
            Name: 'Grade',
            Selector: '#grade',
            ValueType: FieldDetail.ValueType.AlphaNumeric,
            InputType: FieldDetail.InputType.Fill,
        },
        {
            Name: 'GradeOther',
            Selector: '#gradeOther',
            ValueType: FieldDetail.ValueType.AlphaNumeric,
            InputType: FieldDetail.InputType.Fill,
        },
    ];

    private AddQualificationToPlaceOfEducation(POE_Name:string) {
        return {
            performAs: () => {
                cy.log(`AddQualificationToPlaceOfEducation(${POE_Name})`);
                //TEST-DEBUG-COMMENT - Commented out for TEST purposes
                // this.user.attemptsTo(Button.Click(addPlaceOfEducationButton));
                // this.user.waitsFor(pageLoadWait);
            }
        };
    };

    InputUsingRecordData(recordData: Record<string, string>) {
        return {
            performAs: () => {
                let POE_Name = recordData['Name'];
                this.user.attemptsTo(this.AddQualificationToPlaceOfEducation(POE_Name));
                fieldDetails = this.EducationData_PlaceOfEducation_Qualification_FieldDetails;
                this.user.attemptsTo(new InputPageFieldDetails(this.user).usingFieldDetailsAndRecordData(recordData, fieldDetails));
            }
        }
    };

    SaveQualificationToPlaceOfEducation() {
        return {
            performAs: () => {
                cy.log(`SaveQualificationToPlaceOfEducation()`);
                //TEST-DEBUG-COMMENT - Commented out for TEST purposes
                //this.user.attemptsTo(Button.Click(saveBtn));
                //this.user.waitsFor(afterSaveWait);
            }
        };
    };

    
    DeleteQualificationFromPlaceOfEducation(POE_Name:string,index: number) {
        return {
            performAs: () => {
                cy.log(`DeleteQualificationFromPlaceOfEducation(${POE_Name},${index})`);
            }
        };
    };

    DeleteConfirm(yes: boolean = true) {
        return {
            performAs: () => {
                cy.log(`DeleteConfirm(${yes})`);
                //TEST-DEBUG-COMMENT - Commented out for TEST purposes
                // if (yes)
                //     this.user.attemptsTo(Button.Click(confirmDeleteButton.Yes));
                // else
                //     this.user.attemptsTo(Button.Click(confirmDeleteButton.No));
                // this.user.waitsFor(afterDeleteWait);
            }
        };
    };

};