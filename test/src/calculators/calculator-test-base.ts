const faker = require('faker');

import {ClientInteraction} from "../../../src/containers/client-interaction";
import {ClientInteractionFactory} from "../factories/client-interaction-factory";

export class CalculatorTestBase {

    protected readonly REPORT_START_DATE: Date = new Date(Date.UTC(2019, 0, 1).valueOf());
    protected readonly REPORT_END_DATE: Date = new Date(Date.UTC(2019, 11, 31).valueOf());

    protected readonly PREVIOUS_MONTH: Date = new Date(Date.UTC(2019, 1, 1).valueOf());
    protected readonly REPORTING_MONTH: Date = new Date(Date.UTC(2019, 2, 1).valueOf());
    protected readonly NEXT_MONTH: Date = new Date(Date.UTC(2019, 3, 1).valueOf());

    protected readonly ATTORNEY_NAME: string = "Ailise Delaney";

    protected readonly STATUS_OPEN: string = "Open";
    protected readonly STATUS_CLOSED: string = "Closed";

    protected createTestClientInteractions(reportingMonth: Date, openCaseCount: number, closedCaseCount: number, openCasesForAnotherAttorney: number): Set<ClientInteraction> {
        const testClientInteractions = new Set<ClientInteraction>();

        // Open cases:
        for (let index = 0; index < openCaseCount; index++) {
            testClientInteractions.add(ClientInteractionFactory.createOpenClientInteraction(reportingMonth, this.ATTORNEY_NAME));
        }

        // Closed cases:
        for (let index = 0; index < closedCaseCount; index++) {
            testClientInteractions.add(ClientInteractionFactory.createClosedClientInteraction(reportingMonth, this.ATTORNEY_NAME));
        }

        // Open cases for another attorney:
        for (let index = 0; index < openCasesForAnotherAttorney; index++) {
            testClientInteractions.add(ClientInteractionFactory.createOpenClientInteraction(reportingMonth, faker.name.firstName()));
        }

        return testClientInteractions;
    }

    protected createTestClientInteractionsWithOpenDate(reportingMonth: Date, openCaseCount: number, closedCaseCount: number, openCasesForAnotherAttorney: number, openDate: Date): Set<ClientInteraction> {
        const testClientInteractions = new Set<ClientInteraction>();

        // Open cases:
        for (let index = 0; index < openCaseCount; index++) {
            testClientInteractions.add(ClientInteractionFactory.createClientInteraction(reportingMonth, this.ATTORNEY_NAME, this.STATUS_OPEN, openDate));
        }

        // Closed cases:
        for (let index = 0; index < closedCaseCount; index++) {
            testClientInteractions.add(ClientInteractionFactory.createClientInteraction(reportingMonth, this.ATTORNEY_NAME, this.STATUS_CLOSED, openDate));
        }

        // Open cases for another attorney:
        for (let index = 0; index < openCasesForAnotherAttorney; index++) {
            testClientInteractions.add(ClientInteractionFactory.createClientInteraction(reportingMonth, faker.name.firstName(), this.STATUS_OPEN, openDate));
        }

        return testClientInteractions;
    }

    protected combineTwoSets(lhs: Set<ClientInteraction>, rhs: Set<ClientInteraction>): Set<ClientInteraction> {
        const result: Set<ClientInteraction> = new Set();

        lhs.forEach(function (item) {
            result.add(item);
        });

        rhs.forEach(function (item) {
            result.add(item);
        });

        return result;
    }

}