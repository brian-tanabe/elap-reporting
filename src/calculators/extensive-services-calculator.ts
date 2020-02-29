import {Calculator} from "./calculator";
import {ClientInteraction} from "../containers/client-interaction";

export class ExtensiveServicesCalculator extends Calculator {

    getCountForMonth(attorney: String, month: Date): number {
        const extensiveServices: Set<ClientInteraction> = new Set<ClientInteraction>();

        const clientInteractions = this.getEligibleClientInteractions(attorney, month);
        clientInteractions.forEach((clientInteraction) => {
            if (this.isExtensiveServices(clientInteraction) || this.isExtensiveRepresentation(clientInteraction)) {
                extensiveServices.add(clientInteraction);
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