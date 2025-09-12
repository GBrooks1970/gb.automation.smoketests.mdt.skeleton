import { User } from "../actors/User";
import { ErrorData, FieldDetail, FieldDetail_Assert } from "cypress/support/screenplay/core/FieldDetail_Base";

export class AssertPageFieldValidation {
    user: User;
    constructor(user: User) {
      this.user = user;
    };
    
    UsingErrorFieldDataAndErrorDetails(ALL_ErrorFieldData: Record<string, Record<string, ErrorData>>, errorMessage: string, errorType: string, errorField: string, TEST: boolean = false) {
        let errorFieldSelector: string;
        return {
            answeredBy: () => {
                if (errorField in ALL_ErrorFieldData) {
                    let ErrorFieldData = ALL_ErrorFieldData[errorField];

                    if (errorType in ErrorFieldData) {
                        cy.log(`Key ${errorType} exists in the dictionary.`);
                        cy.log(ErrorFieldData[errorType].Description);
                        errorFieldSelector = ErrorFieldData[errorType].Selector;
                    } else {
                        cy.log(`Key ${errorType} doesn't exist in the dictionary.`);
                        throw new Error(`Invalid Error Type ${errorType}`);
                    };

                    cy.log(`ErrorDesc : ${ErrorFieldData[errorType].Description}`);
                    cy.log(`Selector : ${ErrorFieldData[errorType].Selector}`);
                    cy.log(`ErrorMessage : ${errorMessage}`);

                    if (TEST) {
                        cy.log(`cy.get(errorFieldSelector).invoke('text').then(($text) => {expect...}`);
                    } else {                    
                        cy.get(errorFieldSelector)
                            .invoke('text')
                            .then(($text) => {
                                expect($text.trim().replace(/\n/g, ' ')).to.equal(errorMessage);
                            });
                    };
                } else {
                    cy.log(`Key ${errorField} doesn't exist in the dictionary. ${ALL_ErrorFieldData.keys} `);
                    throw new Error(`Invalid Error Field ${errorField}`);
                };
            },
        };
    };
};