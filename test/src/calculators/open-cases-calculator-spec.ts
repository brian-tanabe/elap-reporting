import {CalculatorTestBase} from "./calculator-test-base";

import 'mocha';

import {OpenCasesCalculator} from "../../../src/calculators/open-cases-calculator";

import {suite, test} from "mocha-typescript";
import {ClientInteraction} from "../../../src/containers/client-interaction";
import {ClientInteractionFactory} from "../factories/client-interaction-factory";
import * as faker from "faker";

const expect = require('chai').expect;

@suite
class OpenCasesCalculatorSpec extends CalculatorTestBase {

    @test
    shouldBeAbleToComputeOpenCasesForASingleMonth() {
        let openCasesCalculator = new OpenCasesCalculator(
            this.createTestClientInteractions(
                this.REPORTING_MONTH,
                1,
                0,
                0,
            ),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );

        expect(openCasesCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(1);
    }

    @test
    shouldBeAbleToComputeMultipleOpenCasesForASingleMonth() {
        let openCasesCalculator = new OpenCasesCalculator(
            this.createTestClientInteractions(
                this.REPORTING_MONTH,
                4,
                0,
                0
            ),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );

        expect(openCasesCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(4);
    }

    @test
    shouldBeAbleToComputeMultipleOpenCasesForASingleMonthWhereCasesAreClosed() {
        let openCasesCalculator = new OpenCasesCalculator(
            this.createTestClientInteractions(
                this.REPORTING_MONTH,
                4,
                2,
                0
            ),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );

        expect(openCasesCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(4);
    }

    @test
    shouldBeAbleToComputeMultipleOpenCasesForMultipleMonths() {
        const clientInteractionInReportingMonth = this.createTestClientInteractions(
            this.REPORTING_MONTH,
            4,
            2,
            0
        );

        const clientInteractionInNextMonth = this.createTestClientInteractions(
            this.NEXT_MONTH,
            4,
            2,
            0
        );

        let openCasesCalculator = new OpenCasesCalculator(
            this.combineTwoSets(clientInteractionInReportingMonth, clientInteractionInNextMonth),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );
        expect(openCasesCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(4);
    }

    @test
    shouldBeAbleToComputeMultipleOpenCasesForMultipleMonthsForMultipleAttorneys() {
        const clientInteractionInReportingMonth = this.createTestClientInteractions(
            this.REPORTING_MONTH,
            4,
            2,
            2
        );
        const clientInteractionInNextMonth = this.createTestClientInteractions(
            this.NEXT_MONTH,
            4,
            2,
            2
        );

        let openCasesCalculator = new OpenCasesCalculator(
            this.combineTwoSets(clientInteractionInReportingMonth, clientInteractionInNextMonth),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );
        expect(openCasesCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(4);
    }

    @test
    shouldOnlyCountCasesOpenAtTheEndOfDecemberAsTheTotalForTheYear() {
        const clientInteractionInReportingMonth = this.createTestClientInteractions(
            this.REPORTING_MONTH,
            4,
            2,
            2
        );
        const clientInteractionInNextMonth = this.createTestClientInteractions(
            new Date(Date.UTC(this.REPORTING_MONTH.getUTCFullYear(), 11, 1)),
            9,
            12,
            2
        );

        const openCasesCalculator = new OpenCasesCalculator(
            this.combineTwoSets(clientInteractionInReportingMonth, clientInteractionInNextMonth),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );
        expect(openCasesCalculator.getTotalCount(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.be.equal(9);
    }

    @test
    shouldNotCountMultipleOpenClientInteractionsForTheSameClient() {
        const openClientInteraction: ClientInteraction = ClientInteractionFactory.createOpenClientInteraction(
            this.REPORTING_MONTH,
            this.ATTORNEY_NAME,
        );
        const anotherOpenClientInteraction: ClientInteraction = new ClientInteraction(
            openClientInteraction.reportingMonth,
            openClientInteraction.openDate,
            openClientInteraction.clientName,
            openClientInteraction.attorneyName,
            faker.random.number().toString(),
            openClientInteraction.closedDate,
            openClientInteraction.typeOfService,
            openClientInteraction.courtAppearances,
            openClientInteraction.status
        );

        let openCasesCalculator = new OpenCasesCalculator(
            new Set<ClientInteraction>([
                openClientInteraction,
                anotherOpenClientInteraction
            ]),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );

        expect(openCasesCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(1);
    }
}