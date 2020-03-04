import {WorksheetWriter} from "./worksheet-writer";
import {ReportHeaderPresenter} from "./presenters/report-header-presenter";
import {NamePresenter} from "./presenters/name-presenter";
import {OpenCasesPresenter} from "./presenters/open-cases-presenter";
import {ClientInteraction} from "../../containers/client-interaction";
import {OpenCasesCalculator} from "../../calculators/open-cases-calculator";
import {NewAcceptedCasesPresenter} from "./presenters/new-accepted-cases-presenter";
import {NewAcceptedCasesCalculator} from "../../calculators/new-accepted-cases-calculator";
import {ClosedCasesPresenter} from "./presenters/closed-cases-presenter";
import {ClosedCasesCalculator} from "../../calculators/closed-cases-calculator";
import {AdviceAndCounselPresenter} from "./presenters/advice-and-counsel-presenter";
import {AdviceAndCounselCalculator} from "../../calculators/advice-and-counsel-calculator";
import {BriefServicesPresenter} from "./presenters/brief-services-presenter";
import {BriefServicesCalculator} from "../../calculators/brief-services-calculator";
import {ExtensiveServicesPresenter} from "./presenters/extensive-services-presenter";
import {ExtensiveServicesCalculator} from "../../calculators/extensive-services-calculator";
import {LimitedRepresentationPresenter} from "./presenters/limited-representation-presenter";
import {LimitedRepresentationCalculator} from "../../calculators/limited-representation-calculator";
import {BoldDecorator} from "./decorators/bold-decorator";
import {Decorator} from "./decorators/decorator";
import {AutoFitDecorator} from "./decorators/auto-fit-decorator";
import {CellColorDecorator} from "./decorators/cell-color-decorator";
import {CenterJustifyTextDecorator} from "./decorators/center-justify-text-decorator";
import {TextColorDecorator} from "./decorators/text-color-decorator";
import RequestContext = Excel.RequestContext;

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
        const reportSheet: Excel.Worksheet = this.context.workbook.worksheets.getItemOrNullObject(this.getReportSheetName());
        if (reportSheet) {
            reportSheet.delete();
        }
    }

    /**
     * Create the report sheet
     */
    createSheet(): void {
        // Sheet
        const reportSheet: Excel.Worksheet = this.context.workbook.worksheets.add(this.getReportSheetName());

        // Decorators
        const boldDecorator = new BoldDecorator();
        const autoFitDecorator = new AutoFitDecorator();
        const lightBlueCellColorDecorator = new CellColorDecorator("#C2D6EC");
        const darkBlueCellColorDecorator = new CellColorDecorator("#4175B0");
        const centerTextDecorator = new CenterJustifyTextDecorator();
        const whiteTextDecorator = new TextColorDecorator("white");

        const reportHeaderPresenter: ReportHeaderPresenter = new ReportHeaderPresenter(
            reportSheet,
            null,
            new Array<Decorator>(
                boldDecorator,
                autoFitDecorator,
                lightBlueCellColorDecorator,
                centerTextDecorator
            )
        );
        reportHeaderPresenter.addContent();

        const namePresenter: NamePresenter = new NamePresenter(
            reportSheet,
            reportHeaderPresenter,
            this.attorneyName,
            new Array<Decorator>(boldDecorator)
        );
        namePresenter.addContent();

        const openCasesPresenter: OpenCasesPresenter = new OpenCasesPresenter(
            reportSheet,
            namePresenter,
            new OpenCasesCalculator(
                this.clientInteractions,
                this.reportStartDate,
                this.reportEndDate
            ),
            this.attorneyName,
            new Array<Decorator>(lightBlueCellColorDecorator, darkBlueCellColorDecorator, whiteTextDecorator)
        );
        openCasesPresenter.addContent();

        const newAcceptedCasesPresenter: NewAcceptedCasesPresenter = new NewAcceptedCasesPresenter(
            reportSheet,
            openCasesPresenter,
            new NewAcceptedCasesCalculator(
                this.clientInteractions,
                this.reportStartDate,
                this.reportEndDate
            ),
            this.attorneyName,
            new Array<Decorator>(lightBlueCellColorDecorator)
        );
        newAcceptedCasesPresenter.addContent();

        const closedCasesPresenter: ClosedCasesPresenter = new ClosedCasesPresenter(
            reportSheet,
            newAcceptedCasesPresenter,
            new ClosedCasesCalculator(
                this.clientInteractions,
                this.reportStartDate,
                this.reportEndDate
            ),
            this.attorneyName,
            new Array<Decorator>(lightBlueCellColorDecorator)
        );
        closedCasesPresenter.addContent();

        const adviceAndCounselPresenter: AdviceAndCounselPresenter = new AdviceAndCounselPresenter(
            reportSheet,
            closedCasesPresenter,
            new AdviceAndCounselCalculator(
                this.clientInteractions,
                this.reportStartDate,
                this.reportEndDate
            ),
            this.attorneyName,
            new Array<Decorator>(lightBlueCellColorDecorator)
        );
        adviceAndCounselPresenter.addContent();

        const briefServicesPresenter: BriefServicesPresenter = new BriefServicesPresenter(
            reportSheet,
            adviceAndCounselPresenter,
            new BriefServicesCalculator(
                this.clientInteractions,
                this.reportStartDate,
                this.reportEndDate
            ),
            this.attorneyName,
            new Array<Decorator>(lightBlueCellColorDecorator)
        );
        briefServicesPresenter.addContent();

        const extensiveServicesPresenter: ExtensiveServicesPresenter = new ExtensiveServicesPresenter(
            reportSheet,
            briefServicesPresenter,
            new ExtensiveServicesCalculator(
                this.clientInteractions,
                this.reportStartDate,
                this.reportEndDate
            ),
            this.attorneyName,
            new Array<Decorator>(lightBlueCellColorDecorator)
        );
        extensiveServicesPresenter.addContent();

        const limitedRepresentationPresenter: LimitedRepresentationPresenter = new LimitedRepresentationPresenter(
            reportSheet,
            extensiveServicesPresenter,
            new LimitedRepresentationCalculator(
                this.clientInteractions,
                this.reportStartDate,
                this.reportEndDate
            ),
            this.attorneyName,
            new Array<Decorator>(lightBlueCellColorDecorator)
        );
        limitedRepresentationPresenter.addContent();
    }

    private getReportSheetName(): string {
        return REPORT_SHEET_NAME + "-" + this.attorneyName;
    }
}