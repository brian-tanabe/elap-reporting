import {CalculatorTestBase} from "./calculator-test-base";

import 'mocha';

import {OpenCasesCalculator} from "../../../src/calculators/open-cases-calculator";

import {suite, test} from "mocha-typescript";
import {ClientInteraction} from "../../../src/containers/client-interaction";

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

        expect(openCasesCalculator.getCount(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(1);
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

        expect(openCasesCalculator.getCount(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(4);
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

        expect(openCasesCalculator.getCount(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(4);
    }

    @test
    shouldBeAbleToComputeMultipleOpenCasesForMultipleMonths() {
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

        let openCasesCalculator = new OpenCasesCalculator(clientInteractions, this.REPORT_START_DATE, this.REPORT_END_DATE);
        expect(openCasesCalculator.getCount(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(4);
    }

    @test
    shouldBeAbleToComputeMultipleOpenCasesForMultipleMonthsForMultipleAttorneys() {
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

        let openCasesCalculator = new OpenCasesCalculator(clientInteractions, this.REPORT_START_DATE, this.REPORT_END_DATE);
        expect(openCasesCalculator.getCount(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(4);
    }

}