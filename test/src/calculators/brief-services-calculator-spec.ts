import 'mocha';

import {suite, test} from "mocha-typescript";
import {ClientInteraction} from "../../../src/containers/client-interaction";
import {CalculatorTestBase} from "./calculator-test-base";
import {BriefServicesCalculator} from "../../../src/calculators/brief-services-calculator";
import {ClientInteractionFactory} from "../factories/client-interaction-factory";
import * as faker from "faker";

const expect = require('chai').expect;

@suite
class BriefServicesCalculatorSpec extends CalculatorTestBase {

    @test
    shouldBeAbleToComputeBriefServicesCasesForASingleMonth() {
        let briefServicesCalculator = new BriefServicesCalculator(
            this.createTestClientInteractionsWithTypeOfService(
                this.REPORTING_MONTH,
                1,
                0,
                0,
                this.TYPE_OF_SERVICE_BRIEF_SERVICES
            ),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );

        expect(briefServicesCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(1);
    }

    @test
    shouldBeAbleToComputeMultipleBriefServicesCasesForASingleMonth() {
        let briefServicesCalculator = new BriefServicesCalculator(
            this.createTestClientInteractionsWithTypeOfService(
                this.REPORTING_MONTH,
                4,
                0,
                0,
                this.TYPE_OF_SERVICE_BRIEF_SERVICES
            ),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );

        expect(briefServicesCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(4);
    }

    @test
    shouldBeAbleToComputeMultipleBriefServicesCasesForASingleMonthWhereCasesAreLimitedRepresentation() {
        const briefServicesClientInteractions: Set<ClientInteraction> = this.createTestClientInteractionsWithTypeOfService(
            this.REPORTING_MONTH,
            4,
            2,
            0,
            this.TYPE_OF_SERVICE_BRIEF_SERVICES
        );
        const limitedRepresentationClientInteractions: Set<ClientInteraction> = this.createTestClientInteractionsWithTypeOfService(
            this.REPORTING_MONTH,
            4,
            2,
            0,
            this.TYPE_OF_SERVICE_LIMITED_REPRESENTATION
        );

        let briefServicesCalculator = new BriefServicesCalculator(
            this.combineTwoSets(limitedRepresentationClientInteractions, briefServicesClientInteractions),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );

        expect(briefServicesCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(6);
    }

    @test
    shouldBeAbleToComputeMultipleBriefServicesCasesForMultipleMonths() {
        const clientInteractionsFromReportingMonth: Set<ClientInteraction> = this.createTestClientInteractionsWithTypeOfService(
            this.REPORTING_MONTH,
            4,
            2,
            0,
            this.TYPE_OF_SERVICE_BRIEF_SERVICES
        );
        const clientInteractionsFromAnotherMonth: Set<ClientInteraction> = this.createTestClientInteractionsWithTypeOfService(
            this.NEXT_MONTH,
            4,
            2,
            0,
            this.TYPE_OF_SERVICE_BRIEF_SERVICES
        );

        let briefServicesCalculator = new BriefServicesCalculator(
            this.combineTwoSets(clientInteractionsFromAnotherMonth, clientInteractionsFromReportingMonth),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );
        expect(briefServicesCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(6);
    }

    @test
    shouldBeAbleToComputeMultipleBriefServicesCasesForMultipleMonthsForMultipleAttorneys() {
        const clientInteractionsForReportingMonth = this.createTestClientInteractionsWithTypeOfService(
            this.REPORTING_MONTH,
            4,
            2,
            4,
            this.TYPE_OF_SERVICE_BRIEF_SERVICES
        );
        const clientInteractionsForAnotherMonth = this.createTestClientInteractionsWithTypeOfService(
            this.NEXT_MONTH,
            4,
            2,
            4,
            this.TYPE_OF_SERVICE_BRIEF_SERVICES
        );
        let briefServicesCalculator = new BriefServicesCalculator(
            this.combineTwoSets(clientInteractionsForReportingMonth, clientInteractionsForAnotherMonth),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );
        expect(briefServicesCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(6);
    }

    @test
    shouldBeAbleToGetTotalBriefServicesForMultipleMonthsForMultipleAttorneysForOverMultipleYears() {
        const briefServicesPreviousYear = this.createTestClientInteractionsWithTypeOfService(
            this.PREVIOUS_YEAR,
            3,
            1,
            4,
            this.TYPE_OF_SERVICE_BRIEF_SERVICES
        );
        const briefServicesPreviousReportingMonth = this.createTestClientInteractionsWithTypeOfService(
            this.PREVIOUS_MONTH,
            3,
            1,
            4,
            this.TYPE_OF_SERVICE_BRIEF_SERVICES
        );
        const briefServicesCurrentReportingMonth = this.createTestClientInteractionsWithTypeOfService(
            this.REPORTING_MONTH,
            4,
            2,
            4,
            this.TYPE_OF_SERVICE_BRIEF_SERVICES
        );
        const briefServicesNextYear = this.createTestClientInteractionsWithTypeOfService(
            this.NEXT_YEAR,
            5,
            3,
            4,
            this.TYPE_OF_SERVICE_BRIEF_SERVICES
        );

        let briefServicesCalculator = new BriefServicesCalculator(
            this.combineSets([
                briefServicesPreviousYear,
                briefServicesPreviousReportingMonth,
                briefServicesCurrentReportingMonth,
                briefServicesNextYear
            ]),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );

        expect(briefServicesCalculator.getTotalCount(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(10);
    }

    @test
    shouldNotCountMultipleBriefServicesClientInteractionsForTheSameClient() {
        const briefServicesClientInteraction: ClientInteraction = ClientInteractionFactory.createOpenClientInteractionWithOpenDateAndTypeOfService(
            this.REPORTING_MONTH,
            this.ATTORNEY_NAME,
            this.REPORTING_MONTH,
            this.TYPE_OF_SERVICE_BRIEF_SERVICES
        );
        const anotherBriefServicesClientInteraction: ClientInteraction = new ClientInteraction(
            briefServicesClientInteraction.reportingMonth,
            briefServicesClientInteraction.openDate,
            briefServicesClientInteraction.clientName,
            briefServicesClientInteraction.attorneyName,
            faker.random.number().toString(),
            briefServicesClientInteraction.closedDate,
            briefServicesClientInteraction.typeOfService,
            briefServicesClientInteraction.courtAppearances,
            briefServicesClientInteraction.status
        );

        let briefServicesCalculator = new BriefServicesCalculator(
            new Set<ClientInteraction>([
                briefServicesClientInteraction,
                anotherBriefServicesClientInteraction
            ]),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );

        expect(briefServicesCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(1);
    }
}