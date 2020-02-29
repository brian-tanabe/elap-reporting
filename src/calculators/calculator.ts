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

    abstract getCountForMonth(attorney: String, month: Date): number;

    protected getEligibleClientInteractions(attorney: String, month: Date): Set<ClientInteraction> {
        const eligibleClientInteractions = new Set<ClientInteraction>();

        this.clientInteractions.forEach((clientInteraction) => {
            if (this.isSameMonth(clientInteraction.reportingMonth, month) && this.isSameAttorney(clientInteraction.attorneyName, attorney)) {
                eligibleClientInteractions.add(clientInteraction);
            }
        });

        return eligibleClientInteractions;
    }

    protected isSameMonth(lhs: Date, rhs: Date): boolean {
        return lhs.getMonth() == rhs.getMonth() && lhs.getFullYear() == rhs.getFullYear();
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