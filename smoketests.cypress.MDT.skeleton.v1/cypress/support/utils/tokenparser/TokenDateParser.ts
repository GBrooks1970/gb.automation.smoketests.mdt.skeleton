import CommonUtils from "../common-utils";
import { SymbolsDate } from "../symbol-consts";
import { SymbolsDT } from "../symbol-consts";

export type DateUnitSection = 'YEAR' | 'MONTH' | 'DAY';
export type DateStartSection = 'TODAY' | 'TOMORROW' | 'YESTERDAY';
export type DateRangeMonthStartEnd = 'START' | 'END';
export enum MonthEnum {
    JANUARY = 0,
    FEBRUARY = 1,
    MARCH = 2,
    APRIL = 3,
    MAY = 4,
    JUNE = 5,
    JULY = 6,
    AUGUST = 7,
    SEPTEMBER = 8,
    OCTOBER = 9,
    NOVEMBER = 10,
    DECEMBER = 11,
}

export interface DateRange {
    Start: Date;
    End: Date;
};

export type DateTokenFormats = {
    Full: '[STARTDATE][+ve/-ve][DATEPART][+ve/-ve][DATEPART][+ve/-ve][DATEPART]';
    MonthStartEnd: '[MONTHENDSTART][MONTH][YEAR]';
    DateRange: '[MONTHENDSTART][MONTH][YEAR]<->[MONTHENDSTART][MONTH][YEAR]';
};

export class TokenDateParser {

    static isValidDateToken(token: string): boolean {
        try {
            console.log(`VALIDATING ${token}`);
            if (SymbolsDate.BracketedTokenRegex.test(token)) {
                console.log(`FOUND-TOKEN BRACKETS -> token: ${CommonUtils.toJSONString(token)}`);
                const innerToken = token.slice(1, -1); // Remove the surrounding brackets
                return this.isValidInnerToken(innerToken);
            }

        } catch (error) {
            console.log(`${this.isValidDateToken.name}: ERROR VALIDATING TOKEN DATE ${token} : ${error}`);
            return false;
        }

        console.log(`1# INVALID TOKEN ${token}`);
        return false;
    }

    static isValidInnerToken(innerToken: string): boolean {
        console.log(`VALIDATING InnerToken ${innerToken}`);

        const regexes = Object.values(SymbolsDate.TokenDate);

        if (!SymbolsDate.TokenDate.FullRegex.test(innerToken)) {
            console.log(`2# INVALID TOKEN FullRegex ${innerToken}`);
        }

        if (!SymbolsDate.TokenDate.RangeRegex.test(innerToken)) {
            console.log(`3# INVALID TOKEN RangeRegex ${innerToken}`);
        }

        return regexes.some(regex => regex.test(innerToken));
        //return SymbolsDate.TokenDate.FullRegex.test(innerToken) || SymbolsDate.TokenDate.RangeRegex.test(innerToken);
    }

    public static parseDateStringToken(token: string): Date {
        console.log(`PARSING TOKEN ${token} : ${this.parseDateStringToken.name}`);

        if (!this.isValidDateToken(token)) {
            throw new Error(`${this.parseDateStringToken.name} : Invalid date token format: ${token}`);
        }

        // const innerToken = token.slice(1, -1); // Remove the surrounding brackets
        // console.log(`Remove the surrounding brackets : ${token} -> ${innerToken}: ${this.parseDateStringToken.name}`);
        return this.parseDateStringToken_internal(token);
    }

    // Used to decide the type of the Date Token and what method to be used to parse 
    /* DateToken format - 
    Full : '[STARTDATE][+ve/-ve][DATEPART][+ve/-ve][DATEPART][+ve/-ve][DATEPART]';
    MonthStartEnd : '[MONTHENDSTART][MONTH][YEAR]';
    DateRange : '[MONTHENDSTART][MONTH][YEAR]<->[MONTHENDSTART][MONTH][YEAR]';
    */
    private static parseDateStringToken_internal(token: string): Date {
        console.log(`PARSING INNER TOKEN ${token} : ${this.parseDateStringToken_internal.name}`);
        let parsedDate = this.setToUnixZeroDate(); // Return unix zero time

        if (!this.isValidDateToken(token)) {
            throw new Error(`${this.parseDateStringToken_internal.name} : Invalid date token format: ${token}`);
        }

        const innerToken = token.slice(1, -1); // Remove the surrounding brackets
        console.log(`Remove the surrounding brackets : ${token} -> ${innerToken}: ${this.parseDateStringToken_internal.name}`);

        if (SymbolsDate.TokenDate.FullRegex.test(innerToken)) {
            console.log(`USING ${this.parseDateStringToken_Full.name} for ${token}`);
            parsedDate = this.parseDateStringToken_Full(token);
        } else if (SymbolsDate.TokenDate.RangeRegex.test(innerToken)) {
            console.log(`USING ${this.parseDateStringToken_MonthStartEnd_internal.name} for ${token}`);
            parsedDate = this.parseDateStringToken_MonthStartEnd_internal(innerToken);
        } else {
            throw new Error(`${this.parseDateStringToken_internal.name} : Unrecognised date token format: ${token}`);
        }

        console.log(`TOKEN ${token} : PARSED DATE ${CommonUtils.toJSONString(parsedDate)}`);
        return parsedDate;
    }

    /* DateToken format - 
    Full : '[STARTDATE][+ve/-ve][DATEPART][+ve/-ve][DATEPART][+ve/-ve][DATEPART]';
    */
    static parseDateStringToken_Full(token: string): Date {
        console.log(`PARSING TOKEN ${token} : ${this.parseDateStringToken_Full.name}`);
        const innerToken = token.slice(1, -1); // Remove the surrounding brackets
        console.log(`Remove the surrounding brackets : ${token} -> ${innerToken}: ${this.parseDateStringToken_Full.name}`);

        const match = SymbolsDate.TokenDate.FullRegex.exec(innerToken);
        console.log(`${this.parseDateStringToken_Full.name} : INNERTOKEN ${innerToken} : match ${CommonUtils.toJSONString(match)}`);
        if (!match || !match.groups) {
            throw new Error(`${this.parseDateStringToken_Full.name} : Invalid date token format: ${token}`);
        }

        console.log(`${this.parseDateStringToken_Full.name} : match.groups: ${CommonUtils.toJSONString(match.groups)}`);
        let calculatedDate = this.getAnchorDate(match.groups['anchorDate'] as DateStartSection);

        let modificationTokenMatch;
        //Iterate through modification tokens, adjusting date
        while ((modificationTokenMatch = SymbolsDate.TokenDateInnerSectionRegex.exec(match.groups['adjustTokens'])) !== null) {
            if (modificationTokenMatch.groups) {
                console.log(`${this.parseDateStringToken_Full.name} : modificationTokenMatch.groups: ${CommonUtils.toJSONString(modificationTokenMatch.groups)}`);
                const adjustValue = parseInt(modificationTokenMatch.groups['adjustValue'], 10) * (modificationTokenMatch.groups['sign'] === '+' ? 1 : -1);
                calculatedDate = this.adjustDate(calculatedDate, adjustValue, modificationTokenMatch.groups['dateUnit'] as DateUnitSection);
            }
        }

        console.log(`TOKEN ${token} : PARSED DATE ${CommonUtils.toJSONString(calculatedDate)}`);
        return calculatedDate;
    }

    /* DateToken format - 
    MonthStartEnd : '[MONTHENDSTART][MONTH][YEAR]';
    */
    static parseDateStringToken_MonthStartEnd(token: string): Date {
        console.log(`PARSING TOKEN ${token} : ${this.parseDateStringToken_MonthStartEnd.name}`);
        if (!this.isValidDateToken(token)) {
            throw new Error(`${this.parseDateStringToken_MonthStartEnd.name} : Invalid date token format: ${token}`);
        }
        const innerToken = token.slice(1, -1); // Remove the surrounding brackets
        console.log(`Remove the surrounding brackets : ${token} -> ${innerToken}: ${this.parseDateStringToken_MonthStartEnd.name}`);
        const date = this.parseDateStringToken_MonthStartEnd_internal(innerToken);
        return date;
    }

    private static splitDateStringTokenPartial(token: string): string[] {
        const matches = token.match(SymbolsDate.TokenDate.RangeRegex);
        if (!matches) {
            throw new Error(`${this.splitDateStringTokenPartial.name} : Invalid date token format: ${token}`);
        }
        return [matches[1], matches[2], matches[3]];
    }

    /* DateToken format - 
    DateRange : '[MONTHENDSTART][MONTH][YEAR]<->[MONTHENDSTART][MONTH][YEAR]';
    */
    static parseDateStringToken_DateRange(token: string): DateRange {
        // if (!this.isValidToken(token)) {
        //     throw new Error(`${this.parseDateRangeToken.name} isValidToken : Invalid date token format: ${token}`);
        // }
        const innerToken = token.slice(1, -1); // Remove the surrounding brackets
        console.log(`Remove the surrounding brackets : ${token} -> ${innerToken}: ${this.parseDateStringToken_DateRange.name}`);
        const tokenParts = innerToken.split('<->');
        if (tokenParts.length !== 2) {
            throw new Error(`${this.parseDateStringToken_DateRange.name} tokenParts.length[${tokenParts.length}]: Invalid date token format: ${token}`);
        }

        let tokenParts_0 = `[${tokenParts[0]}]`;
        console.log(`tokenParts[0] : Add surrounding brackets : ${tokenParts[0]} -> ${tokenParts_0}: ${this.parseDateStringToken_DateRange.name}`);
        let tokenParts_1 = `[${tokenParts[1]}]`;
        console.log(`tokenParts[0] : Add surrounding brackets : ${tokenParts[1]} -> ${tokenParts_1}: ${this.parseDateStringToken_DateRange.name}`);

        const StartDate = this.parseDateStringToken_internal(tokenParts_0);
        const EndDate = this.parseDateStringToken_internal(tokenParts_1);

        return { Start: StartDate, End: EndDate };
    }

    private static parseDateStringToken_MonthStartEnd_internal(token: string): Date {
        console.log(`PARSING TOKEN ${token} : ${this.parseDateStringToken_MonthStartEnd.name}`);
        const [dateRangeMonthStartEndStr, monthStr, yearStr] = this.splitDateStringTokenPartial(token);
        const dateRangeMonthStartEnd = dateRangeMonthStartEndStr.toUpperCase() as DateRangeMonthStartEnd;
        const month = this.getMonthMap(monthStr);
        const year = parseInt(yearStr);

        if (isNaN(month) || isNaN(year)) {
            throw new Error(`${this.parseDateStringToken_MonthStartEnd_internal.name} : Invalid date token format: ${token}`);
        }

        return this.computeMonthStartEndDate(dateRangeMonthStartEnd, month, year);
    }

    private static setToUnixZeroDate(): Date {
        let date = new Date(0); // Unix zero date: January 1, 1970, 00:00:00 UTC
        date.setHours(0, 0, 0, 0); // Zero out all time - set to midnight
        return date;
    }

    private static getAnchorDate(dateStartSection: DateStartSection): Date {
        let now = new Date();
        let adjustValue = 0;
        console.log(`1:startDateUTC: ${CommonUtils.toJSONString(now)}`);

        switch (dateStartSection) {
            case 'TODAY':
                break;
            case 'TOMORROW':
                adjustValue = 1;
                break;
            case 'YESTERDAY':
                adjustValue = -1;
                break;
            default:
                console.log(`${dateStartSection} : UNRECOGNISED - Invalid start date`);
                throw new Error(`${dateStartSection} : UNRECOGNISED - Invalid start date`);
                break;
        }

        console.log(`${dateStartSection} : Adjusting DAY by ${adjustValue}`);
        now.setUTCDate(now.getUTCDate() + adjustValue);
        let calculted_startDateUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0));
        console.log(`2:StartDate: ${CommonUtils.toJSONString(calculted_startDateUTC)}`);
        return calculted_startDateUTC
    }

    private static adjustDate(date: Date, adjustValue: number, dateUnit: DateUnitSection): Date {
        switch (dateUnit) {
            case 'YEAR':
                date.setUTCFullYear(date.getUTCFullYear() + adjustValue);
                break;
            case 'MONTH':
                date.setUTCMonth(date.getUTCMonth() + adjustValue);
                break;
            case 'DAY':
                date.setUTCDate(date.getUTCDate() + adjustValue);
                break;
            default:
                console.log(`${dateUnit} : UNRECOGNISED - Invalid date section`);
                throw new Error(`${dateUnit} : UNRECOGNISED - Invalid date`);
        }
        console.log(`Adjusting ${dateUnit} by ${adjustValue}`);
        console.log(`Adjusted date: ${CommonUtils.toJSONString(date)}`);
        return date;
    }

    private static getMonthMap(monthStr: string): number {
        return MonthEnum[monthStr as keyof typeof MonthEnum];
    }

    private static computeMonthStartEndDate(dateRangeMonthStartEnd: DateRangeMonthStartEnd, month: number, year: number): Date {
        //Default to setting first day of month
        let date = new Date(Date.UTC(year, month, 1, 0, 0, 0, 0));

        switch (dateRangeMonthStartEnd) {
            case 'START':
                console.log(`Adjusting to the start of month`);
                date = new Date(Date.UTC(year, month, 1, 0, 0, 0, 0));
                break;
            case 'END':
                console.log(`Adjusting to the end of month`);
                date = new Date(Date.UTC(year, month + 1, 0, 0, 0, 0, 0)); // Last day of the month
                break;
            default:
                console.log(`${dateRangeMonthStartEnd} : UNRECOGNISED - Invalid Date Range Month StartEnd`);
                throw new Error(`${dateRangeMonthStartEnd} : UNRECOGNISED - Invalid Date Range Month StartEnd`);
                break;
        }
        console.log(`MonthStartEndDate : ${CommonUtils.toJSONString(date)}`);
        return date;
    }
}

