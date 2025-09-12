import { dateFormat } from "cypress/support/utils/date-utils";
import { User } from "cypress/support/screenplay/actors/User";
import { ErrorData, FieldDetail, FieldDetail_Assert } from "cypress/support/screenplay/core/FieldDetail_Base";
import { AssertPageFieldDetails } from "cypress/support/screenplay/core/AssertPageFieldDetails";
import { AssertPageFieldValidation } from "cypress/support/screenplay/core/AssertPageFieldValidation";


export class Is_EducationData_PlaceOfEducation {
    user: User;
    constructor(user: User) {
        this.user = user;
    };


    private EducationData_PlaceOfEducation_FieldDetails_Assert: FieldDetail_Assert[] = [
        {
            Name: 'Name',
            Selector: '#centreName',
            ValueType: FieldDetail.ValueType.AlphaNumeric,
            AssertionProcess: FieldDetail.AssertionProcess.WithinPageElement,
            AssertionTarget: FieldDetail.AssertionTarget.value,
            AssertionType: FieldDetail.AssertionType.equal
        },
        {
            Name: 'StartDate',
            Selector: 'div#PlaceOfStudyModal select#monthstart',
            ValueType: FieldDetail.ValueType.Date,
            dateFormat: dateFormat.mm,
            defaultValue: 'MM',
            //dateIndexAdjustment: -1 // Adjusting month by -1 here to adjust as selection page element begins with Jan at index 0,
            AssertionProcess: FieldDetail.AssertionProcess.WithinPageElement,
            AssertionTarget: FieldDetail.AssertionTarget.selected,
            AssertionType: FieldDetail.AssertionType.equal
        },
        {
            Name: 'StartDate',
            Selector: 'div#PlaceOfStudyModal select#yearstart',
            ValueType: FieldDetail.ValueType.Date,
            dateFormat: dateFormat.yyyy,
            defaultValue: 'YYYY',
            AssertionProcess: FieldDetail.AssertionProcess.WithinPageElement,
            AssertionTarget: FieldDetail.AssertionTarget.selected,
            AssertionType: FieldDetail.AssertionType.equal
        },
        {
            Name: 'EndDate',
            Selector: "div#PlaceOfStudyModal select#monthend",
            ValueType: FieldDetail.ValueType.Date,
            dateFormat: dateFormat.mm,
            defaultValue: 'MM',
            //dateIndexAdjustment: -1 // Adjusting month by -1 here to adjust as selection page element begins with Jan at index 0,
            AssertionProcess: FieldDetail.AssertionProcess.WithinPageElement,
            AssertionTarget: FieldDetail.AssertionTarget.selected,
            AssertionType: FieldDetail.AssertionType.equal
        },
        {
            Name: 'EndDate',
            Selector: "div#PlaceOfStudyModal select#yearend",
            ValueType: FieldDetail.ValueType.Date,
            dateFormat: dateFormat.yyyy,
            defaultValue: 'YYYY',
            AssertionTarget: FieldDetail.AssertionTarget.selected,
            AssertionProcess: FieldDetail.AssertionProcess.WithinPageElement,
            AssertionType: FieldDetail.AssertionType.equal
        },
        {
            Name: 'StudyType',
            Selector: 'RadioButton',
            ValueType: FieldDetail.ValueType.AlphaNumeric,
            AssertionProcess: FieldDetail.AssertionProcess.WithinRadioButtonElement,
            AssertionTarget: FieldDetail.AssertionTarget.selected,
            AssertionType: FieldDetail.AssertionType.equal,
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
            AssertionProcess: FieldDetail.AssertionProcess.WithinRadioButtonElement,
            AssertionTarget: FieldDetail.AssertionTarget.value,
            AssertionType: FieldDetail.AssertionType.equal,
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

    IsPresent(recordData: Record<string, string>, stored: boolean = true) {
        return {
            answeredBy: () => {
                if (stored)
                    this.user.asks(this.SavedCorrectly(recordData));
                else
                    cy.log("Method not implemented. --- Query NOT Assert");
            }
        };
    }
    
    SavedCorrectly(recordData: Record<string, string>) {

        // cy.log(`Refreshing Page`);
        // cy.reload();
        // cy.wait(reloadWait);

        return {
            answeredBy: () => {
                let fieldDetails = this.EducationData_PlaceOfEducation_FieldDetails_Assert;
                this.user.asks(new AssertPageFieldDetails(this.user).usingFieldDetailsAndRecordData(recordData, fieldDetails));
            },
        };

    };


    private ULNFormSelector: string = '#section--content > ng-component > ng-component > section > div.content.content-section.prose > education-section > form';
    private ULN_ErrorFieldData: Record<string, ErrorData> = {
        "Invalid":
        {
            Description: 'Unique Learner Number - Invalid',
            Selector: this.ULNFormSelector + ' > invalid-uln-error > span'
        },
        "MinLength":
        {
            Description: 'Unique Learner Number - Min Length',
            Selector: this.ULNFormSelector + ' > apply-form-text-v2 > validator-output > div > min-length-error > span'
        },
        "MaxLength":
        {
            Description: 'Unique Learner Number - Max Length',
            Selector: this.ULNFormSelector + ' > apply-form-text-v2 > validator-output > div > max-length-error > span'
        },
        "CharacterValidation":
        {
            Description: 'Unique Learner Number - Character Validation',
            Selector: this.ULNFormSelector + ' > apply-form-text-v2 > validator-output > div > character-validation-error > span'
        }
    };

    private POEName_ErrorFieldData: Record<string, ErrorData> = {
        "NoValue":
        {
            Description: 'Place Of Education Name - No Value',
            Selector: '#mandatoryErrorMessage'
        },
        "OverlappingPOE":
        {
            Description: 'Place Of Education Name - Full-time at more than one',
            Selector: '#mandatoryErrorMessage'
        },
        "TwoOrMorePOE":
        {
            Description: 'Place Of Education Name - Attended two or more different',
            Selector: '#mandatoryErrorMessage'
        },
        "NoQualifications":
        {
            Description: 'Place Of Education Name - Attended two or more different',
            Selector: '#mandatoryErrorMessage'
        },
        
    };
    private startDate_ErrorFieldData: Record<string, ErrorData> = {
        "NoValue":
        {
            Description: 'Start Date - No Value',
            Selector: '#mandatoryErrorMessage'
        },
    };
    private endDate_ErrorFieldData: Record<string, ErrorData> = {
        "NoValue":
        {
            Description: 'End Date - No Value',
            Selector: '#mandatoryErrorMessage'
        },
        "BeforeStartDate":
        {
            Description: 'End Date - Before Start Date',
            Selector: '#mandatoryErrorMessage'
        },
    };
    private studyType_ErrorFieldData: Record<string, ErrorData> = {
        "NoValue":
        {
            Description: 'Type Of Study - No Value',
            Selector: '#mandatoryErrorMessage'
        },
    };
    private qualifications_ErrorFieldData: Record<string, ErrorData> = {
        "NoValue":
        {
            Description: 'Qualifications - No Value',
            Selector: '#mandatoryErrorMessage'
        },
    };

    private ALL_ErrorFieldData: Record<string, Record<string, ErrorData>> = {
        ULN: this.ULN_ErrorFieldData,
        Name: this.POEName_ErrorFieldData,
        StartDate: this.startDate_ErrorFieldData,
        EndDate: this.endDate_ErrorFieldData,
        StudyType: this.studyType_ErrorFieldData,
        Qualifications: this.qualifications_ErrorFieldData,
    };

    ValidationErrorMessagePresent(errorMessage: string, errorType: string, errorField: string) {

        cy.log(`errorMessage : ${errorMessage}`);
        cy.log(`errorType : ${errorType}`);
        cy.log(`errorField : ${errorField}`);

        return {
            answeredBy: () => {
                this.user.asks(new AssertPageFieldValidation(this.user).UsingErrorFieldDataAndErrorDetails(this.ALL_ErrorFieldData, errorMessage, errorType, errorField, true));
            },
        };
    };
};