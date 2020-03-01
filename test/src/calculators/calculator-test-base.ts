const faker = require('faker');

import {ClientInteraction} from "../../../src/containers/client-interaction";
import {ClientInteractionFactory} from "../factories/client-interaction-factory";

export class CalculatorTestBase {

    // Report dates
    protected readonly REPORT_START_DATE: Date = new Date(Date.UTC(2019, 0, 1).valueOf());
    protected readonly REPORT_END_DATE: Date = new Date(Date.UTC(2019, 11, 31).valueOf());

    // Dates
    protected readonly PREVIOUS_YEAR: Date = new Date(Date.UTC(2018, 2, 1).valueOf());
    protected readonly PREVIOUS_MONTH: Date = new Date(Date.UTC(2019, 1, 1).valueOf());
    protected readonly REPORTING_MONTH: Date = new Date(Date.UTC(2019, 2, 1).valueOf());
    protected readonly NEXT_MONTH: Date = new Date(Date.UTC(2019, 3, 1).valueOf());
    protected readonly NEXT_YEAR: Date = new Date(Date.UTC(2020, 2, 1).valueOf());

    // Attorney names
    protected readonly ATTORNEY_NAME: string = "Ailise Delaney";

    // Types of service
    protected readonly TYPE_OF_SERVICE_LIMITED_REPRESENTATION: string = "Limited Representation";
    protected readonly TYPE_OF_SERVICE_EXTENDED_SERVICES: string = "Extended Services";
    protected readonly TYPE_OF_SERVICE_ADVICE_AND_COUNSEL: string = "Advice & Counsel";
    protected readonly TYPE_OF_SERVICE_BRIEF_SERVICES: string = "Brief Services";

    // Status
    protected readonly STATUS_OPEN: string = "Open";
    protected readonly STATUS_CLOSED: string = "Closed";

    protected createTestClientInteractions(reportingMonth: Date, openCaseCount: number, closedCaseCount: number, openCasesForAnotherAttorney: number): Set<ClientInteraction> {
        const testClientInteractions: Set<ClientInteraction> = new Set<ClientInteraction>();

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

    protected createTestClientInteractionsWithTypeOfService(reportingMonth: Date, openCaseCount: number, closedCaseCount: number, openCasesForAnotherAttorney: number, typeOfService: string): Set<ClientInteraction> {
        const testClientInteractions: Set<ClientInteraction> = new Set<ClientInteraction>();

        // Open cases:
        for (let index = 0; index < openCaseCount; index++) {
            testClientInteractions.add(ClientInteractionFactory.createOpenClientInteractionWithOpenDateAndTypeOfService(reportingMonth, this.ATTORNEY_NAME, faker.date.recent(), typeOfService));
        }

        // Closed cases:
        for (let index = 0; index < closedCaseCount; index++) {
            testClientInteractions.add(ClientInteractionFactory.createClosedClientInteractionWithOpenDateAndTypeOfService(reportingMonth, this.ATTORNEY_NAME, faker.date.recent(), typeOfService));
        }

        // Open cases for another attorney:
        for (let index = 0; index < openCasesForAnotherAttorney; index++) {
            testClientInteractions.add(ClientInteractionFactory.createOpenClientInteractionWithOpenDateAndTypeOfService(reportingMonth, faker.name.firstName(), faker.date.recent(), typeOfService));
        }

        return testClientInteractions;
    }

    protected createTestClientInteractionsWithOpenDate(reportingMonth: Date, openCaseCount: number, closedCaseCount: number, openCasesForAnotherAttorney: number, openDate: Date): Set<ClientInteraction> {
        const testClientInteractions: Set<ClientInteraction> = new Set<ClientInteraction>();

        // Open cases:
        for (let index = 0; index < openCaseCount; index++) {
            testClientInteractions.add(ClientInteractionFactory.createOpenClientInteractionWithOpenDate(reportingMonth, this.ATTORNEY_NAME, openDate));
        }

        // Closed cases:
        for (let index = 0; index < closedCaseCount; index++) {
            testClientInteractions.add(ClientInteractionFactory.createClosedClientInteractionWithOpenDate(reportingMonth, this.ATTORNEY_NAME, openDate));
        }

        // Open cases for another attorney:
        for (let index = 0; index < openCasesForAnotherAttorney; index++) {
            testClientInteractions.add(ClientInteractionFactory.createOpenClientInteractionWithOpenDate(reportingMonth, faker.name.firstName(), openDate));
        }

        return testClientInteractions;
    }

    protected combineSets(setsToCombine: Array<Set<ClientInteraction>>): Set<ClientInteraction> {
        const result: Set<ClientInteraction> = new Set();

        setsToCombine.forEach(function (set) {
            set.forEach(function (item) {
                result.add(item);
            });
        });

        return result;
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