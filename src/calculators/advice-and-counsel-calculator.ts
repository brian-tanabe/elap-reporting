import {Calculator} from "./calculator";
import {ClientInteraction} from "../containers/client-interaction";

export class AdviceAndCounselCalculator extends Calculator {

    getCount(attorney: String, month: Date): number {
        const adviceAndCounsel: Set<ClientInteraction> = new Set<ClientInteraction>();

        const clientInteractions = this.getEligibleClientInteractions(attorney, month);
        clientInteractions.forEach((clientInteraction) => {
            if (this.isAdviceAndCounsel(clientInteraction) || this.isCounselAndAdvice(clientInteraction)) {
                adviceAndCounsel.add(clientInteraction);
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