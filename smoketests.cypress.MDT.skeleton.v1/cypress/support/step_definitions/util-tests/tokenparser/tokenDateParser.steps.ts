import { Given, When, Then, Before, After } from "@badeball/cypress-cucumber-preprocessor";
import CommonUtils from "../../../utils/common-utils";
import { TokenDateParser, DateRange } from '../../../utils/tokenparser/TokenDateParser';

let token: string;
let result: Date;
let parseError: any;

let dateStringToken: string;
let parsedResult2: Date;

function getStartDateUTC(): Date {

    let now = new Date();
    let startDateUTC = new Date(
        Date.UTC(now.getUTCFullYear(),
            now.getUTCMonth(), now.getUTCDate(),
            0, 0, 0, 0));

    console.log(`TEST: StartDateUTC: ${CommonUtils.toJSONString(startDateUTC)}`);
    return startDateUTC;
}

Given('I have a date token {string}', (inputToken: string) => {
    token = inputToken;
});

Given('I have an invalid date range string {string}', (inputToken: string) => {
    token = inputToken;
});


/* DateToken format - 
Full : '[STARTDATE][+ve/-ve][DATEPART][+ve/-ve][DATEPART][+ve/-ve][DATEPART]';
*/
When('I parse the token', function () {
    parseError = null;
    result = new Date(0);
    try {
        result = TokenDateParser.parseDateStringToken_Full(token);
        //console.log(`TOKEN ${token} : PARSED TOKEN DATE ${CommonUtils.toJSONString(result)}`);
    } catch (error) {
        console.log(`TEST: ERROR PARSING TOKEN DATE ${token}`);
        console.log(`TEST: PARSE-ERROR : ${error}`);
        parseError = error;
    };
});

Then('an error should be thrown with message {string}', (expectedMessage: string) => {
    expect(parseError).to.not.be.null;
    expect(parseError.message).to.contain(expectedMessage);
});

Then('the result should be today\'s date minus two year and four month', function () {
    let expectedDate = getStartDateUTC();

    expectedDate.setUTCFullYear(expectedDate.getUTCFullYear() - 2);
    expectedDate.setUTCMonth(expectedDate.getUTCMonth() - 4);
    console.log(`TOKEN ${token} : 
        PARSED TOKEN DATE ${CommonUtils.toJSONString(result)} : 
        EXPECTED ${CommonUtils.toJSONString(expectedDate)}`);
    expect(result.toUTCString()).to.deep.equal(expectedDate.toUTCString());
});

Then('the result should be today\'s date minus one year and one month', function () {
    let expectedDate = getStartDateUTC();

    expectedDate.setUTCFullYear(expectedDate.getUTCFullYear() - 1);
    expectedDate.setUTCMonth(expectedDate.getUTCMonth() - 1);
    console.log(`TOKEN ${token} : 
        PARSED TOKEN DATE ${CommonUtils.toJSONString(result)} : 
        EXPECTED ${CommonUtils.toJSONString(expectedDate)}`);
    expect(result.toUTCString()).to.deep.equal(expectedDate.toUTCString());
});

Then('the result should be today\'s date', () => {
    let expectedDate = getStartDateUTC();

    console.log(`TOKEN ${token} : 
        PARSED TOKEN DATE ${CommonUtils.toJSONString(result)} : 
        EXPECTED ${CommonUtils.toJSONString(expectedDate)}`);
    expect(result.toUTCString()).to.deep.equal(expectedDate.toUTCString());
});


Then('the result should be tomorrow\'s date', () => {
    let expectedDate = getStartDateUTC();

    expectedDate.setUTCDate(expectedDate.getUTCDate() + 1);

    console.log(`TOKEN ${token} : 
        PARSED TOKEN DATE ${CommonUtils.toJSONString(result)} : 
        EXPECTED ${CommonUtils.toJSONString(expectedDate)}`);
    expect(result.toUTCString()).to.deep.equal(expectedDate.toUTCString());
});

Then('the result should be yesterday\'s date', () => {
    let expectedDate = getStartDateUTC();

    expectedDate.setUTCDate(expectedDate.getUTCDate() - 1);

    console.log(`TOKEN ${token} : 
        PARSED TOKEN DATE ${CommonUtils.toJSONString(result)} : 
        EXPECTED ${CommonUtils.toJSONString(expectedDate)}`);
    expect(result.toUTCString()).to.deep.equal(expectedDate.toUTCString());
});

Then('the result should be today\'s date minus two years', () => {
    let expectedDate = getStartDateUTC();

    expectedDate.setUTCFullYear(expectedDate.getUTCFullYear() - 2);

    console.log(`TOKEN ${token} : 
        PARSED TOKEN DATE ${CommonUtils.toJSONString(result)} : 
        EXPECTED ${CommonUtils.toJSONString(expectedDate)}`);
    expect(result.toUTCString()).to.deep.equal(expectedDate.toUTCString());
});

Then('the result should be today\'s date minus one year, two months, and three days', () => {
    let expectedDate = getStartDateUTC();

    expectedDate.setUTCFullYear(expectedDate.getUTCFullYear() - 1);
    expectedDate.setUTCMonth(expectedDate.getUTCMonth() - 2);
    expectedDate.setUTCDate(expectedDate.getUTCDate() - 3);

    console.log(`TOKEN ${token} : 
        PARSED TOKEN DATE ${CommonUtils.toJSONString(result)} : 
        EXPECTED ${CommonUtils.toJSONString(expectedDate)}`);
    expect(result.toUTCString()).to.deep.equal(expectedDate.toUTCString());
});

Then('the result should be today\'s date plus one year, minus one month, and plus one day', () => {
    let expectedDate = getStartDateUTC();

    expectedDate.setUTCFullYear(expectedDate.getUTCFullYear() + 1);
    expectedDate.setUTCMonth(expectedDate.getUTCMonth() - 1);
    expectedDate.setUTCDate(expectedDate.getUTCDate() + 1);

    console.log(`TOKEN ${token} : 
        PARSED TOKEN DATE ${CommonUtils.toJSONString(result)} : 
        EXPECTED ${CommonUtils.toJSONString(expectedDate)}`);
    expect(result.toUTCString()).to.deep.equal(expectedDate.toUTCString());
});

Then('the result should be today\'s date plus two years', () => {
    let expectedDate = getStartDateUTC();

    expectedDate.setUTCFullYear(expectedDate.getUTCFullYear() + 2);

    console.log(`TOKEN ${token} : 
        PARSED TOKEN DATE ${CommonUtils.toJSONString(result)} : 
        EXPECTED ${CommonUtils.toJSONString(expectedDate)}`);
    expect(result.toUTCString()).to.deep.equal(expectedDate.toUTCString());
});

Then('the result should be today\'s date plus five months', () => {
    let expectedDate = getStartDateUTC();

    expectedDate.setUTCMonth(expectedDate.getUTCMonth() + 5);

    console.log(`TOKEN ${token} : 
        PARSED TOKEN DATE ${CommonUtils.toJSONString(result)} : 
        EXPECTED ${CommonUtils.toJSONString(expectedDate)}`);
    expect(result.toUTCString()).to.deep.equal(expectedDate.toUTCString());
});

Then('the result should be tomorrow\'s date plus five months', () => {
    let expectedDate = getStartDateUTC();

    expectedDate.setUTCDate(expectedDate.getUTCDate() + 1);
    expectedDate.setUTCMonth(expectedDate.getUTCMonth() + 5);

    console.log(`TOKEN ${token} : 
        PARSED TOKEN DATE ${CommonUtils.toJSONString(result)} : 
        EXPECTED ${CommonUtils.toJSONString(expectedDate)}`);
    expect(result.toUTCString()).to.deep.equal(expectedDate.toUTCString());
});

Then('the result should be yesterday\'s date plus five months and minus one year', () => {
    let expectedDate = getStartDateUTC();

    expectedDate.setUTCDate(expectedDate.getUTCDate() - 1);
    expectedDate.setUTCMonth(expectedDate.getUTCMonth() + 5);
    expectedDate.setUTCFullYear(expectedDate.getUTCFullYear() - 1);

    console.log(`TOKEN ${token} : 
        PARSED TOKEN DATE ${CommonUtils.toJSONString(result)} : 
        EXPECTED ${CommonUtils.toJSONString(expectedDate)}`);
    expect(result.toUTCString()).to.deep.equal(expectedDate.toUTCString());
});

Given('I have a null or invalid date token', () => {
    // Assuming 'INVALID' represents any invalid token
    // This can be replaced or extended with actual examples of invalid tokens if needed
    token = 'INVALID'; // or set to null
});

Then('the result should be the Unix zero date', () => {
    const expectedDate = new Date(0); // Unix zero date: January 1, 1970, 00:00:00 UTC  
    expectedDate.setHours(0, 0, 0, 0); // Zero out all time - set to midnight


    console.log(`TOKEN ${token} : 
        PARSED TOKEN DATE ${CommonUtils.toJSONString(result)} : 
        EXPECTED ${CommonUtils.toJSONString(expectedDate)}`);
    expect(result.toUTCString()).to.deep.equal(expectedDate.toUTCString());
});


Given('I have a date string {string}', (token: string) => {
    dateStringToken = token;
});

/* DateToken format - 
Full : '[STARTDATE][+ve/-ve][DATEPART][+ve/-ve][DATEPART][+ve/-ve][DATEPART]';
*/
When('I parse the date string token', () => {
    parsedResult2 = TokenDateParser.parseDateStringToken_MonthStartEnd(dateStringToken);
});

Then('the result should be {string}', (expectedDateStr: string) => {
    const [startYear, startMonth, startDay] = expectedDateStr.split('-').map(Number);
    const expectedDate = new Date(Date.UTC(startYear, startMonth - 1, startDay, 0, 0, 0, 0));

    console.log(`TOKEN ${dateStringToken} : 
        PARSED TOKEN DATE ${CommonUtils.toJSONString(parsedResult2)} : 
        EXPECTED ${CommonUtils.toJSONString(expectedDate)}`);
    expect(parsedResult2.toUTCString()).to.deep.equal(expectedDate.toUTCString());
});

let dateRangeTokenString: string;
let resultRange: DateRange;

Given('I have a date range string {string}', (input: string) => {
    dateRangeTokenString = input;
});

/* DateToken format - 
DateRange : '[MONTHENDSTART][MONTH][YEAR]<->[MONTHENDSTART][MONTH][YEAR]';
*/
When('I parse the date range string', () => {
    resultRange = TokenDateParser.parseDateStringToken_DateRange(dateRangeTokenString);
});

Then('the start date should be {string} and the end date should be {string}', (StartDate: string, EndDate: string) => {
    const [startYear, startMonth, startDay] = StartDate.split('-').map(Number);
    const [endYear, endMonth, endDay] = EndDate.split('-').map(Number);
    const expectedStartDate = new Date(Date.UTC(startYear, startMonth - 1, startDay, 0, 0, 0, 0));
    const expectedEndDate = new Date(Date.UTC(endYear, endMonth - 1, endDay, 0, 0, 0, 0));  


    console.log(`TOKEN DATE RANGE ${dateRangeTokenString}: ${CommonUtils.toJSONString(resultRange)} : 
    EXPECTED START ${CommonUtils.toJSONString(expectedStartDate)} : 
    EXPECTED END ${CommonUtils.toJSONString(expectedEndDate)}`);

    expect(resultRange.Start.toUTCString()).to.equal(expectedStartDate.toUTCString());
    expect(resultRange.End.toUTCString()).to.equal(expectedEndDate.toUTCString());
});