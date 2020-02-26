import 'mocha';

import {suite, test} from "mocha-typescript";
import {ClientInteractionRowParser} from "../../../src/parsers/client-interaction-row-parser";

const assert = require('assert');
const expect = require('chai').expect;

const REPORTING_MONTH_JANUARY_2019 = "43466";
const OPEN_DATE_NOVEMBER_16_2018 = "43420";
const CLIENT_NAME: String = "Brian Tanabe";
const PROGRAM_DV = "DV";
const REFERRAL_SOURCE = "Project Safety - Kent";
const SIMPLE_LEGAL_SERVER_NUMBER: String = "20-0055166";
const COMPLEX_LEGAL_SERVER_NUMBER: String = "20-0055178 / 20-0055179";
const ATTORNEY_NAME: String = "Ailise Delaney";
const LEGAL_ISSUE = "DVPO";
const TYPE_OF_SERVICE_LIMITED_REPRESENTATION: String = "Limited Representation";
const TYPE_OF_SERVICE_EXTENDED_SERVICES: String = "Extended Services";
const STATUS_OPEN: String = "Open";
const STATUS_CLOSED: String = "Closed";
const CLOSED_DATE_NULL: Date = null;
const CLOSED_DATE_JANUARY_29_2019 = "43494";
const NOTES = "Ipsum lorem";
const COURT_APPEARANCES_1 = "1";
const COURT_APPEARANCES_BLANK = "";

@suite
class ClientInteractionRowParserSpec {

    @test
    shouldBeAbleToDetermineIfAnOpenCaseIsValid() {
        expect(ClientInteractionRowParser.isValidClientInteraction([
            REPORTING_MONTH_JANUARY_2019,
            OPEN_DATE_NOVEMBER_16_2018,
            CLIENT_NAME,
            PROGRAM_DV,
            REFERRAL_SOURCE,
            COMPLEX_LEGAL_SERVER_NUMBER,
            ATTORNEY_NAME,
            LEGAL_ISSUE,
            TYPE_OF_SERVICE_EXTENDED_SERVICES,
            STATUS_OPEN,
            CLOSED_DATE_NULL,
            NOTES,
            COURT_APPEARANCES_1
        ])).to.be.true;
    }

    @test
    shouldBeAbleToDetermineIfAClosedCaseIsValid() {
        expect(ClientInteractionRowParser.isValidClientInteraction([
            REPORTING_MONTH_JANUARY_2019,
            OPEN_DATE_NOVEMBER_16_2018,
            CLIENT_NAME,
            PROGRAM_DV,
            REFERRAL_SOURCE,
            COMPLEX_LEGAL_SERVER_NUMBER,
            ATTORNEY_NAME,
            LEGAL_ISSUE,
            TYPE_OF_SERVICE_EXTENDED_SERVICES,
            STATUS_CLOSED,
            CLOSED_DATE_JANUARY_29_2019,
            NOTES,
            COURT_APPEARANCES_1
        ])).to.be.true;
    }

    @test
    shuoldConsiderRowsWithoutTwelveColumnsInvalid() {
        expect(ClientInteractionRowParser.isValidClientInteraction([
            REPORTING_MONTH_JANUARY_2019,
            OPEN_DATE_NOVEMBER_16_2018,
            CLIENT_NAME,
            PROGRAM_DV,
            REFERRAL_SOURCE,
            COMPLEX_LEGAL_SERVER_NUMBER,
            ATTORNEY_NAME,
            LEGAL_ISSUE,
            TYPE_OF_SERVICE_EXTENDED_SERVICES,
            STATUS_OPEN,
            CLOSED_DATE_NULL,
            NOTES
        ])).to.be.false;
    }

    @test
    shouldBeAbleToDetermineIfAnOpenCaseWithoutAnyCourtAppearancesIsValid() {

    }

    @test
    shouldConsiderRowsWithoutReportingMonthsAsInvalid() {

    }

    @test
    shouldConsiderRowsWithoutAttorneyNamesAsInvalid() {

    }

    @test
    shouldConsiderRowsWithoutClientNamesAsInvalid() {

    }

    @test
    shouldConsiderRowsWithoutAnOpenDateAsInvalid() {

    }

    private createTestArray(
        reportingMonth: Number,
        openDate: Number,
        clientName: String,
        referralSource: String,
        legalServerNumber: String,
        attorneyName: String,
        legalIssue: String,
        typeOfService: String,
        status: String,
        closedDate: Number,
        notes: String,
        courtAppearances: Number
    ): any[] {

        return [
            reportingMonth,
            openDate,
            clientName,
            referralSource,
            legalServerNumber,
            attorneyName,
            legalIssue,
            typeOfService,
            status,
            closedDate,
            notes,
            courtAppearances
        ];
    }
}