import {Calculator} from "./calculator";
import {ClientInteraction} from "../containers/client-interaction";

export class BriefServicesCalculator extends Calculator {

    getCountForMonth(attorney: string, month: Date): number {
        const clientInteractions = this.getEligibleClientInteractionsForMonth(attorney, month);
        return this.getNumberOfBriefServiceClientInteractions(clientInteractions);
    }

    getTotalCount(attorney: string, year: Date): number {
        const clientInteractions = this.getEligibleClientInteractionsForYear(attorney, year);
        return this.getNumberOfBriefServiceClientInteractions(clientInteractions);
    }

    private getNumberOfBriefServiceClientInteractions(clientInteractions: Set<ClientInteraction>): number {
        const briefServices: Set<String> = new Set<String>();
        clientInteractions.forEach((clientInteraction) => {
            if (clientInteraction.typeOfService.toLowerCase() == "brief services") {
                briefServices.add(clientInteraction.clientName);
            }
        });

        return briefServices.size;
    }
}