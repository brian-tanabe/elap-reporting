import 'mocha';

import {suite, test} from "mocha-typescript";
import {DateHelper} from "../../../src/helpers/date-helper";

const expect = require('chai').expect;

const REPORTING_MONTH_JANUARY_2019 = "43466";
const REPORTING_MONTH_FEBRUARY_2019 = "43497";
const EXCEL_DATE_JANUARY_1_2019 = "43466";
const EXCEL_DATE_JANUARY_31_2019 = "43496";
const OPEN_DATE_NOVEMBER_16_2018 = "43420";

@suite
class DateHelperSpec {

    @test
    shouldBeAbleToConvertAnExcelDateToNormalDate() {
        const testDate = DateHelper.convertExcelDateToDate(OPEN_DATE_NOVEMBER_16_2018);
        expect(testDate.getUTCFullYear()).to.be.equal(2018);
        expect(testDate.getUTCMonth()).to.be.equal(10);
        expect(testDate.getUTCDate()).to.be.equal(16);
    }

    @test
    shouldMaintainUtcDatesWhenConverting() {
        // The times provided by Excel are in UTC time.  January 1st UTC would end up being 16:00 on
        // New Years Eve in Pacific Time (where these tests likely run)
        const testDate = DateHelper.convertExcelDateToDate(EXCEL_DATE_JANUARY_1_2019);
        expect(testDate.getUTCFullYear()).to.be.equal(2019);
        expect(testDate.getUTCMonth()).to.be.equal(0);
        expect(testDate.getUTCDate()).to.be.equal(1);
    }

    @test
    shouldBeAbleToConvertDatesAtTheEndOfTheMonth() {
        const testDate = DateHelper.convertExcelDateToDate(EXCEL_DATE_JANUARY_31_2019);
        expect(testDate.getUTCFullYear()).to.be.equal(2019);
        expect(testDate.getUTCMonth()).to.be.equal(0);
        expect(testDate.getUTCDate()).to.be.equal(31);
    }

    @test
    shouldBeAbleToCreateDatesForMonthDates() {
        const testDateJanuary = DateHelper.convertExcelDateToDate(REPORTING_MONTH_JANUARY_2019);
        expect(testDateJanuary.getUTCFullYear()).to.be.equal(2019);
        expect(testDateJanuary.getUTCMonth()).to.be.equal(0);
        expect(testDateJanuary.getUTCDate()).to.be.equal(1);

        const testDateFebruary = DateHelper.convertExcelDateToDate(REPORTING_MONTH_FEBRUARY_2019);
        expect(testDateFebruary.getUTCFullYear()).to.be.equal(2019);
        expect(testDateFebruary.getUTCMonth()).to.be.equal(1);
        expect(testDateFebruary.getUTCDate()).to.be.equal(1);
    }

    @test
    shouldThrowAnErrorIfGivenBlankString() {
        expect(() => {
            DateHelper.convertExcelDateToDate("   ")
        }).to.throw("wrong input format")
    }

}