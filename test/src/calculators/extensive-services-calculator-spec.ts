import 'mocha';
import {suite, test} from "mocha-typescript";
import {ClientInteraction} from "../../../src/containers/client-interaction";
import {CalculatorTestBase} from "./calculator-test-base";
import {expect} from 'chai';
import {ExtensiveServicesCalculator} from "../../../src/calculators/extensive-services-calculator";
import {ClientInteractionFactory} from "../factories/client-interaction-factory";

const faker = require('faker');

@suite
class ExtensiveServicesCalculatorSpec extends CalculatorTestBase {

    @test
    shouldBeAbleToComputeExtensiveServicesCasesForASingleMonth() {
        let extensiveServicesCalculator = new ExtensiveServicesCalculator(
            this.createTestClientInteractionsWithTypeOfService(
                this.REPORTING_MONTH,
                1,
                0,
                0,
                this.TYPE_OF_SERVICE_EXTENDED_SERVICES
            ),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );

        expect(extensiveServicesCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(1);
    }

    @test
    shouldBeAbleToComputeMultipleExtensiveServicesCasesForASingleMonth() {
        let extensiveServicesCalculator = new ExtensiveServicesCalculator(
            this.createTestClientInteractionsWithTypeOfService(
                this.REPORTING_MONTH,
                4,
                0,
                0,
                this.TYPE_OF_SERVICE_EXTENDED_SERVICES
            ),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );

        expect(extensiveServicesCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(4);
    }

    @test
    shouldBeAbleToComputeMultipleExtensiveServicesCasesForASingleMonthWhereCasesAreLimitedRepresentation() {
        const extendedServicesClientInteractions: Set<ClientInteraction> = this.createTestClientInteractionsWithTypeOfService(
            this.REPORTING_MONTH,
            4,
            2,
            0,
            this.TYPE_OF_SERVICE_EXTENDED_SERVICES
        );
        const limitedRepresentationClientInteractions: Set<ClientInteraction> = this.createTestClientInteractionsWithTypeOfService(
            this.REPORTING_MONTH,
            4,
            2,
            0,
            this.TYPE_OF_SERVICE_LIMITED_REPRESENTATION
        );

        let extensiveServicesCalculator = new ExtensiveServicesCalculator(
            this.combineTwoSets(limitedRepresentationClientInteractions, extendedServicesClientInteractions),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );

        expect(extensiveServicesCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(6);
    }

    @test
    shouldBeAbleToComputeMultipleExtensiveServicesCasesForMultipleMonths() {
        const clientInteractionsFromReportingMonth: Set<ClientInteraction> = this.createTestClientInteractionsWithTypeOfService(
            this.REPORTING_MONTH,
            4,
            2,
            0,
            this.TYPE_OF_SERVICE_EXTENDED_SERVICES
        );
        const clientInteractionsFromAnotherMonth: Set<ClientInteraction> = this.createTestClientInteractionsWithTypeOfService(
            this.NEXT_MONTH,
            4,
            2,
            0,
            this.TYPE_OF_SERVICE_EXTENDED_SERVICES
        );

        let extensiveServicesCalculator = new ExtensiveServicesCalculator(
            this.combineTwoSets(clientInteractionsFromAnotherMonth, clientInteractionsFromReportingMonth),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );
        expect(extensiveServicesCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(6);
    }

    @test
    shouldBeAbleToComputeMultipleExtensiveServicesCasesForMultipleMonthsForMultipleAttorneys() {
        const clientInteractionsForReportingMonth = this.createTestClientInteractionsWithTypeOfService(
            this.REPORTING_MONTH,
            4,
            2,
            4,
            this.TYPE_OF_SERVICE_EXTENDED_SERVICES
        );
        const clientInteractionsForAnotherMonth = this.createTestClientInteractionsWithTypeOfService(
            this.NEXT_MONTH,
            4,
            2,
            4,
            this.TYPE_OF_SERVICE_EXTENDED_SERVICES
        );
        let extensiveServicesCalculator = new ExtensiveServicesCalculator(
            this.combineTwoSets(clientInteractionsForReportingMonth, clientInteractionsForAnotherMonth),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );
        expect(extensiveServicesCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(6);
    }

    @test
    shouldNotConsiderMultipleCasesForTheSameClientAsRedundantCounts() {
        const clientInteractionOne: ClientInteraction = ClientInteractionFactory.createOpenClientInteractionWithOpenDateAndTypeOfService(
            this.REPORTING_MONTH,
            this.ATTORNEY_NAME,
            faker.date.recent(),
            this.TYPE_OF_SERVICE_EXTENDED_SERVICES
        );
        // Since this is the same client, it shouldn't be counted again:
        const anotherInteractionFromTheSameClientInTheSameMonth: ClientInteraction = new ClientInteraction(
            clientInteractionOne.reportingMonth,
            clientInteractionOne.openDate,
            clientInteractionOne.clientName,
            clientInteractionOne.attorneyName,
            faker.random.number().toString(),
            clientInteractionOne.closedDate,
            clientInteractionOne.typeOfService,
            clientInteractionOne.courtAppearances,
            clientInteractionOne.status
        );

        let extensiveServicesCalculator = new ExtensiveServicesCalculator(
            new Set([clientInteractionOne, anotherInteractionFromTheSameClientInTheSameMonth]),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );

        expect(extensiveServicesCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(1);
        expect(extensiveServicesCalculator.getTotalCount(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(1);
    }

    @test
    shouldBeAbleToGetTotalExtensiveServicesCountForMultipleMonthsForMultipleAttorneysForOverMultipleYears() {
        const extensiveServicesPreviousYear = this.createTestClientInteractionsWithTypeOfService(
            this.PREVIOUS_YEAR,
            3,
            1,
            4,
            this.TYPE_OF_SERVICE_EXTENDED_SERVICES
        );
        const extensiveServicesPreviousReportingMonth = this.createTestClientInteractionsWithTypeOfService(
            this.PREVIOUS_MONTH,
            5,
            3,
            4,
            this.TYPE_OF_SERVICE_EXTENDED_SERVICES
        );
        const extensiveServicesCurrentReportingMonth = this.createTestClientInteractionsWithTypeOfService(
            this.REPORTING_MONTH,
            7,
            4,
            4,
            this.TYPE_OF_SERVICE_EXTENDED_SERVICES
        );
        const extensiveServicesNextYear = this.createTestClientInteractionsWithTypeOfService(
            this.NEXT_YEAR,
            9,
            7,
            4,
            this.TYPE_OF_SERVICE_EXTENDED_SERVICES
        );

        let extensiveServicesCalculator = new ExtensiveServicesCalculator(
            this.combineSets([
                extensiveServicesPreviousYear,
                extensiveServicesPreviousReportingMonth,
                extensiveServicesCurrentReportingMonth,
                extensiveServicesNextYear
            ]),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );

        expect(extensiveServicesCalculator.getTotalCount(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(19);
    }
}