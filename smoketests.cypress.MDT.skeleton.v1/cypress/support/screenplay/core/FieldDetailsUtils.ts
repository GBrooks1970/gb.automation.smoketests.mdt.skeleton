
import { Field, Select, Button } from "cypress/support/screenplay/interactions/DOM.interactions";
import CommonUtils from "cypress/support/utils/common-utils";
import { SymbolsDate, SymbolsDT, SymbolsOBS } from "cypress/support/utils/symbol-consts";
import { User } from "cypress/support/screenplay/actors/User";
import { FieldDetail_Input, FieldDetail_Assert, FieldDetail, RadioButtonSelector } from "./FieldDetail_Base";
import { DateUtil } from "cypress/support/utils/date-utils";

export class FieldDetailsUtils {
    user: User;
    constructor(user: User) {
        this.user = user;
    };

    inputFieldValue(fieldDetail_Input: FieldDetail_Input, input_fieldValue: string, TEST: boolean = false) {

        let inputType = fieldDetail_Input.InputType;

        cy.log(`FieldDetail_Input: ${CommonUtils.toJSONString(fieldDetail_Input)}`);
        cy.log(`Input Field Value: ${input_fieldValue}`);

        return {
            performAs: () => {

                if (!fieldDetail_Input.Selector && inputType !== FieldDetail.InputType.RadioButton) {
                    throw new Error(`Defined fieldDetails "${fieldDetail_Input.Name}" does not contain a selector`);
                };

                if (fieldDetail_Input.InputWaitBefore) {
                    this.user.waitsFor(fieldDetail_Input.InputWaitBefore);
                };

                if (input_fieldValue === SymbolsDT.IGNORE) {
                    cy.log(`NO INPUT : Field Name: ${fieldDetail_Input.Name} - input_fieldValue ${input_fieldValue}`);
                    return;
                } else {

                    if (!fieldDetail_Input.Selector) {
                        throw new Error(`FieldDetails "${fieldDetail_Input.Name}" - InputType ${inputType} - incomplete: Selector `);
                    };

                    if (fieldDetail_Input.dateFormat && fieldDetail_Input.ValueType === FieldDetail.ValueType.Date && !SymbolsDate.BracketedTokenRegex.test(input_fieldValue) ) {
                        input_fieldValue = DateUtil.formatDateStringToString(input_fieldValue, 'yyyy-mm-dd', fieldDetail_Input.dateFormat);
                        if (TEST) {
                            cy.log(`Input Field Value dateFormat Adjustment: ${input_fieldValue}`);
                        };
                    };

                    if (fieldDetail_Input.defaultValue && (this.IsValidBLANKTypeToken(input_fieldValue))) {
                        input_fieldValue = fieldDetail_Input.defaultValue;
                        if (TEST) {
                            cy.log(`Input Field Value defaultValue Adjustment: ${input_fieldValue}`);
                        };
                    };

                    switch (inputType) {

                        case FieldDetail.InputType.Fill:
                            {    
                                if (this.IsValidBLANKTypeToken(input_fieldValue)) {
                                    if (TEST) {
                                        cy.log('#1# #ClearForBLANK&UPDATEBLANK# this.user.attemptsTo((Field.Clear(...));');
                                    } else {
                                        this.user.attemptsTo(Field.Clear(fieldDetail_Input.Selector));    
                                    };
                                } else {
                                    if (fieldDetail_Input.ClearBeforeInput === true) {
                                        if (TEST) {
                                            cy.log('#1# #ClearBeforeInput# this.user.attemptsTo((Field.Clear(...));');
                                        } else {
                                            this.user.attemptsTo(Field.Clear(fieldDetail_Input.Selector));
                                        };
                                    };
                                    if (TEST) {
                                        cy.log('#1# this.user.attemptsTo((Field.Fill(...));');
                                    } else {
                                        this.user.attemptsTo(Field.Fill(fieldDetail_Input.Selector, input_fieldValue));
                                    };
                                };
                            };
                            break;

                        case FieldDetail.InputType.Dropdown:
                            {
                                if (this.IsValidBLANKTypeToken(input_fieldValue)) {
                                    input_fieldValue = '';
                                };

                                if (fieldDetail_Input.InputProcess) {    
                                    if (fieldDetail_Input.InputProcess === FieldDetail.InputProcess.Topaz) {
                                        if (TEST) {
                                            cy.log('#2# this.user.attemptsTo(Select.TopazDropdown(...));');
                                        } else {
                                            this.user.attemptsTo(Select.TopazDropdown(fieldDetail_Input.Selector, input_fieldValue));
                                        };
                                    } else {
                                        throw new Error(`Invalid Input Process: ${fieldDetail_Input.InputProcess}`)
                                    };
                                } else {
                                    if (TEST) {
                                        cy.log('#2# this.user.attemptsTo(Select.Dropdown(...));');
                                    } else {
                                        this.user.attemptsTo(Select.Dropdown(fieldDetail_Input.Selector, input_fieldValue));
                                    };
                                }     
                            };
                            break;

                        case FieldDetail.InputType.PredictiveEntry:
                            {
                                const predictiveEntrySelector = fieldDetail_Input.PredictiveEntrySelector;
                                if (!predictiveEntrySelector) {
                                    throw new Error(`FieldDetails "${fieldDetail_Input.Name}" - InputType ${inputType} - incomplete: predictiveEntry `);
                                };

                                if (this.IsValidBLANKTypeToken(input_fieldValue)) {
                                    if (TEST) {
                                        cy.log('#3# #ClearForBLANK&UPDATEBLANK# this.user.attemptsTo((Field.Clear(...));');
                                    } else {
                                        this.user.attemptsTo(Field.Clear(fieldDetail_Input.Selector));    
                                    };
                                } else {
                                    if (fieldDetail_Input.ClearBeforeInput === true) {
                                        if (TEST) {
                                            cy.log('#3# #ClearBeforeInput# this.user.attemptsTo((Field.Clear(...));');
                                        } else {
                                            this.user.attemptsTo(Field.Clear(fieldDetail_Input.Selector));
                                        };
                                    };

                                    if (TEST) {
                                        cy.log('#3# this.user.attemptsTo(Select.PredictiveEntry(...));');
                                    } else {
                                        this.user.attemptsTo(Select.PredictiveEntry(fieldDetail_Input.Selector, predictiveEntrySelector, input_fieldValue));
                                    };
                                };
                            };
                            break;

                        case FieldDetail.InputType.RadioButton:
                            {

                                cy.log(`FieldDetails "${fieldDetail_Input.Name}" )} `);
                                cy.log(`radioButtonSelectors.options ${CommonUtils.toJSONString(fieldDetail_Input.radioButtonSelectors?.options)} `);

                                const radioButtonOptionSelectors = fieldDetail_Input.radioButtonSelectors?.options;
                                let optionSelector: RadioButtonSelector = {
                                    Name: "EMPTY",
                                    Selector: "EMPTY"
                                };

                                if (!radioButtonOptionSelectors) {
                                    throw new Error(`FieldDetails "${fieldDetail_Input.Name}" - InputType "${inputType}" - incomplete: radioButtonSelectors `);
                                };

                                if (this.IsValidBLANKTypeToken(input_fieldValue)) {
                                    cy.log(`#4# #RadioButtonHandlingforBLANK&UPDATEBLANK#this.user.isNotRequiredToTakeAnyAction(...) ));`);
                                    return;
                                } else {
                                    radioButtonOptionSelectors.forEach((opt, index, array) => {
                                        cy.log(`FieldDetails "${fieldDetail_Input.Name}" - input_fieldValue "${input_fieldValue}" - opt.Name: "${opt.Name}"`);
                                        if (input_fieldValue === opt.Name) {
                                            optionSelector = opt;
                                        };
                                    });
                                };

                                cy.log(`FieldDetails "${fieldDetail_Input.Name}" - input_fieldValue "${input_fieldValue}" - option selected: "${CommonUtils.toJSONString(optionSelector)}"`);

                                if (optionSelector.Name === "EMPTY") {
                                    cy.log(`FieldDetails "${fieldDetail_Input.Name}" - InputType ${inputType} - No option selected`);
                                };

                                if (TEST) {
                                    cy.log(`#4# this.user.attemptsTo(Select.RadioButton( ${optionSelector.Selector} ));`);
                                }
                                else {
                                    this.user.attemptsTo(Select.RadioButton(optionSelector.Selector));
                                };
                            };
                            break;

                        default: {
                            throw new Error(`Unrecognized InputType : ${inputType}`);
                        };
                    };
                };

                if (fieldDetail_Input.InputWaitAfter) {
                    this.user.waitsFor(fieldDetail_Input.InputWaitAfter);
                };

            }
        };
    };

    assertFieldValue(fieldDetail_Assert: FieldDetail_Assert, assert_fieldValue: string, TEST: boolean = false) {

        cy.log(`FieldDetail_Assert: ${CommonUtils.toJSONString(fieldDetail_Assert)}`);
        cy.log(`Assert Field Value: ${CommonUtils.toJSONString(assert_fieldValue)}`);

        return {
            answeredBy: () => {

                if (!fieldDetail_Assert.Name) {
                    throw new Error(`Incomplete fieldDetails. Name not provided.`);
                }

                if ( !fieldDetail_Assert.AssertionProcess
                    || !fieldDetail_Assert.AssertionTarget
                    || !fieldDetail_Assert.Selector
                    || !fieldDetail_Assert.AssertionType
                ) {
                    throw new Error(`
                      Incomplete fieldDetails : ${fieldDetail_Assert.Name}. 
                      FieldDetail_Assert: ${CommonUtils.toJSONString(fieldDetail_Assert)}
                      `);
                };

                if (assert_fieldValue === SymbolsDT.IGNORE) {
                    cy.log(`NO ASSERTION : Field Name: ${fieldDetail_Assert.Name} - assert_fieldValue ${assert_fieldValue}`);
                    return;
                };

                if (fieldDetail_Assert.dateFormat && fieldDetail_Assert.ValueType === FieldDetail.ValueType.Date && !SymbolsDate.BracketedTokenRegex.test(assert_fieldValue)) {
                    assert_fieldValue = DateUtil.formatDateStringToString(assert_fieldValue, 'yyyy-mm-dd', fieldDetail_Assert.dateFormat);
                    if (TEST) {
                        cy.log(`Assert Field Value dateFormat Adjustment: ${assert_fieldValue}`);
                    };
                };

                if (fieldDetail_Assert.defaultValue && this.IsValidBLANKTypeToken(assert_fieldValue)) {
                    assert_fieldValue = fieldDetail_Assert.defaultValue;
                    if (TEST) {
                        cy.log(`Assert Field Value defaultValue Adjustment: ${assert_fieldValue}`);
                    };
                };

                switch (fieldDetail_Assert.AssertionProcess) {//Perform the actual assertion
                
                    case (FieldDetail.AssertionProcess.WithinPageElement): {    
                        if (this.IsValidBLANKTypeToken(assert_fieldValue)) {
                            assert_fieldValue = '';
                        };

                        if (TEST) {
                            cy.log('#1#  this.user.asks(this.withinPageElement(....)');
                        } else {
                            this.user.asks(
                            this
                            .withinPageElement(
                                fieldDetail_Assert, assert_fieldValue, TEST
                            ))
                        };
                        break;
                    };

                    case (FieldDetail.AssertionProcess.WithinRadioButtonElement): {
                        const radioButtonOptionSelectors = fieldDetail_Assert.radioButtonSelectors?.options;
                        if (!radioButtonOptionSelectors) {
                            throw new Error(`FieldDetails "${fieldDetail_Assert.Name}" - AssertionProcess "${FieldDetail.AssertionProcess.WithinRadioButtonElement}" - incomplete: "radioButtonSelectors" `);
                        };
                        if (this.IsValidBLANKTypeToken(assert_fieldValue)) {
                            if (TEST) {
                                cy.log('#2# #AssertforBLANK&UPDATEBLANK# this.user.asks(No radio button option is checked(....);');
                            } else {
                                radioButtonOptionSelectors.forEach((opt) => {
                                    cy.get(opt.Selector).should('not.be.checked');
                                });
                            };                                
                            return;
                        } else { 
                            const matchingOption = radioButtonOptionSelectors.find(opt => assert_fieldValue === opt.Name);

                            if (matchingOption) {
                                cy.log(`FieldDetails "${fieldDetail_Assert.Name}" - assert_fieldValue ${assert_fieldValue} - selectedOption: ${CommonUtils.toJSONString(matchingOption)}`);
                                fieldDetail_Assert.Selector = matchingOption.Selector;
                                if (TEST) {
                                    cy.log('#2#  this.user.asks(this.WithinRadioButtonElement(....)');
                                } else {
                                    this.user.asks(
                                        this
                                        .withinPageElement(
                                            fieldDetail_Assert, assert_fieldValue, TEST
                                        ));
                                };  
                            } else {
                                throw new Error(`FieldDetails "${fieldDetail_Assert.Name}" - AssertionProcess "${FieldDetail.AssertionProcess.WithinRadioButtonElement}" - Invalid Option "${assert_fieldValue}"`);
                            };
                        };
                        break;
                    };

                    default: {
                        throw new Error(`Unrecognized AssertionProcess : ${fieldDetail_Assert.AssertionProcess}`);
                    };

                };
                
            }
        };
    };

    private withinPageElement(fieldDetail_Assert: FieldDetail_Assert, assert_fieldValue: string, TEST: boolean = false) {
        return {
            answeredBy: () => {
                cy.log(`Beginning withinPageElement`);
                this.assertPageElement(fieldDetail_Assert, assert_fieldValue, TEST);
            },
        };
    };

    private assertPageElement(fieldDetail_Assert: FieldDetail_Assert, assert_fieldValue: string, TEST: boolean = false) {

        cy.log(`Beginning assertPageElement`);

        cy.get(fieldDetail_Assert.Selector)
            .then(($element) => {
                let pageElementAttribute: string | number | string[] | undefined;

                switch (fieldDetail_Assert.AssertionTarget) {

                    case (FieldDetail.AssertionTarget.value): {
                        pageElementAttribute = $element.val();
                        break;
                    };

                    case (FieldDetail.AssertionTarget.attr): {
                        if (fieldDetail_Assert.AssertionAttribute) {
                            pageElementAttribute = $element.attr(fieldDetail_Assert.AssertionAttribute);
                        } else {
                            throw new Error(`AssertionTarget is attr without AssertionAttribute.`);
                        }
                        break;
                    };

                    case (FieldDetail.AssertionTarget.text): {
                        pageElementAttribute = $element.text();
                        //if (ShouldNormalizeText === true) { //Normalizing by default
                        pageElementAttribute = pageElementAttribute.replace(/\s+/g, ' ').trim();
                        //};
                        break;
                    };

                    case (FieldDetail.AssertionTarget.selected): {
                        if (fieldDetail_Assert.AssertionProcess === FieldDetail.AssertionProcess.WithinRadioButtonElement) {
                            pageElementAttribute = $element.prop('checked');
                        } else {
                            pageElementAttribute = $element.find('option:selected').text()
                            //if (ShouldNormalizeText === true) { //Normalizing by default
                                pageElementAttribute = pageElementAttribute.replace(/\s+/g, ' ').trim();
                            //};
                        };
                        break;
                    };

                    case (FieldDetail.AssertionTarget.checked): {
                        pageElementAttribute = Cypress.$($element).prop('checked');
                        break;
                    };

                    default: {
                        throw new Error(`Unrecognized AssertionTarget : ${fieldDetail_Assert.AssertionTarget}`);
                    };
                    
                };

                cy.log(`assertPageElement pageElementAttribute: ${pageElementAttribute}`);

                switch (fieldDetail_Assert.AssertionType) {

                    case (FieldDetail.AssertionType.contains): {
                        //Perform the actual assertion
                        expect(pageElementAttribute).to.contains(assert_fieldValue);
                        break;
                    };

                    case (FieldDetail.AssertionType.equal): {
                        //Perform the actual assertion
                        expect(pageElementAttribute).to.equal(assert_fieldValue);
                        break;
                    };

                    case (FieldDetail.AssertionType.isTrue): {
                        //Perform the actual assertion
                        expect(pageElementAttribute).to.equal(true);
                        break;
                    };

                    case (FieldDetail.AssertionType.isFalse): {
                        //Perform the actual assertion
                        expect(pageElementAttribute).to.equal(false);
                        break;
                    };

                    default: {
                        throw new Error(`Unrecognized AssertionType : ${fieldDetail_Assert.AssertionType}`);
                    };
                };

            });
    };

    IsValidBLANKTypeToken(input_fieldValue: string) {
        if (input_fieldValue === SymbolsDT.BLANK || input_fieldValue === SymbolsDT.UPDATEBLANK) {
        return true;
        }; 
    };

};