import {Calculator} from "./calculator";
import {ClientInteraction} from "../containers/client-interaction";

export class AdviceAndCounselCalculator extends Calculator {

    getCountForMonth(attorney: string, month: Date): number {
        const clientInteractions = this.getEligibleClientInteractionsForMonth(attorney, month);
        return this.getNumberOfAdviceAndCounselClientInteractions(clientInteractions);
    }

    getTotalCount(attorney: string, year: Date): number {
        const clientInteractions = this.getEligibleClientInteractionsForYear(attorney, year);
        return this.getNumberOfAdviceAndCounselClientInteractions(clientInteractions);
    }

    /**
     * Returns a Set of ClientInteractions whose type of representation is "Counsel and Advice" or a few variants
     * @param clientInteractions
     */
    private getNumberOfAdviceAndCounselClientInteractions(clientInteractions: Set<ClientInteraction>): number {
        const adviceAndCounsel: Set<String> = new Set<String>();
        clientInteractions.forEach((clientInteraction) => {
            if (this.isAdviceAndCounsel(clientInteraction) || this.isCounselAndAdvice(clientInteraction)) {
                adviceAndCounsel.add(clientInteraction.clientName);
            }
        });

        return adviceAndCounsel.size;
    }

    /**
     * Returns TRUE if advice & counsel or advice and counsel in any case
     * @param clientInteraction
     */
    private isAdviceAndCounsel(clientInteraction: ClientInteraction): boolean {
        return (clientInteraction.typeOfService.toLowerCase().trim() == "advice & counsel" || clientInteraction.typeOfService.toLowerCase().trim() == "advice and counsel");
    }

    /**
     * * Returns TRUE if counsel & advice or counsel and advice in any case
     * @param clientInteraction
     */
    private isCounselAndAdvice(clientInteraction: ClientInteraction): boolean {
        return (clientInteraction.typeOfService.toLowerCase().trim() == "counsel & advice" || clientInteraction.typeOfService.toLowerCase().trim() == "counsel and advice");
    }

}