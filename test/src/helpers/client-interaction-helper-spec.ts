import 'mocha';

import {ClientInteraction} from '../../../src/containers/client-interaction';
import {suite, test} from "mocha-typescript";
import {ClientInteractionFactory} from "../factories/client-interaction-factory";
import {ClientInteractionHelper} from "../../../src/helpers/client-interaction-helper";

const assert = require('assert');
const expect = require('chai').expect;

const ATTORNEY_NAME: string = "Ailise Delaney";
const CLIENT_NAME: string = "Brian Tanabe";
const SIMPLE_LEGAL_SERVER_NUMBER: string = "20-0055166";
const COMPLEX_LEGAL_SERVER_NUMBER: string = "20-0055178 / 20-0055179";
const TYPE_OF_SERVICE_LIMITED_REPRESENTATION: string = "Limited Representation";
const TYPE_OF_SERVICE_EXTENDED_SERVICES: string = "Extended Services";
const STATUS_OPEN: string = "Open";
const STATUS_CLOSED: string = "Closed";
const CLOSED_DATE_NULL: Date = null;

const REPORTING_MONTH_AS_DATE: Date = new Date(Date.UTC(2019, 1, 1).valueOf());

@suite
class ClientInteractionHelperSpec {

    @test
    shouldBeAbleToDetermineAttorneyNameWhenOnlyOneAttorneysClientInteractionsArePresent() {
        const clientInteractionSet: Set<ClientInteraction> = new Set<ClientInteraction>();
        clientInteractionSet.add(ClientInteractionFactory.createOpenClientInteraction(REPORTING_MONTH_AS_DATE, ATTORNEY_NAME));
        clientInteractionSet.add(ClientInteractionFactory.createOpenClientInteraction(REPORTING_MONTH_AS_DATE, ATTORNEY_NAME));
        clientInteractionSet.add(ClientInteractionFactory.createOpenClientInteraction(REPORTING_MONTH_AS_DATE, ATTORNEY_NAME));

        // Verify that the correct name is returned:
        expect(ClientInteractionHelper.getAttorneyName(clientInteractionSet)).to.be.equal(ATTORNEY_NAME);
    }

    @test
    shouldThrowAnErrorIfMoreThanOneAttorneysClientInteractionsArePresent() {
        const clientInteractionSet: Set<ClientInteraction> = new Set<ClientInteraction>();
        clientInteractionSet.add(ClientInteractionFactory.createOpenClientInteraction(REPORTING_MONTH_AS_DATE, ATTORNEY_NAME));
        clientInteractionSet.add(ClientInteractionFactory.createOpenClientInteraction(REPORTING_MONTH_AS_DATE, ATTORNEY_NAME + ATTORNEY_NAME));

        // Verify that an error is returned
        expect(() => {
            ClientInteractionHelper.getAttorneyName(clientInteractionSet)
        }).to.throw("An unexpected number of attorneys are present!");
    }

}