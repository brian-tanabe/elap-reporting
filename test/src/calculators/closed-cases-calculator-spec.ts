import {CalculatorTestBase} from "./calculator-test-base";

import 'mocha';

import {ClosedCasesCalculator} from "../../../src/calculators/closed-cases-calculator";

import {suite, test} from "mocha-typescript";
import {ClientInteraction} from "../../../src/containers/client-interaction";
import {ClientInteractionFactory} from "../factories/client-interaction-factory";
import * as faker from "faker";

const expect = require('chai').expect;

@suite
class ClosedCasesCalculatorSpec extends CalculatorTestBase {

    @test
    shouldBeAbleToComputeClosedCasesForASingleMonth() {
        let closedCasesCalculator = new ClosedCasesCalculator(
            this.createTestClientInteractions(
                this.REPORTING_MONTH,
                0,
                1,
                0,
            ),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );

        expect(closedCasesCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(1);
    }

    @test
    shouldBeAbleToComputeMultipleClosedCasesForASingleMonth() {
        let closedCasesCalculator = new ClosedCasesCalculator(
            this.createTestClientInteractions(
                this.REPORTING_MONTH,
                0,
                4,
                0
            ),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );

        expect(closedCasesCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(4);
    }

    @test
    shouldBeAbleToComputeMultipleClosedCasesForASingleMonthWhereCasesAreClosed() {
        let closedCasesCalculator = new ClosedCasesCalculator(
            this.createTestClientInteractions(
                this.REPORTING_MONTH,
                4,
                2,
                0
            ),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );

        expect(closedCasesCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(2);
    }

    @test
    shouldBeAbleToComputeMultipleClosedCasesForMultipleMonths() {
        let clientInteractions = new Set<ClientInteraction>();
        this.createTestClientInteractions(
            this.REPORTING_MONTH,
            4,
            2,
            0
        ).forEach((clientInteraction) => {
            clientInteractions.add(clientInteraction);
        });

        this.createTestClientInteractions(
            this.NEXT_MONTH,
            4,
            2,
            0
        ).forEach((clientInteraction) => {
            clientInteractions.add(clientInteraction);
        });

        let closedCasesCalculator = new ClosedCasesCalculator(clientInteractions, this.REPORT_START_DATE, this.REPORT_END_DATE);
        expect(closedCasesCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(2);
    }

    @test
    shouldBeAbleToComputeMultipleClosedCasesForMultipleMonthsForMultipleAttorneys() {
        let clientInteractions = new Set<ClientInteraction>();
        this.createTestClientInteractions(
            this.REPORTING_MONTH,
            4,
            2,
            2
        ).forEach((clientInteraction) => {
            clientInteractions.add(clientInteraction);
        });

        this.createTestClientInteractions(
            this.NEXT_MONTH,
            4,
            2,
            2
        ).forEach((clientInteraction) => {
            clientInteractions.add(clientInteraction);
        });

        let closedCasesCalculator = new ClosedCasesCalculator(clientInteractions, this.REPORT_START_DATE, this.REPORT_END_DATE);
        expect(closedCasesCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(2);
    }

    @test
    shouldBeAbleToGetTotalClosedCasesForMultipleMonthsForMultipleAttorneysForOverMultipleYears() {
        const briefServicesPreviousYear = this.createTestClientInteractionsWithOpenDate(
            this.PREVIOUS_YEAR,
            3,
            1,
            4,
            this.PREVIOUS_YEAR
        );
        const briefServicesPreviousReportingMonth = this.createTestClientInteractionsWithOpenDate(
            this.PREVIOUS_MONTH,
            3,
            2,
            4,
            this.PREVIOUS_MONTH
        );
        const briefServicesCurrentReportingMonth = this.createTestClientInteractionsWithOpenDate(
            this.REPORTING_MONTH,
            4,
            3,
            4,
            this.REPORTING_MONTH
        );
        const briefServicesNextYear = this.createTestClientInteractionsWithOpenDate(
            this.NEXT_YEAR,
            5,
            4,
            4,
            this.NEXT_YEAR
        );

        let closedCasesCalculator = new ClosedCasesCalculator(
            this.combineSets([
                briefServicesPreviousYear,
                briefServicesPreviousReportingMonth,
                briefServicesCurrentReportingMonth,
                briefServicesNextYear
            ]),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );

        expect(closedCasesCalculator.getTotalCount(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(5);
    }

    @test
    shouldNotCountMultipleClosedClientInteractionsForTheSameClient() {
        const closedClientInteraction: ClientInteraction = ClientInteractionFactory.createClosedClientInteraction(
            this.REPORTING_MONTH,
            this.ATTORNEY_NAME,
        );
        const anotherClosedClientInteraction: ClientInteraction = new ClientInteraction(
            closedClientInteraction.reportingMonth,
            closedClientInteraction.openDate,
            closedClientInteraction.clientName,
            closedClientInteraction.attorneyName,
            faker.random.number().toString(),
            closedClientInteraction.closedDate,
            closedClientInteraction.typeOfService,
            closedClientInteraction.courtAppearances,
            closedClientInteraction.status
        );

        let closedCasesCalculator = new ClosedCasesCalculator(
            new Set<ClientInteraction>([
                closedClientInteraction,
                anotherClosedClientInteraction
            ]),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );

        expect(closedCasesCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(1);
    }
}