import {CalculatorTestBase} from "./calculator-test-base";

import 'mocha';

import {suite, test} from "mocha-typescript";
import {ClientInteraction} from "../../../src/containers/client-interaction";
import {AdviceAndCounselCalculator} from "../../../src/calculators/advice-and-counsel-calculator";
import {ClientInteractionFactory} from "../factories/client-interaction-factory";
import * as faker from "faker";

const expect = require('chai').expect;

@suite
class AdviceAndCounselCalculatorSpec extends CalculatorTestBase {

    @test
    shouldBeAbleToComputeAdviceAndCounselCasesForASingleMonth() {
        let adviceAndCounselCalculator = new AdviceAndCounselCalculator(
            this.createTestClientInteractionsWithTypeOfService(
                this.REPORTING_MONTH,
                1,
                0,
                0,
                this.TYPE_OF_SERVICE_ADVICE_AND_COUNSEL
            ),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );

        expect(adviceAndCounselCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(1);
    }

    @test
    shouldBeAbleToComputeMultipleAdviceAndCounselCasesForASingleMonth() {
        let adviceAndCounselCalculator = new AdviceAndCounselCalculator(
            this.createTestClientInteractionsWithTypeOfService(
                this.REPORTING_MONTH,
                4,
                0,
                0,
                this.TYPE_OF_SERVICE_ADVICE_AND_COUNSEL
            ),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );

        expect(adviceAndCounselCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(4);
    }

    @test
    shouldBeAbleToComputeMultipleAdviceAndCounselCasesForASingleMonthWhereSomeCasesAreLimitedRepresentation() {
        const adviceAndCounselClientInteractions = this.createTestClientInteractionsWithTypeOfService(
            this.REPORTING_MONTH,
            4,
            2,
            0,
            this.TYPE_OF_SERVICE_ADVICE_AND_COUNSEL
        );
        const limitedRepresentationClientInteractions = this.createTestClientInteractionsWithTypeOfService(
            this.REPORTING_MONTH,
            4,
            2,
            0,
            this.TYPE_OF_SERVICE_LIMITED_REPRESENTATION
        );
        let adviceAndCounselCalculator = new AdviceAndCounselCalculator(
            this.combineTwoSets(adviceAndCounselClientInteractions, limitedRepresentationClientInteractions),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );

        expect(adviceAndCounselCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(6);
    }

    @test
    shouldBeAbleToComputeMultipleAdviceAndCounselCasesForMultipleMonths() {
        let clientInteractions = new Set<ClientInteraction>();
        this.createTestClientInteractionsWithTypeOfService(
            this.REPORTING_MONTH,
            4,
            2,
            0,
            this.TYPE_OF_SERVICE_ADVICE_AND_COUNSEL
        ).forEach((clientInteraction) => {
            clientInteractions.add(clientInteraction);
        });

        this.createTestClientInteractionsWithTypeOfService(
            this.NEXT_MONTH,
            4,
            2,
            0,
            this.TYPE_OF_SERVICE_ADVICE_AND_COUNSEL
        ).forEach((clientInteraction) => {
            clientInteractions.add(clientInteraction);
        });

        let adviceAndCounselCalculator = new AdviceAndCounselCalculator(clientInteractions, this.REPORT_START_DATE, this.REPORT_END_DATE);
        expect(adviceAndCounselCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(6);
    }

    @test
    shouldBeAbleToComputeMultipleAdviceAndCounselCasesForMultipleMonthsForMultipleAttorneys() {
        let clientInteractions = new Set<ClientInteraction>();
        this.createTestClientInteractionsWithTypeOfService(
            this.REPORTING_MONTH,
            4,
            2,
            2,
            this.TYPE_OF_SERVICE_ADVICE_AND_COUNSEL
        ).forEach((clientInteraction) => {
            clientInteractions.add(clientInteraction);
        });

        this.createTestClientInteractionsWithTypeOfService(
            this.NEXT_MONTH,
            4,
            2,
            2,
            this.TYPE_OF_SERVICE_ADVICE_AND_COUNSEL
        ).forEach((clientInteraction) => {
            clientInteractions.add(clientInteraction);
        });

        let adviceAndCounselCalculator = new AdviceAndCounselCalculator(clientInteractions, this.REPORT_START_DATE, this.REPORT_END_DATE);
        expect(adviceAndCounselCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(6);
    }

    @test
    shouldConsiderAdviceAndCounselCasesWhereAndIsUsedInsteadOfAnAmpersand() {
        const clientInteractionWithAmpersand = ClientInteractionFactory.createOpenClientInteractionWithOpenDateAndTypeOfService(
            this.REPORTING_MONTH,
            this.ATTORNEY_NAME,
            this.REPORTING_MONTH,
            this.TYPE_OF_SERVICE_ADVICE_AND_COUNSEL
        );
        const clientInteractionWithAnd = new ClientInteraction(
            clientInteractionWithAmpersand.reportingMonth,
            clientInteractionWithAmpersand.openDate,
            clientInteractionWithAmpersand.clientName,
            clientInteractionWithAmpersand.attorneyName,
            clientInteractionWithAmpersand.legalServerNumber,
            clientInteractionWithAmpersand.closedDate,
            clientInteractionWithAmpersand.typeOfService.replace("&", "and"),
            clientInteractionWithAmpersand.courtAppearances,
            clientInteractionWithAmpersand.status
        );

        // Let's be crazy paranoid
        expect(clientInteractionWithAnd.typeOfService).to.be.equal("Advice and Counsel");

        let clientInteractions: Set<ClientInteraction> = new Set<ClientInteraction>();
        clientInteractions.add(clientInteractionWithAnd);

        let adviceAndCounselCalculator = new AdviceAndCounselCalculator(clientInteractions, this.REPORT_START_DATE, this.REPORT_END_DATE);
        expect(adviceAndCounselCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(1);
    }

    @test
    shouldConsiderAdviceAndCounselCasesWhenThatStringIsReversed() {
        const clientInteractionWithAmpersand = ClientInteractionFactory.createOpenClientInteractionWithOpenDateAndTypeOfService(
            this.REPORTING_MONTH,
            this.ATTORNEY_NAME,
            this.REPORTING_MONTH,
            this.TYPE_OF_SERVICE_ADVICE_AND_COUNSEL
        );
        const clientInteractionWithAnd = new ClientInteraction(
            clientInteractionWithAmpersand.reportingMonth,
            clientInteractionWithAmpersand.openDate,
            clientInteractionWithAmpersand.clientName,
            clientInteractionWithAmpersand.attorneyName,
            clientInteractionWithAmpersand.legalServerNumber,
            clientInteractionWithAmpersand.closedDate,
            "Counsel and Advice",
            clientInteractionWithAmpersand.courtAppearances,
            clientInteractionWithAmpersand.status
        );

        // Let's be crazy paranoid
        expect(clientInteractionWithAnd.typeOfService).to.be.equal("Counsel and Advice");

        let clientInteractions: Set<ClientInteraction> = new Set<ClientInteraction>();
        clientInteractions.add(clientInteractionWithAnd);

        let adviceAndCounselCalculator = new AdviceAndCounselCalculator(clientInteractions, this.REPORT_START_DATE, this.REPORT_END_DATE);
        expect(adviceAndCounselCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(1);
    }

    @test
    shouldBeAbleToGetTotalAdviceAndCounselForMultipleMonthsForMultipleAttorneysForOverMultipleYears() {
        const adviceAndCounselPreviousYear = this.createTestClientInteractionsWithTypeOfService(
            this.PREVIOUS_YEAR,
            3,
            1,
            4,
            this.TYPE_OF_SERVICE_ADVICE_AND_COUNSEL
        );
        const adviceAndCounselPreviousReportingMonth = this.createTestClientInteractionsWithTypeOfService(
            this.PREVIOUS_MONTH,
            3,
            1,
            4,
            this.TYPE_OF_SERVICE_ADVICE_AND_COUNSEL
        );
        const adviceAndCounselCurrentReportingMonth = this.createTestClientInteractionsWithTypeOfService(
            this.REPORTING_MONTH,
            4,
            2,
            4,
            this.TYPE_OF_SERVICE_ADVICE_AND_COUNSEL
        );
        const adviceAndCounselNextYear = this.createTestClientInteractionsWithTypeOfService(
            this.NEXT_YEAR,
            5,
            3,
            4,
            this.TYPE_OF_SERVICE_ADVICE_AND_COUNSEL
        );

        let adviceAndCounselCalculator = new AdviceAndCounselCalculator(
            this.combineSets([
                adviceAndCounselPreviousYear,
                adviceAndCounselPreviousReportingMonth,
                adviceAndCounselCurrentReportingMonth,
                adviceAndCounselNextYear
            ]),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );

        expect(adviceAndCounselCalculator.getTotalCount(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(10);
    }

    @test
    shouldNotCountMultipleAdviceAndCounselClientInteractionsForTheSameClient() {
        const adviceAndCounselClientInteraction: ClientInteraction = ClientInteractionFactory.createOpenClientInteractionWithOpenDateAndTypeOfService(
            this.REPORTING_MONTH,
            this.ATTORNEY_NAME,
            this.REPORTING_MONTH,
            this.TYPE_OF_SERVICE_ADVICE_AND_COUNSEL
        );
        const anotherAdviceAndCounselClientInteraction: ClientInteraction = new ClientInteraction(
            adviceAndCounselClientInteraction.reportingMonth,
            adviceAndCounselClientInteraction.openDate,
            adviceAndCounselClientInteraction.clientName,
            adviceAndCounselClientInteraction.attorneyName,
            faker.random.number().toString(),
            adviceAndCounselClientInteraction.closedDate,
            adviceAndCounselClientInteraction.typeOfService,
            adviceAndCounselClientInteraction.courtAppearances,
            adviceAndCounselClientInteraction.status
        );

        let briefServicesCalculator = new AdviceAndCounselCalculator(
            new Set<ClientInteraction>([
                adviceAndCounselClientInteraction,
                anotherAdviceAndCounselClientInteraction
            ]),
            this.REPORT_START_DATE,
            this.REPORT_END_DATE
        );

        expect(briefServicesCalculator.getCountForMonth(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(1);
    }
}