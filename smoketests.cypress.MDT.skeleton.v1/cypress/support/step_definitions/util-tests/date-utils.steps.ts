import { Given, When, Then, Before, After } from "@badeball/cypress-cucumber-preprocessor";
import { DateUtil } from "../../utils/date-utils";
import CommonUtils from '../../utils/common-utils';

let date: Date
let dateString: string
let formattedDate: string

Given('I have the date {string}', (dateToFormat: string) => {
    date = new Date(dateToFormat)
    cy.log('Date:', CommonUtils.toJSONString(date));
});

Given('I have the date string {string}', (dateStringToFormat:string) => {
    dateString = dateStringToFormat
});

When('I format the date to a string', () => {
    formattedDate = DateUtil.formatDateToString(date);
    cy.log('Formatted Date:', formattedDate)
});

When('I update the date from {string} to the format {string}', (providedFormat:string, expectedFormat:string) => {
    formattedDate = DateUtil.formatDateStringToString(dateString, providedFormat, expectedFormat)
});

Then('the formatted date string should be {string}', (expectedDate: string) => {
    expect(formattedDate).to.equal(expectedDate)
});

Then('the date string returned should be {string}', (updatedDate:string) => {
    expect(formattedDate).to.equal(updatedDate)
});