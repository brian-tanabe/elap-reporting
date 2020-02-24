var faker = require('faker');

import {ClientInteraction} from "../../../src/containers/client-interaction";

const ATTORNEY_NAME: String = "Ailise Delaney";
const CLIENT_NAME: String = "Brian Tanabe";
const SIMPLE_LEGAL_SERVER_NUMBER: String = "20-0055166";
const COMPLEX_LEGAL_SERVER_NUMBER: String = "20-0055178 / 20-0055179";
const TYPE_OF_SERVICE_LIMITED_REPRESENTATION: String = "Limited Representation";
const TYPE_OF_SERVICE_EXTENDED_SERVICES: String = "Extended Services";
const STATUS_OPEN: String = "Open";
const STATUS_CLOSED: String = "Closed";
const CLOSED_DATE_NULL: Date = null;

export class ClientInteractionFactory {

    static createOpenClientInteraction(reportingMonth: Date, attorney: String): ClientInteraction {
        return ClientInteractionFactory.createClientInteraction(reportingMonth, attorney, STATUS_OPEN);
    }

    static createClosedClientInteraction(reportingMonth: Date, attorney: String): ClientInteraction {
        return ClientInteractionFactory.createClientInteraction(reportingMonth, attorney, STATUS_CLOSED);
    }

    static createClientInteraction(reportingMonth: Date, attorney: String, status: String): ClientInteraction {
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