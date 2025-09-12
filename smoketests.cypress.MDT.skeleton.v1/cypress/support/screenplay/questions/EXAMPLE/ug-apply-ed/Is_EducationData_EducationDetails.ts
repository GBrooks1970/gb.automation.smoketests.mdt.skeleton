import { AssertPageFieldDetails } from "cypress/support/screenplay/core/AssertPageFieldDetails";
import { FieldDetail_Assert, FieldDetail, ErrorData } from "cypress/support/screenplay/core/FieldDetail_Base";
import { User } from "cypress/support/screenplay/actors/User";
import { AssertPageFieldValidation } from "cypress/support/screenplay/core/AssertPageFieldValidation";

export class Is_EducationData_EducationDetails {
    user: User;
    constructor(user: User) {
        this.user = user;
    };

    private EducationData_EducationDetail_FieldDetails_Assert: FieldDetail_Assert[] = [
        {
            Name: 'ULN',
            Selector: '#uniqueLearnerNumber',
            ValueType: FieldDetail.ValueType.AlphaNumeric,
            AssertionProcess: FieldDetail.AssertionProcess.WithinPageElement,
            AssertionTarget: FieldDetail.AssertionTarget.value,
            AssertionType: FieldDetail.AssertionType.equal
        },
        {
            Name: 'HighestExpectedQualification',
            Selector: '[id="HEQ"]',
            ValueType: FieldDetail.ValueType.AlphaNumeric,
            AssertionProcess: FieldDetail.AssertionProcess.WithinPageElement,
            AssertionTarget: FieldDetail.AssertionTarget.selected,
            AssertionType: FieldDetail.AssertionType.equal
        }
    ];

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

    private ALL_ErrorFieldData: Record<string, Record<string, ErrorData>> = {
        ULN: this.ULN_ErrorFieldData,
    };

    SavedCorrectly(recordData: Record<string, string>) {

        return {
            answeredBy: () => {
                let fieldDetails = this.EducationData_EducationDetail_FieldDetails_Assert;
                this.user.asks(new AssertPageFieldDetails(this.user).usingFieldDetailsAndRecordData(recordData, fieldDetails));
            },
        };

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