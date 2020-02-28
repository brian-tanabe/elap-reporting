import {ClientInteraction} from "../containers/client-interaction";

export class ClientInteractionHelper {

    static getAttorneyName(clientInteractions: Set<ClientInteraction>): string {
        const attorneyNames: Set<string> = new Set<string>();
        clientInteractions.forEach(function (clientInteraction) {
            attorneyNames.add(clientInteraction.attorneyName.valueOf());
        });

        if (attorneyNames.size != 1) {
            throw new Error("An unexpected number of attorneys are present!");
        }

        return attorneyNames.values().next().value;
    }
}