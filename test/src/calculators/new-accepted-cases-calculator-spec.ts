import {NewAcceptedCasesCalculator} from "../../../src/calculators/new-accepted-cases-calculator";
import 'mocha';

import {suite, test} from "mocha-typescript";
import {ClientInteraction} from "../../../src/containers/client-interaction";
import {CalculatorTestBase} from "./calculator-test-base";
import {ClientInteractionFactory} from "../factories/client-interaction-factory";
import {OpenCasesCalculator} from "../../../src/calculators/open-cases-calculator";

var faker = require('faker');

const expect = require('chai').expect;

@suite
class NewAcceptedCasesCalculatorSpec extends CalculatorTestBase {

    @test
    shouldBeAbleToCountNewAcceptedCasesForCasesInTheSameMonth() {
        let newAcceptedCasesCalculator = new NewAcceptedCasesCalculator(
            this.createTestClientInteractionsWithOpenDate(
                this.REPORTING_MONTH,
                2,
                0,
                0,
                this.REPORTING_MONTH
            ),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );

        expect(newAcceptedCasesCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.be.equal(2);
    }

    @test
    shouldBeAbleToCountNewAcceptedCasesForCasesInTheDifferentMonthsInTheSameYear() {
        const clientInteractionsOpenedInReportingMonth: Set<ClientInteraction> = this.createTestClientInteractionsWithOpenDate(
            this.REPORTING_MONTH,
            2,
            0,
            0,
            this.REPORTING_MONTH
        );

        const differentMonth: Date = new Date(
            this.REPORTING_MONTH.getUTCFullYear(),
            (this.REPORTING_MONTH.getUTCMonth() + 5) % 11,
            faker.random.number(31)
        );

        // Make sure the months aren't the same but the years are
        expect(this.REPORTING_MONTH.getUTCFullYear()).to.be.equal(differentMonth.getUTCFullYear());
        expect(this.REPORTING_MONTH.getUTCMonth()).not.to.be.equal(differentMonth.getUTCMonth());

        const clientInteractionsOpenedInDifferentMonth: Set<ClientInteraction> = this.createTestClientInteractionsWithOpenDate(
            this.REPORTING_MONTH,
            2,
            0,
            0,
            differentMonth
        );

        let newAcceptedCasesCalculator = new NewAcceptedCasesCalculator(
            this.combineTwoSets(clientInteractionsOpenedInReportingMonth, clientInteractionsOpenedInDifferentMonth),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );

        expect(newAcceptedCasesCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.be.equal(2);
    }

    @test
    shouldBeAbleToCountNewAcceptedCasesForCasesInTheSameMonthsInTheSameYearFromDifferentAttorneys() {
        const clientInteractionsOpenedInReportingMonth: Set<ClientInteraction> = this.createTestClientInteractionsWithOpenDate(
            this.REPORTING_MONTH,
            2,
            0,
            0,
            this.REPORTING_MONTH
        );

        const clientInteractionsOpenedInDifferentMonth: Set<ClientInteraction> = this.createTestClientInteractionsWithOpenDate(
            this.REPORTING_MONTH,
            0,
            0,
            2,
            this.REPORTING_MONTH
        );

        let newAcceptedCasesCalculator = new NewAcceptedCasesCalculator(
            this.combineTwoSets(clientInteractionsOpenedInReportingMonth, clientInteractionsOpenedInDifferentMonth),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );

        expect(newAcceptedCasesCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.be.equal(2);
    }

    @test
    shouldBeAbleToCountNewAcceptedCasesForCasesInTheSameMonthsInTheDifferentYears() {
        const clientInteractionsOpenedInReportingMonth: Set<ClientInteraction> = this.createTestClientInteractionsWithOpenDate(
            this.REPORTING_MONTH,
            2,
            0,
            0,
            this.REPORTING_MONTH
        );

        const differentYear: Date = new Date(
            this.REPORTING_MONTH.getUTCFullYear() - 1,
            this.REPORTING_MONTH.getUTCMonth(),
            faker.random.number(31)
        );

        // Make sure the months aren't the same but the years are
        expect(this.REPORTING_MONTH.getUTCFullYear()).not.to.be.equal(differentYear.getUTCFullYear());
        expect(this.REPORTING_MONTH.getUTCMonth()).to.be.equal(differentYear.getUTCMonth());

        const clientInteractionsOpenedInDifferentMonth: Set<ClientInteraction> = this.createTestClientInteractionsWithOpenDate(
            this.REPORTING_MONTH,
            2,
            0,
            0,
            differentYear
        );

        let newAcceptedCasesCalculator = new NewAcceptedCasesCalculator(
            this.combineTwoSets(clientInteractionsOpenedInReportingMonth, clientInteractionsOpenedInDifferentMonth),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );

        expect(newAcceptedCasesCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.be.equal(2);
    }

    @test
    shouldBeAbleToGetTotalNewAcceptedCasesForMultipleMonthsForMultipleAttorneysForOverMultipleYears() {
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
            1,
            4,
            this.PREVIOUS_MONTH
        );
        const briefServicesCurrentReportingMonth = this.createTestClientInteractionsWithOpenDate(
            this.REPORTING_MONTH,
            4,
            2,
            4,
            this.REPORTING_MONTH
        );
        const briefServicesNextYear = this.createTestClientInteractionsWithOpenDate(
            this.NEXT_YEAR,
            5,
            3,
            4,
            this.NEXT_YEAR
        );

        let newAcceptedCasesCalculator = new NewAcceptedCasesCalculator(
            this.combineSets([
                briefServicesPreviousYear,
                briefServicesPreviousReportingMonth,
                briefServicesCurrentReportingMonth,
                briefServicesNextYear
            ]),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );

        expect(newAcceptedCasesCalculator.getTotalCount(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(10);
    }

    @test
    shouldNotCountMultipleNewAcceptedClientInteractionsForTheSameClient() {
        const newAcceptedClientInteraction: ClientInteraction = ClientInteractionFactory.createOpenClientInteractionWithOpenDate(
            this.REPORTING_MONTH,
            this.ATTORNEY_NAME,
            this.REPORTING_MONTH
        );
        const anotherNewAcceptedClientInteraction: ClientInteraction = new ClientInteraction(
            newAcceptedClientInteraction.reportingMonth,
            newAcceptedClientInteraction.openDate,
            newAcceptedClientInteraction.clientName,
            newAcceptedClientInteraction.attorneyName,
            faker.random.number().toString(),
            newAcceptedClientInteraction.closedDate,
            newAcceptedClientInteraction.typeOfService,
            newAcceptedClientInteraction.courtAppearances,
            newAcceptedClientInteraction.status
        );

        let newAcceptedCasesCalculator = new NewAcceptedCasesCalculator(
            new Set<ClientInteraction>([
                newAcceptedClientInteraction,
                anotherNewAcceptedClientInteraction
            ]),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );

        expect(newAcceptedCasesCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(1);
    }
}