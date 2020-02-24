import {ClientInteraction} from "../containers/client-interaction";

export abstract class Calculator {
    private readonly clientInteractions: Set<ClientInteraction>;
    private readonly reportStartDate: Date;
    private readonly reportEndDate: Date;

    constructor(clientInteractions: Set<ClientInteraction>, reportStartDate: Date, reportEndDate: Date) {
        this.clientInteractions = clientInteractions;
        this.reportStartDate = reportStartDate;
        this.reportEndDate = reportEndDate;
    }

    abstract getCount(attorney: String, month: Date): Number;

    protected getEligibleClientInteractions(attorney: String, month: Date): Set<ClientInteraction> {
        const eligibleClientInteractions = new Set<ClientInteraction>();

        this.clientInteractions.forEach((clientInteraction) => {
            if (this.isSameMonth(clientInteraction.reportingMonth, month) && this.isSameAttorney(clientInteraction.attorneyName, attorney)) {
                eligibleClientInteractions.add(clientInteraction);
            }
        });

        return eligibleClientInteractions;
    }

    private isSameMonth(lhs: Date, rhs: Date): boolean {
        return lhs.getMonth() == rhs.getMonth() && lhs.getFullYear() == rhs.getFullYear();
    }

    private isSameAttorney(lhs: String, rhs: String) {
        return lhs == rhs;
    }
}