import {Calculator} from "./calculator";
import {ClientInteraction} from "../containers/client-interaction";

export class NewAcceptedCasesCalculator extends Calculator {

    getCountForMonth(attorney: string, month: Date): number {
        const clientInteractions = this.getEligibleClientInteractionsForMonth(attorney, month);
        return this.getNumberOfNewAcceptedClientInteractions(clientInteractions);
    }

    getTotalCount(attorney: string, year: Date): number {
        const clientInteractions = this.getEligibleClientInteractionsForYear(attorney, year);
        return this.getNumberOfNewAcceptedClientInteractions(clientInteractions);
    }

    private getNumberOfNewAcceptedClientInteractions(clientInteractions: Set<ClientInteraction>): number {
        const newCases: Set<String> = new Set<String>();
        clientInteractions.forEach((clientInteraction) => {
            if (this.isSameMonth(clientInteraction.openDate, clientInteraction.reportingMonth)) {
                newCases.add(clientInteraction.clientName);
            }
        });

        return newCases.size
    }
}