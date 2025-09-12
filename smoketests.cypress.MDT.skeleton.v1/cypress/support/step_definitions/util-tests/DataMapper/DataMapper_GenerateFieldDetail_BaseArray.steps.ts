import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import CommonUtils from 'cypress/support/utils/common-utils';
import { DataMapper, NestedKeys } from 'cypress/support/utils/DataMapper';

let inputObject: any;
let selector: string;
let valueType: string;
let result: { Name: string; Selector: string; ValueType: string; }[];
let optionTemplate : any;

Given('an generic input object:', (docString: string) => {
    inputObject = CommonUtils.parseJSON(docString);
    cy.log(`inputObject: ${CommonUtils.toJSONString(inputObject,{ unformatted: false })}`);
});

Given('a default selector: "{string}"', (defaultSelector: string) => {
    selector = defaultSelector;
});

Given('a default valueType: "{string}"', (defaultValueType: string) => {
    valueType = defaultValueType;
});

Given("an option template:", (docString: string) => {
    optionTemplate = CommonUtils.parseJSON(docString);
    cy.log(`optionTemplate: ${CommonUtils.toJSONString(optionTemplate,{ unformatted: false })}`);
});

When('I call the GenerateFieldDetail_BaseArray method', () => {
    result = DataMapper.GenerateFieldDetail_BaseArray(inputObject, selector, valueType);
});

When('I call the GenerateFieldDetailsArray method', () => {
    result = DataMapper.GenerateFieldDetailsArray(inputObject, optionTemplate);
});

Then('the generated FieldDetail_Base array should be:', (docString: string) => {
    const expectedResult = CommonUtils.parseJSON(docString);
    cy.log(`expectedResult: ${CommonUtils.toJSONString(expectedResult,{ unformatted: false })}`);
    expect(result).to.deep.equal(expectedResult);
});

Then('the generated FieldDetails array should be:', (docString: string) => {
    const expectedResult = CommonUtils.parseJSON(docString);
    cy.log(`expectedResult: ${CommonUtils.toJSONString(expectedResult,{ unformatted: false })}`);
    expect(result).to.deep.equal(expectedResult);
});
