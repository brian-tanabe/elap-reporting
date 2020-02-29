import {CalculatorTestBase} from "./calculator-test-base";

import 'mocha';

import {ClosedCasesCalculator} from "../../../src/calculators/closed-cases-calculator";

import {suite, test} from "mocha-typescript";
import {ClientInteraction} from "../../../src/containers/client-interaction";

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

        expect(closedCasesCalculator.getCount(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(1);
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

        expect(closedCasesCalculator.getCount(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(4);
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

        expect(closedCasesCalculator.getCount(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(2);
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
        expect(closedCasesCalculator.getCount(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(2);
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
        expect(closedCasesCalculator.getCount(this.ATTORNEY_NAME, this.REPORTING_MONTH)).to.equal(2);
    }

}