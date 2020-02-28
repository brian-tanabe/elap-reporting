import Worksheet = Excel.Worksheet;

export abstract class ReportPresenter {
    protected readonly reportSheet: Worksheet;
    protected readonly previousPresenter: ReportPresenter;

    constructor(reportSheet: Worksheet, previousPresenter: ReportPresenter) {
        this.reportSheet = reportSheet;
        this.previousPresenter = previousPresenter;
    }

    abstract addContent(): void;

    abstract getNextRowIndex(): number;

}