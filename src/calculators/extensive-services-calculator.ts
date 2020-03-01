import {Calculator} from "./calculator";
import {ClientInteraction} from "../containers/client-interaction";

export class ExtensiveServicesCalculator extends Calculator {

    getCountForMonth(attorney: string, month: Date): number {
        const clientInteractions = this.getEligibleClientInteractionsForMonth(attorney, month);
        return this.getNumberExtensiveServicesClientInteractions(clientInteractions);
    }

    getTotalCount(attorney: string, year: Date): number {
        const clientInteractions: Set<ClientInteraction> = this.getEligibleClientInteractionsForYear(attorney, year);
        return this.getNumberExtensiveServicesClientInteractions(clientInteractions);
    }

    private getNumberExtensiveServicesClientInteractions(clientInteractions: Set<ClientInteraction>): number {
        const extensiveServices: Set<String> = new Set<String>();
        clientInteractions.forEach((clientInteraction) => {
            if (this.isExtensiveServices(clientInteraction) || this.isExtensiveRepresentation(clientInteraction)) {
                extensiveServices.add(clientInteraction.clientName);
            }
        });

        return extensiveServices.size;
    }

    private isExtensiveServices(clientInteraction: ClientInteraction): boolean {
        return (clientInteraction.typeOfService.toLowerCase() == "extensive services" || clientInteraction.typeOfService.toLowerCase() == "extended services");
    }

    private isExtensiveRepresentation(clientInteraction: ClientInteraction): boolean {
        return (clientInteraction.typeOfService.toLowerCase() == "extensive representation" || clientInteraction.typeOfService.toLowerCase() == "extended representation");
    }
}