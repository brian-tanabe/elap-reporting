import {Calculator} from "./calculator";
import {ClientInteraction} from "../containers/client-interaction";

export class ClosedCasesCalculator extends Calculator {

    getCount(attorney: String, month: Date): number {
        const closedCases: Set<ClientInteraction> = new Set<ClientInteraction>();

        const clientInteractions = this.getEligibleClientInteractions(attorney, month);
        clientInteractions.forEach((clientInteraction) => {
            if (clientInteraction.status.toLowerCase() == "closed") {
                closedCases.add(clientInteraction);
            }
        });

        return closedCases.size;
    }

}