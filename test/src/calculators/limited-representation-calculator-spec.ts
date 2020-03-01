import 'mocha';

import {suite, test} from "mocha-typescript";
import {CalculatorTestBase} from "./calculator-test-base";
import {ClientInteraction} from "../../../src/containers/client-interaction";
import {LimitedRepresentationCalculator} from "../../../src/calculators/limited-representation-calculator";
import {ClientInteractionFactory} from "../factories/client-interaction-factory";
import * as faker from "faker";

const expect = require('chai').expect;

@suite
class LimitedRepresentationCalculatorSpec extends CalculatorTestBase {

    @test
    shouldBeAbleToComputeLimitedRepresentationCasesForASingleMonth() {
        let limitedRepresentationCalculator = new LimitedRepresentationCalculator(
            this.createTestClientInteractionsWithTypeOfService(
                this.REPORTING_MONTH,
                1,
                0,
                0,
                this.TYPE_OF_SERVICE_LIMITED_REPRESENTATION
            ),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );

        expect(limitedRepresentationCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(1);
    }

    @test
    shouldBeAbleToComputeMultipleLimitedRepresentationCasesForASingleMonth() {
        let limitedRepresentationCalculator = new LimitedRepresentationCalculator(
            this.createTestClientInteractionsWithTypeOfService(
                this.REPORTING_MONTH,
                4,
                0,
                0,
                this.TYPE_OF_SERVICE_LIMITED_REPRESENTATION
            ),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );

        expect(limitedRepresentationCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(4);
    }

    @test
    shouldBeAbleToComputeMultipleLimitedRepresentationCasesForASingleMonthWhereCasesAreBriefServices() {
        const limitedRepresentationClientInteractions: Set<ClientInteraction> = this.createTestClientInteractionsWithTypeOfService(
            this.REPORTING_MONTH,
            4,
            2,
            0,
            this.TYPE_OF_SERVICE_LIMITED_REPRESENTATION
        );
        const briefServicesClientInteractions: Set<ClientInteraction> = this.createTestClientInteractionsWithTypeOfService(
            this.REPORTING_MONTH,
            4,
            2,
            0,
            this.TYPE_OF_SERVICE_BRIEF_SERVICES
        );

        let limitedRepresentationCalculator = new LimitedRepresentationCalculator(
            this.combineTwoSets(limitedRepresentationClientInteractions, briefServicesClientInteractions),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );

        expect(limitedRepresentationCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(6);
    }

    @test
    shouldBeAbleToComputeMultipleLimitedRepresentationCasesForMultipleMonths() {
        const clientInteractionsFromReportingMonth: Set<ClientInteraction> = this.createTestClientInteractionsWithTypeOfService(
            this.REPORTING_MONTH,
            4,
            2,
            0,
            this.TYPE_OF_SERVICE_LIMITED_REPRESENTATION
        );
        const clientInteractionsFromAnotherMonth: Set<ClientInteraction> = this.createTestClientInteractionsWithTypeOfService(
            this.NEXT_MONTH,
            4,
            2,
            0,
            this.TYPE_OF_SERVICE_LIMITED_REPRESENTATION
        );

        let limitedRepresentationCalculator = new LimitedRepresentationCalculator(
            this.combineTwoSets(clientInteractionsFromAnotherMonth, clientInteractionsFromReportingMonth),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );
        expect(limitedRepresentationCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(6);
    }

    @test
    shouldBeAbleToComputeMultipleLimitedRepresentationCasesForMultipleMonthsForMultipleAttorneys() {
        let limitedRepresentationCalculator = new LimitedRepresentationCalculator(
            this.createTestClientInteractionsWithTypeOfService(
                this.REPORTING_MONTH,
                4,
                2,
                4,
                this.TYPE_OF_SERVICE_LIMITED_REPRESENTATION
            ),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );
        expect(limitedRepresentationCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(6);
    }


    @test
    shouldNotCountMultipleLimitedRepresentationClientInteractionsForTheSameClient() {
        const clientInteractionLimitedRepresentation: ClientInteraction = ClientInteractionFactory.createOpenClientInteractionWithOpenDateAndTypeOfService(
            this.REPORTING_MONTH,
            this.ATTORNEY_NAME,
            this.PREVIOUS_MONTH,
            this.TYPE_OF_SERVICE_LIMITED_REPRESENTATION
        );
        const anotherClientInteractionLimitedRepresentation: ClientInteraction = new ClientInteraction(
            clientInteractionLimitedRepresentation.reportingMonth,
            clientInteractionLimitedRepresentation.openDate,
            clientInteractionLimitedRepresentation.clientName,
            clientInteractionLimitedRepresentation.attorneyName,
            faker.random.number().toString(),
            clientInteractionLimitedRepresentation.closedDate,
            clientInteractionLimitedRepresentation.typeOfService,
            clientInteractionLimitedRepresentation.courtAppearances,
            clientInteractionLimitedRepresentation.status
        );

        let limitedRepresentationCalculator = new LimitedRepresentationCalculator(
            new Set<ClientInteraction>([
                clientInteractionLimitedRepresentation,
                anotherClientInteractionLimitedRepresentation
            ]),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );

        expect(limitedRepresentationCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(1);
    }

    @test
    shouldBeAbleToGetTotalLimitedRepresentationCasesForMultipleMonthsForMultipleAttorneysForOverMultipleYears() {
        const limitedRepresentationPreviousYear = this.createTestClientInteractionsWithTypeOfService(
            this.PREVIOUS_YEAR,
            3,
            1,
            4,
            this.TYPE_OF_SERVICE_LIMITED_REPRESENTATION
        );
        const limitedRepresentationPreviousReportingMonth = this.createTestClientInteractionsWithTypeOfService(
            this.PREVIOUS_MONTH,
            3,
            1,
            4,
            this.TYPE_OF_SERVICE_LIMITED_REPRESENTATION
        );
        const limitedRepresentationCurrentReportingMonth = this.createTestClientInteractionsWithTypeOfService(
            this.REPORTING_MONTH,
            4,
            2,
            4,
            this.TYPE_OF_SERVICE_LIMITED_REPRESENTATION
        );
        const limitedRepresentationNextYear = this.createTestClientInteractionsWithTypeOfService(
            this.NEXT_YEAR,
            5,
            3,
            4,
            this.TYPE_OF_SERVICE_LIMITED_REPRESENTATION
        );

        let limitedRepresentationCalculator = new LimitedRepresentationCalculator(
            this.combineSets([
                limitedRepresentationPreviousYear,
                limitedRepresentationPreviousReportingMonth,
                limitedRepresentationCurrentReportingMonth,
                limitedRepresentationNextYear
            ]),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );

        expect(limitedRepresentationCalculator.getTotalCount(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(10);
    }
}