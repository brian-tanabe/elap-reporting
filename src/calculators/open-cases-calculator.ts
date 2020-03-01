import {Calculator} from "./calculator";
import {ClientInteraction} from "../containers/client-interaction";
import {daysUntilCertificateExpires} from "office-addin-dev-certs/lib/defaults";

export class OpenCasesCalculator extends Calculator {

    getCountForMonth(attorney: string, month: Date): number {
        const clientInteractions = this.getEligibleClientInteractionsForMonth(attorney, month);
        return this.getNumberOfOpenCasesClientInteractions(clientInteractions);
    }

    getTotalCount(attorney: string, year: Date): number {
        // It appears they only count cases open at the end of the year in the total.  Let's just
        // find the open cases in December
        const december: Date = new Date(Date.UTC(year.getUTCFullYear(), 11, 1).valueOf());

        const clientInteraction = this.getEligibleClientInteractionsForMonth(attorney, december);
        return this.getNumberOfOpenCasesClientInteractions(clientInteraction);
    }

    private getNumberOfOpenCasesClientInteractions(clientInteractions: Set<ClientInteraction>): number {
        const openCases: Set<String> = new Set<String>();
        clientInteractions.forEach((clientInteraction) => {
            if (clientInteraction.status.toLowerCase() == "open") {
                openCases.add(clientInteraction.clientName);
            }
        });

        return openCases.size;
    }
}