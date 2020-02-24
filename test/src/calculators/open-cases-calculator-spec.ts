var faker = require('faker');

import 'mocha';

import {OpenCasesCalculator} from "../../../src/calculators/open-cases-calculator";

import {suite, test} from "mocha-typescript";
import {ClientInteraction} from "../../../src/containers/client-interaction";
import {ClientInteractionFactory} from "../factories/client-interaction-factory";

const expect = require('chai').expect;

const REPORT_START_DATE = new Date(Date.UTC(2019, 0, 0).valueOf());
const REPORT_END_DATE = new Date(Date.UTC(2019, 11, 31).valueOf());

const ATTORNEY_NAME: String = "Ailise Delaney";

const REPORTING_MONTH = new Date(Date.UTC(2019, 2, 0).valueOf());
const NEXT_MONTH = new Date(Date.UTC(2019, 3, 0).valueOf());

@suite
class OpenCasesCalculatorSpec {

    @test
    shouldBeAbleToComputeOpenCasesForASingleMonth() {
        let openCasesCalculator = new OpenCasesCalculator(this.createTestClientInteractions(REPORTING_MONTH, 1, 0, 0), REPORT_START_DATE, REPORT_END_DATE);
        expect(openCasesCalculator.getCount(ATTORNEY_NAME, REPORTING_MONTH)).to.equal(1);
    }

    @test
    shouldBeAbleToComputeMultipleOpenCasesForASingleMonth() {
        let openCasesCalculator = new OpenCasesCalculator(this.createTestClientInteractions(REPORTING_MONTH, 4, 0, 0), REPORT_START_DATE, REPORT_END_DATE);
        expect(openCasesCalculator.getCount(ATTORNEY_NAME, REPORTING_MONTH)).to.equal(4);
    }

    @test
    shouldBeAbleToComputeMultipleOpenCasesForASingleMonthWhereCasesAreClosed() {
        let openCasesCalculator = new OpenCasesCalculator(this.createTestClientInteractions(REPORTING_MONTH, 4, 2, 0), REPORT_START_DATE, REPORT_END_DATE);
        expect(openCasesCalculator.getCount(ATTORNEY_NAME, REPORTING_MONTH)).to.equal(4);
    }

    @test
    shouldBeAbleToComputeMultipleOpenCasesForMultipleMonths() {
        let clientInteractions = new Set<ClientInteraction>();
        this.createTestClientInteractions(REPORTING_MONTH, 4, 2, 0).forEach((clientInteraction) => {
            clientInteractions.add(clientInteraction);
        });
        this.createTestClientInteractions(NEXT_MONTH, 4, 2, 0).forEach((clientInteraction) => {
            clientInteractions.add(clientInteraction);
        });

        let openCasesCalculator = new OpenCasesCalculator(clientInteractions, REPORT_START_DATE, REPORT_END_DATE);
        expect(openCasesCalculator.getCount(ATTORNEY_NAME, REPORTING_MONTH)).to.equal(4);
    }

    @test
    shouldBeAbleToComputeMultipleOpenCasesForMultipleMonthsForMultipleAttorneys() {
        let clientInteractions = new Set<ClientInteraction>();
        this.createTestClientInteractions(REPORTING_MONTH, 4, 2, 2).forEach((clientInteraction) => {
            clientInteractions.add(clientInteraction);
        });
        this.createTestClientInteractions(NEXT_MONTH, 4, 2, 2).forEach((clientInteraction) => {
            clientInteractions.add(clientInteraction);
        });

        let openCasesCalculator = new OpenCasesCalculator(clientInteractions, REPORT_START_DATE, REPORT_END_DATE);
        expect(openCasesCalculator.getCount(ATTORNEY_NAME, REPORTING_MONTH)).to.equal(4);
    }

    private createTestClientInteractions(month: Date, openCaseCount: Number, closedCaseCount: Number, openCasesForAnotherAttorney: Number): Set<ClientInteraction> {
        const testClientInteractions = new Set<ClientInteraction>();

        // Open cases:
        for (let index = 0; index < openCaseCount; index++) {
            testClientInteractions.add(ClientInteractionFactory.createOpenClientInteraction(month, ATTORNEY_NAME));
        }

        // Closed cases:
        for (let index = 0; index < closedCaseCount; index++) {
            testClientInteractions.add(ClientInteractionFactory.createClosedClientInteraction(month, ATTORNEY_NAME));
        }

        // Open cases for another attorney:
        for (let index = 0; index < openCasesForAnotherAttorney; index++) {
            testClientInteractions.add(ClientInteractionFactory.createOpenClientInteraction(month, faker.name.firstName()));
        }

        return testClientInteractions;
    }
}