

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

export class Manage_EducationData_PlaceOfEducation {
    user: User;
    constructor(user: User) {
        this.user = user;
    };


    private EducationData_PlaceOfEducation_FieldDetails: FieldDetail_Input[] = [
        {
            Name: 'Name',
            Selector: '#centreName',
            ValueType: FieldDetail.ValueType.AlphaNumeric,
            InputType: FieldDetail.InputType.PredictiveEntry,
            PredictiveEntrySelector: "div#PlaceOfStudyModal ul#autosuggest-result li"
        },
        {
            Name: 'StartDate',
            Selector: 'div#PlaceOfStudyModal select#monthstart',
            ValueType: FieldDetail.ValueType.Date,
            InputType: FieldDetail.InputType.Dropdown,
            dateFormat: dateFormat.mm,
            defaultValue: 'MM',
            //dateIndexAdjustment: -1 // Adjusting month by -1 here to adjust as selection page element begins with Jan at index 0
        },
        {
            Name: 'StartDate',
            Selector: 'div#PlaceOfStudyModal select#yearstart',
            ValueType: FieldDetail.ValueType.Date,
            InputType: FieldDetail.InputType.Dropdown,
            dateFormat: dateFormat.yyyy,
            defaultValue: 'YYYY'
        },
        {
            Name: 'EndDate',
            Selector: "div#PlaceOfStudyModal select#monthend",
            ValueType: FieldDetail.ValueType.Date,
            InputType: FieldDetail.InputType.Dropdown,
            dateFormat: dateFormat.mm,
            defaultValue: 'MM',
            //dateIndexAdjustment: -1 // Adjusting month by -1 here to adjust as selection page element begins with Jan at index 0
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
            Name: 'StudyType',
            Selector: 'RadioButton',
            ValueType: FieldDetail.ValueType.AlphaNumeric,
            InputType: FieldDetail.InputType.RadioButton,
            radioButtonSelectors: {
                options:
                    [{
                        Name: 'Full time',
                        Selector: '#typeOfStudy_FT'
                    },
                    {
                        Name: 'Part time',
                        Selector: '#typeOfStudy_PT'
                    },
                    {
                        Name: 'Sandwich',
                        Selector: '#typeOfStudy_SW'
                    }]
            }
        },
        {
            Name: 'Qualifications',
            Selector: 'RadioButton',
            ValueType: FieldDetail.ValueType.AlphaNumeric,
            InputType: FieldDetail.InputType.RadioButton,
            radioButtonSelectors: {
                options: [
                    {
                        Name: 'Yes',
                        Selector: '#qualsAtThisCentre_Y',
                    },
                    {
                        Name: 'No',
                        Selector: '#qualsAtThisCentre_N'
                    }]
            }
        }
    ];

    private AddPlaceOfEducation() {
        return {
            performAs: () => {
                cy.log('this.user.attemptsTo(Button.Click(addPlaceOfEducationButton));')
                //TEST-DEBUG-COMMENT - Commented out for TEST purposes
                // this.user.attemptsTo(Button.Click(addPlaceOfEducationButton));
                // this.user.waitsFor(pageLoadWait);
            }
        };
    };

    InputUsingRecordData(recordData: Record<string, string>) {
        return {
            performAs: () => {
                this.user.attemptsTo(this.AddPlaceOfEducation());
                fieldDetails = this.EducationData_PlaceOfEducation_FieldDetails;
                this.user.attemptsTo(new InputPageFieldDetails(this.user).usingFieldDetailsAndRecordData(recordData, fieldDetails));
            }
        }
    };

    SavePlaceOfEducation() {
        return {
            performAs: () => {
                cy.log('this.user.attemptsTo(Button.Click(saveBtn));');
                //TEST-DEBUG-COMMENT - Commented out for TEST purposes
                //this.user.attemptsTo(Button.Click(saveBtn));
                //this.user.waitsFor(afterSaveWait);
            }
        };
    };

    ExpandPlaceOfEducationCardByIndex(index: number) {
        return {
            performAs: () => {
                cy.log('this.user.attemptsTo(Button.Click(ExpandPlaceOfEducationCardByIndex));');

                //TEST-DEBUG-COMMENT - Commented out for TEST purposes
                // const placeOfEducationMoreButton = `button[aria-controls='card-item-buttons-${index}']`;
                // cy.get(cardsPlaceOfEducation)
                //     .then(($cards) => {
                //         cy.wrap($cards.eq(index).find(placeOfEducationMoreButton)).click();
                //     });
            }
        };
    };


    DeletePlaceOfEducationByIndex(index: number) {
        return {
            performAs: () => {
                this.user.attemptsTo(this.ExpandPlaceOfEducationCardByIndex(index));

                cy.log('this.user.attemptsTo(Button.Click(deletePlaceOfEducationCardItem));');
                //TEST-DEBUG-COMMENT - Commented out for TEST purposes
                // this.user.attemptsTo(Button.Click(deletePlaceOfEducationCardItem));
                // //Assertion
                // cy.get(dialogPlaceOfEducation).should("be.visible");
            }
        };
    };

    DeleteConfirm(yes: boolean = true) {
        return {
            performAs: () => {
                cy.log('this.user.attemptsTo(Button.Click(confirmDeleteButton));');
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