import {WorksheetWriter} from "./worksheet-writer";
import {ReportHeaderPresenter} from "./presenters/report-header-presenter";
import {NamePresenter} from "./presenters/name-presenter";
import {OpenCasesPresenter} from "./presenters/open-cases-presenter";
import {ClientInteraction} from "../../containers/client-interaction";
import RequestContext = Excel.RequestContext;
import {OpenCasesCalculator} from "../../calculators/open-cases-calculator";
import {NewAcceptedCasesPresenter} from "./presenters/new-accepted-cases-presenter";
import {NewAcceptedCasesCalculator} from "../../calculators/new-accepted-cases-calculator";
import {ClosedCasesPresenter} from "./presenters/closed-cases-presenter";
import {ClosedCasesCalculator} from "../../calculators/closed-cases-calculator";
import {AdviceAndCounselPresenter} from "./presenters/advice-and-counsel-presenter";
import {AdviceAndCounselCalculator} from "../../calculators/advice-and-counsel-calculator";

const REPORT_SHEET_NAME = "Report";

export class ReportWriter implements WorksheetWriter {
    private readonly context: RequestContext;
    private readonly attorneyName: string;
    private readonly clientInteractions: Set<ClientInteraction>;
    private readonly reportStartDate: Date;
    private readonly reportEndDate: Date;

    constructor(context: RequestContext, attorneyName: string, clientInteractions: Set<ClientInteraction>, reportStartDate: Date, reportEndDate: Date) {
        this.context = context;
        this.attorneyName = attorneyName;
        this.clientInteractions = clientInteractions;
        this.reportStartDate = reportStartDate;
        this.reportEndDate = reportEndDate;
    }

    /**
     * We'll generate a clean report every time
     */
    deleteSheet(): void {
        const reportSheet: Excel.Worksheet = this.context.workbook.worksheets.getItemOrNullObject(REPORT_SHEET_NAME);
        if (reportSheet) {
            reportSheet.delete();
        }
    }

    /**
     * Create the report sheet
     */
    createSheet(): void {
        const reportSheet: Excel.Worksheet = this.context.workbook.worksheets.add(REPORT_SHEET_NAME);

        const reportHeaderPresenter: ReportHeaderPresenter = new ReportHeaderPresenter(reportSheet, null);
        reportHeaderPresenter.addContent();

        const namePresenter: NamePresenter = new NamePresenter(reportSheet, reportHeaderPresenter, this.attorneyName);
        namePresenter.addContent();

        // TODO: REMOVE THIS DEBUGGING STATEMENT
        console.log(`ReportWriter: clientInteractions=[${this.clientInteractions.size}]`);

        const openCasesPresenter: OpenCasesPresenter = new OpenCasesPresenter(reportSheet, namePresenter, new OpenCasesCalculator(this.clientInteractions, this.reportStartDate, this.reportEndDate), this.attorneyName);
        openCasesPresenter.addContent();

        const newAcceptedCasesPresenter: NewAcceptedCasesPresenter = new NewAcceptedCasesPresenter(reportSheet, openCasesPresenter, new NewAcceptedCasesCalculator(this.clientInteractions, this.reportStartDate, this.reportEndDate), this.attorneyName);
        newAcceptedCasesPresenter.addContent();

        const closedCasesPresenter: ClosedCasesPresenter = new ClosedCasesPresenter(reportSheet, newAcceptedCasesPresenter, new ClosedCasesCalculator(this.clientInteractions, this.reportStartDate, this.reportEndDate), this.attorneyName);
        closedCasesPresenter.addContent();

        const adviceAndCounselPresenter: AdviceAndCounselPresenter = new AdviceAndCounselPresenter(reportSheet, closedCasesPresenter, new AdviceAndCounselCalculator(this.clientInteractions, this.reportStartDate, this.reportEndDate), this.attorneyName);
        adviceAndCounselPresenter.addContent();
    }
}