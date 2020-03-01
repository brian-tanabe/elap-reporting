import {Calculator} from "./calculator";
import {ClientInteraction} from "../containers/client-interaction";

export class LimitedRepresentationCalculator extends Calculator {

    getCountForMonth(attorney: string, month: Date): number {
        const clientInteractions = this.getEligibleClientInteractionsForMonth(attorney, month);
        return this.getNumberOfLimitedRepresentationClientInteractions(clientInteractions);
    }

    getTotalCount(attorney: string, year: Date): number {
        const clientInteractions: Set<ClientInteraction> = this.getEligibleClientInteractionsForYear(attorney, year);
        return this.getNumberOfLimitedRepresentationClientInteractions(clientInteractions);
    }

    private getNumberOfLimitedRepresentationClientInteractions(clientInteractions: Set<ClientInteraction>): number {
        const limitedRepresentation: Set<String> = new Set<String>();
        clientInteractions.forEach((clientInteraction) => {
            if (clientInteraction.typeOfService.toLowerCase() == "limited representation") {
                limitedRepresentation.add(clientInteraction.clientName);
            }
        });

        return limitedRepresentation.size;
    }
}

