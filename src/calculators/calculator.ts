import {ClientInteraction} from "../containers/client-interaction";

export abstract class Calculator {
    private readonly clientInteractions: Set<ClientInteraction>;
    private readonly _reportStartDate: Date;
    private readonly _reportEndDate: Date;

    constructor(clientInteractions: Set<ClientInteraction>, reportStartDate: Date, reportEndDate: Date) {
        this.clientInteractions = clientInteractions;
        this._reportStartDate = reportStartDate;
        this._reportEndDate = reportEndDate;
    }

    abstract getCountForMonth(attorney: string, month: Date): number;

    abstract getTotalCount(attorney: string, year: Date): number;

    protected getEligibleClientInteractionsForMonth(attorney: string, month: Date): Set<ClientInteraction> {
        const eligibleClientInteractions = new Set<ClientInteraction>();

        this.clientInteractions.forEach((clientInteraction) => {
            if (this.isSameMonth(clientInteraction.reportingMonth, month) && this.isSameAttorney(clientInteraction.attorneyName, attorney)) {
                eligibleClientInteractions.add(clientInteraction);
            }
        });

        return eligibleClientInteractions;
    }

    protected getEligibleClientInteractionsForYear(attorney: string, year: Date): Set<ClientInteraction> {
        const eligibleClientInteractions = new Set<ClientInteraction>();

        this.clientInteractions.forEach((clientInteraction) => {
            if (this.isSameYear(clientInteraction.reportingMonth, year) && this.isSameAttorney(clientInteraction.attorneyName, attorney)) {
                eligibleClientInteractions.add(clientInteraction);
            }
        });

        return eligibleClientInteractions;
    }

    protected isSameMonth(lhs: Date, rhs: Date): boolean {
        return lhs.getMonth() == rhs.getMonth() && this.isSameYear(lhs, rhs);
    }

    private isSameYear(lhs: Date, rhs: Date): boolean {
        return lhs.getFullYear() == rhs.getFullYear();
    }

    private isSameAttorney(lhs: String, rhs: String) {
        return lhs == rhs;
    }


    get reportStartDate(): Date {
        return this._reportStartDate;
    }

    get reportEndDate(): Date {
        return this._reportEndDate;
    }
}