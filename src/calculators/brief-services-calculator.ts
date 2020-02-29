import {Calculator} from "./calculator";
import {ClientInteraction} from "../containers/client-interaction";

export class BriefServicesCalculator extends Calculator {

    getCount(attorney: String, month: Date): number {
        const briefServices: Set<ClientInteraction> = new Set<ClientInteraction>();

        const clientInteractions = this.getEligibleClientInteractions(attorney, month);
        clientInteractions.forEach((clientInteraction) => {
            if (clientInteraction.typeOfService.toLowerCase() == "brief services") {
                briefServices.add(clientInteraction);
            }
        });

        return briefServices.size;
    }

}