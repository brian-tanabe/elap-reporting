import {Calculator} from "./calculator";
import {ClientInteraction} from "../containers/client-interaction";

export class LimitedRepresentationCalculator extends Calculator {

    getCount(attorney: String, month: Date): number {
        const limitedRepresentation: Set<ClientInteraction> = new Set<ClientInteraction>();

        const clientInteractions = this.getEligibleClientInteractions(attorney, month);
        clientInteractions.forEach((clientInteraction) => {
            if (clientInteraction.typeOfService.toLowerCase() == "limited representation") {
                limitedRepresentation.add(clientInteraction);
            }
        });

        return limitedRepresentation.size;
    }

}

