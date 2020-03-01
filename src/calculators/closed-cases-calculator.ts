import {Calculator} from "./calculator";
import {ClientInteraction} from "../containers/client-interaction";

export class ClosedCasesCalculator extends Calculator {

    getCountForMonth(attorney: string, month: Date): number {
        const clientInteractions = this.getEligibleClientInteractionsForMonth(attorney, month);
        return this.getNumberOfClosedClientInteractions(clientInteractions);
    }

    getTotalCount(attorney: string, year: Date): number {
        const clientInteractions = this.getEligibleClientInteractionsForYear(attorney, year);
        return this.getNumberOfClosedClientInteractions(clientInteractions);
    }

    private getNumberOfClosedClientInteractions(clientInteractions: Set<ClientInteraction>): number {
        const closedCases: Set<String> = new Set<String>();
        clientInteractions.forEach((clientInteraction) => {
            if (clientInteraction.status.toLowerCase() == "closed") {
                closedCases.add(clientInteraction.clientName);
            }
        });

        return closedCases.size
    }
}