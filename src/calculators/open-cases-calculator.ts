import {Calculator} from "./calculator";
import {ClientInteraction} from "../containers/client-interaction";

export class OpenCasesCalculator extends Calculator {

    getCountForMonth(attorney: string, month: Date): number {
        const clientInteractions = this.getEligibleClientInteractionsForMonth(attorney, month);
        return this.getNumberOfOpenCasesClientInteractions(clientInteractions);
    }

    getTotalCount(attorney: string, year: Date): number {
        // It appears they only count cases open at the end of the year or the current month, whichever
        // is earlier.  Let's find the last month with cases
        const finalMonth: Date = this.findLatestMonthWithCases(attorney, year);

        // Get the cases for the final month we determined earlier
        const clientInteractions: Set<ClientInteraction> = this.getEligibleClientInteractionsForMonth(attorney, finalMonth);

        // Count the number of open cases in this month
        return this.getNumberOfOpenCasesClientInteractions(clientInteractions);
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

    private findLatestMonthWithCases(attorney: string, year: Date) {
        let finalMonth: Date = null;
        for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
            const month: Date = new Date(Date.UTC(year.getUTCFullYear(), monthIndex, 1).valueOf());
            const clientInteractions: Set<ClientInteraction> = this.getEligibleClientInteractionsForMonth(attorney, month);
            if (clientInteractions.size > 0) {
                finalMonth = month;
            }
        }

        return finalMonth;
    }
}