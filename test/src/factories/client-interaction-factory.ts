var faker = require('faker');

import {ClientInteraction} from "../../../src/containers/client-interaction";

const ATTORNEY_NAME: string = "Ailise Delaney";
const CLIENT_NAME: string = "Brian Tanabe";
const SIMPLE_LEGAL_SERVER_NUMBER: string = "20-0055166";
const COMPLEX_LEGAL_SERVER_NUMBER: string = "20-0055178 / 20-0055179";
const TYPE_OF_SERVICE_LIMITED_REPRESENTATION: string = "Limited Representation";
const TYPE_OF_SERVICE_EXTENDED_SERVICES: string = "Extended Services";
const TYPE_OF_SERVICE_ADVICE_AND_COUNSEL: string = "Advice & Counsel";
const STATUS_OPEN: string = "Open";
const STATUS_CLOSED: string = "Closed";
const CLOSED_DATE_NULL: Date = null;

export class ClientInteractionFactory {

    static createOpenClientInteraction(reportingMonth: Date, attorney: string): ClientInteraction {
        return ClientInteractionFactory.createClientInteraction(reportingMonth, attorney, STATUS_OPEN, faker.date.recent(), TYPE_OF_SERVICE_EXTENDED_SERVICES);
    }

    static createOpenClientInteractionWithOpenDate(reportingMonth: Date, attorney: string, openDate: Date): ClientInteraction {
        return this.createClientInteraction(reportingMonth, attorney, STATUS_OPEN, openDate, TYPE_OF_SERVICE_EXTENDED_SERVICES);
    }

    static createOpenClientInteractionWithOpenDateAndTypeOfService(reportingMonth: Date, attorney: string, openDate: Date, typeOfService: string): ClientInteraction {
        return this.createClientInteraction(reportingMonth, attorney, STATUS_OPEN, openDate, typeOfService);
    }

    static createClosedClientInteraction(reportingMonth: Date, attorney: string): ClientInteraction {
        return ClientInteractionFactory.createClientInteraction(reportingMonth, attorney, STATUS_CLOSED, faker.date.recent(), TYPE_OF_SERVICE_EXTENDED_SERVICES);
    }

    static createClosedClientInteractionWithOpenDate(reportingMonth: Date, attorney: string, openDate: Date): ClientInteraction {
        return this.createClientInteraction(reportingMonth, attorney, STATUS_CLOSED, openDate, TYPE_OF_SERVICE_EXTENDED_SERVICES);
    }

    static createClosedClientInteractionWithOpenDateAndTypeOfService(reportingMonth: Date, attorney: string, openDate: Date, typeOfService: string): ClientInteraction {
        return this.createClientInteraction(reportingMonth, attorney, STATUS_CLOSED, openDate, typeOfService);
    }

    private static createClientInteraction(reportingMonth: Date, attorney: string, status: string, openDate: Date, typeOfService: string): ClientInteraction {
        let clientInteraction = new ClientInteraction(
            reportingMonth,
            openDate,
            faker.name.firstName() + " " + faker.name.lastName(),
            attorney,
            faker.random.number().toString(), null,
            typeOfService,
            faker.random.number(),
            status
        );

        return clientInteraction;
    }
}