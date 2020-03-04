/**
 *
 */
export class ClientInteraction {
    private readonly _reportingMonth: Date;
    private readonly _openDate: Date;
    private readonly _clientName: string;
    private readonly _attorneyName: string;
    private readonly _legalServerNumber: string;
    private readonly _closedDate?: Date;
    private readonly _typeOfService: string;
    private readonly _courtAppearances: number;
    private readonly _status: string;

    constructor(
        reportingMonth: Date,
        openDate: Date,
        clientName: string,
        attorneyName: string,
        legalServerNumber: string,
        closedDate: Date,
        typeOfService: string,
        courtAppearances: number,
        status: string
    ) {
        this.validateClientInteraction(reportingMonth, attorneyName, clientName, openDate, courtAppearances);

        this._reportingMonth = reportingMonth;
        this._openDate = openDate;
        this._clientName = clientName.trim();
        this._attorneyName = attorneyName.trim();
        this._legalServerNumber = legalServerNumber.trim();
        this._closedDate = closedDate;
        this._typeOfService = typeOfService.trim();
        this._courtAppearances = courtAppearances;
        this._status = status.toLowerCase().trim();
    }

    private validateClientInteraction(reportingMonth: Date, attorneyName: String, clientName: String, openDate: Date, courtAppearances: Number) {
        if (!reportingMonth) {
            throw new Error("A ClientInteraction cannot have a null reporting month!");
        }

        if (!attorneyName) {
            throw new Error("A ClientInteraction cannot have a null attorney name!");
        }

        if (!clientName) {
            throw new Error("A ClientInteraction cannot have a null client name!");
        }

        if (!openDate) {
            throw new Error("A ClientInteraction cannot have a null open date!");
        }

        if (Number.isNaN(courtAppearances.valueOf())) {
            throw new Error("A ClientInteraction cannot have a null court appearances!");
        }
    }

    toString(): String {
        return `ClientInteraction: reportingMonth=[${this.reportingMonth}], attorney=[${this.attorneyName}], name=[${this.clientName}], status=[${this.status}], openDate=[${this.openDate}], closedDate=[${this.closedDate}], typeOfService=[${this.typeOfService}], courtAppearances=[${this.courtAppearances}], legalServerNumber=[${this.legalServerNumber}]`;
    }


    get reportingMonth(): Date {
        return this._reportingMonth;
    }

    get openDate(): Date {
        return this._openDate;
    }

    get clientName(): string {
        return this._clientName;
    }

    get attorneyName(): string {
        return this._attorneyName;
    }

    get legalServerNumber(): string {
        return this._legalServerNumber;
    }

    get closedDate(): Date {
        return this._closedDate;
    }

    get typeOfService(): string {
        return this._typeOfService;
    }

    get courtAppearances(): number {
        return this._courtAppearances;
    }

    get status(): string {
        return this._status;
    }
}