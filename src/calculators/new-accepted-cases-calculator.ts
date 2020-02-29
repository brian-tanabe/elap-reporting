import {Calculator} from "./calculator";
import {ClientInteraction} from "../containers/client-interaction";

export class NewAcceptedCasesCalculator extends Calculator {

    getCount(attorney: String, month: Date): number {
        const newCases: Set<ClientInteraction> = new Set<ClientInteraction>();

        const clientInteractions = this.getEligibleClientInteractions(attorney, month);
        clientInteractions.forEach((clientInteraction) => {
            if (this.isSameMonth(clientInteraction.openDate, month)) {
                newCases.add(clientInteraction);
            }
        });

        return newCases.size;
    }

}