import {Calculator} from "./calculator";
import {ClientInteraction} from "../containers/client-interaction";

export class OpenCasesCalculator extends Calculator {

    getCount(attorney: String, month: Date): number {
        const openCases = new Set<ClientInteraction>();

        const clientInteractions = this.getEligibleClientInteractions(attorney, month);
        clientInteractions.forEach((clientInteraction) => {
            if (clientInteraction.status.toLowerCase() == "open") {
                openCases.add(clientInteraction);
            }
        });

        return openCases.size;
    }

}