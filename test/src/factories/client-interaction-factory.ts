var faker = require('faker');

import {ClientInteraction} from "../../../src/containers/client-interaction";

const ATTORNEY_NAME: string = "Ailise Delaney";
const CLIENT_NAME: string = "Brian Tanabe";
const SIMPLE_LEGAL_SERVER_NUMBER: string = "20-0055166";
const COMPLEX_LEGAL_SERVER_NUMBER: string = "20-0055178 / 20-0055179";
const TYPE_OF_SERVICE_LIMITED_REPRESENTATION: string = "Limited Representation";
const TYPE_OF_SERVICE_EXTENDED_SERVICES: string = "Extended Services";
const STATUS_OPEN: string = "Open";
const STATUS_CLOSED: string = "Closed";
const CLOSED_DATE_NULL: Date = null;

export class ClientInteractionFactory {

    static createOpenClientInteraction(reportingMonth: Date, attorney: string): ClientInteraction {
        return ClientInteractionFactory.createClientInteraction(reportingMonth, attorney, STATUS_OPEN);
    }

    static createClosedClientInteraction(reportingMonth: Date, attorney: string): ClientInteraction {
        return ClientInteractionFactory.createClientInteraction(reportingMonth, attorney, STATUS_CLOSED);
    }

    static createClientInteraction(reportingMonth: Date, attorney: string, status: string): ClientInteraction {
        let clientInteraction = new ClientInteraction(
            reportingMonth,
            faker.date.recent(),
            faker.name.firstName() + " " + faker.name.lastName(),
            attorney,
            faker.random.number().toString(), null,
            TYPE_OF_SERVICE_EXTENDED_SERVICES,
            faker.random.number(),
            status
        );

        return clientInteraction;
    }
}