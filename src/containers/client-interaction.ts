/**
 *
 */
export class ClientInteraction {
    private readonly _reportingMonth: Date;
    private readonly _openDate: Date;
    private readonly _clientName: String;
    private readonly _attorneyName: String;
    private readonly _legalServerNumber: String;
    private readonly _closedDate?: Date;
    private readonly _typeOfService: String;
    private readonly _courtAppearances: Number;
    private readonly _status: String;

    constructor(
        reportingMonth: Date,
        openDate: Date,
        clientName: String,
        attorneyName: String,
        legalServerNumber: String,
        closedDate: Date,
        typeOfService: String,
        courtAppearances: Number,
        status: String
    ) {
        this.validateClientInteraction(reportingMonth, attorneyName, clientName, openDate, courtAppearances);

        this._reportingMonth = reportingMonth;
        this._openDate = openDate;
        this._clientName = clientName;
        this._attorneyName = attorneyName;
        this._legalServerNumber = legalServerNumber;
        this._closedDate = closedDate;
        this._typeOfService = typeOfService;
        this._courtAppearances = courtAppearances;
        this._status = status.toLowerCase();
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
        return "ClientInteraction reportingMonth=[" + this._reportingMonth + "], attorney=[" + this._attorneyName + "], name=[" + this._clientName + "], openDate=[" + this._openDate + "]";
    }

    // Getters
    get reportingMonth(): Date {
        return this._reportingMonth;
    }

    get openDate(): Date {
        return this._openDate;
    }

    get clientName(): String {
        return this._clientName;
    }

    get attorneyName(): String {
        return this._attorneyName;
    }

    get legalServerNumber(): String {
        return this._legalServerNumber;
    }

    get closedDate(): Date {
        return this._closedDate;
    }

    get typeOfService(): String {
        return this._typeOfService;
    }

    get courtAppearances(): Number {
        return this._courtAppearances;
    }

    get status(): String {
        return this._status;
    }
}