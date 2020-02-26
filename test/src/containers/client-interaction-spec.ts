import 'mocha';

import {ClientInteraction} from '../../../src/containers/client-interaction';
import {suite, test} from "mocha-typescript";

const assert = require('assert');
const expect = require('chai').expect;

const ATTORNEY_NAME: String = "Ailise Delaney";
const CLIENT_NAME: String = "Brian Tanabe";
const SIMPLE_LEGAL_SERVER_NUMBER: String = "20-0055166";
const COMPLEX_LEGAL_SERVER_NUMBER: String = "20-0055178 / 20-0055179";
const TYPE_OF_SERVICE_LIMITED_REPRESENTATION: String = "Limited Representation";
const TYPE_OF_SERVICE_EXTENDED_SERVICES: String = "Extended Services";
const STATUS_OPEN: String = "Open";
const STATUS_CLOSED: String = "Closed";
const CLOSED_DATE_NULL: Date = null;

@suite
class ClientInteractionSpec {

    @test
    shouldBeAbleToCreateAClientInteractionWithNullClosedDate() {
        const reportingMonth: Date = new Date(Date.UTC(2019, 1, 1).valueOf());
        const clientOpenDate: Date = new Date(Date.UTC(2019, 2, 14).valueOf());

        let testClientInteraction = new ClientInteraction(
            reportingMonth,
            clientOpenDate,
            CLIENT_NAME,
            ATTORNEY_NAME,
            SIMPLE_LEGAL_SERVER_NUMBER,
            CLOSED_DATE_NULL,
            TYPE_OF_SERVICE_EXTENDED_SERVICES,
            2,
            STATUS_OPEN
        );

        this.verifyClientInteraction(
            testClientInteraction,
            new Date(Date.UTC(2019, 1, 1).valueOf()),
            new Date(Date.UTC(2019, 2, 14).valueOf()),
            CLIENT_NAME,
            ATTORNEY_NAME,
            SIMPLE_LEGAL_SERVER_NUMBER,
            CLOSED_DATE_NULL,
            TYPE_OF_SERVICE_EXTENDED_SERVICES,
            2,
            STATUS_OPEN.toLowerCase()
        );
    }

    @test
    shouldNotConsiderClientInteractionsWithNullReportingMonthsValid() {
        const invalidReportingMonth: Date = null;
        const clientOpenDate: Date = new Date(Date.UTC(2019, 2, 14).valueOf());

        expect(() => {
            new ClientInteraction(
                invalidReportingMonth,
                clientOpenDate,
                CLIENT_NAME,
                ATTORNEY_NAME,
                SIMPLE_LEGAL_SERVER_NUMBER,
                CLOSED_DATE_NULL,
                TYPE_OF_SERVICE_EXTENDED_SERVICES,
                2,
                STATUS_OPEN.toLowerCase()
            );
        }).to.throw("A ClientInteraction cannot have a null reporting month!");
    }

    @test
    shouldNotConsiderClientInteractionsWithNullAttorneyValid() {
        const reportingMonth: Date = new Date(Date.UTC(2019, 1, 1).valueOf());
        const clientOpenDate: Date = new Date(Date.UTC(2019, 2, 14).valueOf());

        const invalidAttorneyName: String = null;

        expect(() => {
            new ClientInteraction(
                reportingMonth,
                clientOpenDate,
                CLIENT_NAME,
                invalidAttorneyName,
                SIMPLE_LEGAL_SERVER_NUMBER,
                CLOSED_DATE_NULL,
                TYPE_OF_SERVICE_EXTENDED_SERVICES,
                2,
                STATUS_OPEN.toLowerCase()
            );
        }).to.throw("A ClientInteraction cannot have a null attorney name!");
    }

    @test
    shouldNotConsiderClientInteractionsWithNullClientValid() {
        const reportingMonth: Date = new Date(Date.UTC(2019, 1, 1).valueOf());
        const clientOpenDate: Date = new Date(Date.UTC(2019, 2, 14).valueOf());

        const invalidClientName: String = null;

        expect(() => {
            new ClientInteraction(
                reportingMonth,
                clientOpenDate,
                invalidClientName,
                ATTORNEY_NAME,
                SIMPLE_LEGAL_SERVER_NUMBER,
                CLOSED_DATE_NULL,
                TYPE_OF_SERVICE_EXTENDED_SERVICES,
                2,
                STATUS_OPEN.toLowerCase()
            );
        }).to.throw();
    }

    @test
    shouldNotConsiderClientInteractionsWithNullCourtAppearancesValid() {
        const reportingMonth: Date = new Date(Date.UTC(2019, 1, 1).valueOf());
        const clientOpenDate: Date = new Date(Date.UTC(2019, 2, 14).valueOf());

        const invalidCourtAppearances: Number = null;

        expect(() => {
            new ClientInteraction(
                reportingMonth,
                clientOpenDate,
                CLIENT_NAME,
                ATTORNEY_NAME,
                SIMPLE_LEGAL_SERVER_NUMBER,
                CLOSED_DATE_NULL,
                TYPE_OF_SERVICE_EXTENDED_SERVICES,
                invalidCourtAppearances,
                STATUS_OPEN.toLowerCase()
            );
        }).to.throw();
    }

    private verifyClientInteraction(
        testClientInteraction: ClientInteraction,
        expectedReportingMonth: Date,
        expectedOpenDate: Date,
        expectedClientName: String,
        expectedAttorneyName: String,
        expectedLegalServerNumber: String,
        expectedClosedDate: Date,
        expectedTypeOfService: String,
        expectedCourtAppearances: Number,
        expectedStatus: String
    ) {

        // I would like to use BDD here but I can't figure out how to do deep equality checks needed
        // for date comparisons with the expect-equals syntax
        assert.deepStrictEqual(testClientInteraction.reportingMonth, expectedReportingMonth);
        assert.deepStrictEqual(testClientInteraction.openDate, expectedOpenDate);
        assert.strictEqual(testClientInteraction.clientName, expectedClientName);
        assert.strictEqual(testClientInteraction.attorneyName, expectedAttorneyName);
        assert.strictEqual(testClientInteraction.legalServerNumber, expectedLegalServerNumber);
        assert.strictEqual(testClientInteraction.closedDate, expectedClosedDate);
        assert.strictEqual(testClientInteraction.typeOfService, expectedTypeOfService);
        assert.strictEqual(testClientInteraction.courtAppearances, expectedCourtAppearances);
        assert.strictEqual(testClientInteraction.status, expectedStatus);
    }

}