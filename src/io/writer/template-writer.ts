import {WorksheetWriter} from "./worksheet-writer";
import {BoldDecorator} from "./decorators/bold-decorator";
import {AutoFitDecorator} from "./decorators/auto-fit-decorator";
import {CellColorDecorator} from "./decorators/cell-color-decorator";
import {CenterJustifyTextDecorator} from "./decorators/center-justify-text-decorator";
import {TextColorDecorator} from "./decorators/text-color-decorator";
import {Decorator} from "./decorators/decorator";
import {TemplateMonthHeaderPresenter} from "./presenters/template-month-header-presenter";
import {DateHelper} from "../../helpers/date-helper";
import {TemplateColumnHeaderPresenter} from "./presenters/template-column-header-presenter";
import {ClientInteraction} from "../../containers/client-interaction";
import {BlankRowPresenter} from "./presenters/blank-row-presenter";
import {Presenter} from "./presenters/presenter";
import RequestContext = Excel.RequestContext;

export class TemplateWriter implements WorksheetWriter {
    private readonly context: RequestContext;

    // Decorators
    private readonly boldDecorator: Decorator = new BoldDecorator();
    private readonly autoFitDecorator: Decorator = new AutoFitDecorator();
    private readonly lightBlueCellColorDecorator: Decorator = new CellColorDecorator("#C2D6EC");
    private readonly darkBlueCellColorDecorator: Decorator = new CellColorDecorator("#4175B0");
    private readonly lightGreyCellColorDecorator: Decorator = new CellColorDecorator("F2F2F2");
    private readonly centerTextDecorator: Decorator = new CenterJustifyTextDecorator();
    private readonly whiteTextDecorator: Decorator = new TextColorDecorator("white");

    constructor(context: RequestContext) {
        this.context = context;
    }

    createSheet(): void {
        // Sheet
        const templateSheet: Excel.Worksheet = this.context.workbook.worksheets.add();

        // Dates
        const startDate: Date = DateHelper.getReportStartDate();
        const endDate: Date = DateHelper.getReportEndDate();

        // Months
        const january: Date = new Date(Date.UTC(startDate.getUTCFullYear(), 0, 1));
        const february: Date = new Date(Date.UTC(startDate.getUTCFullYear(), 1, 1));
        const march: Date = new Date(Date.UTC(startDate.getUTCFullYear(), 2, 1));
        const april: Date = new Date(Date.UTC(startDate.getUTCFullYear(), 3, 1));
        const may: Date = new Date(Date.UTC(startDate.getUTCFullYear(), 4, 1));
        const june: Date = new Date(Date.UTC(startDate.getUTCFullYear(), 5, 1));
        const july: Date = new Date(Date.UTC(startDate.getUTCFullYear(), 6, 1));
        const august: Date = new Date(Date.UTC(startDate.getUTCFullYear(), 7, 1));
        const september: Date = new Date(Date.UTC(startDate.getUTCFullYear(), 8, 1));
        const october: Date = new Date(Date.UTC(startDate.getUTCFullYear(), 9, 1));
        const november: Date = new Date(Date.UTC(startDate.getUTCFullYear(), 10, 1));
        const december: Date = new Date(Date.UTC(startDate.getUTCFullYear(), 11, 1));

        // TODO: REMOVE THIS DEBUGGING STATEMENT
        console.log(`About to write the template`);

        const januaryFinalPresenter: Presenter = this.createMonthBlock(
            templateSheet,
            null,
            january,
            new Set<ClientInteraction>([
                new ClientInteraction(
                    january,
                    new Date(january.getUTCFullYear(), january.getUTCMonth(), 4),
                    "Brian Tanabe",
                    "Ailise",
                    "Some Legal Server Number",
                    null,
                    "Extensive Representation",
                    2,
                    "Open"
                ),
                new ClientInteraction(
                    january,
                    new Date(january.getUTCFullYear(), january.getUTCMonth(), 5),
                    "Delores Friendshine",
                    "Ailise",
                    "Another Legal Server Number",
                    new Date(january.getUTCFullYear(), january.getUTCMonth(), 27),
                    "Limited Representation",
                    2,
                    "Closed"
                )
            ])
        );

        const februaryFinalPresenter: Presenter = this.createMonthBlock(
            templateSheet,
            januaryFinalPresenter,
            february,
            new Set<ClientInteraction>()
        );

        const marchFinalPresenter: Presenter = this.createMonthBlock(
            templateSheet,
            februaryFinalPresenter,
            march,
            new Set<ClientInteraction>()
        );

        const aprilFinalPresenter: Presenter = this.createMonthBlock(
            templateSheet,
            marchFinalPresenter,
            april,
            new Set<ClientInteraction>()
        );

        const mayFinalPresenter: Presenter = this.createMonthBlock(
            templateSheet,
            aprilFinalPresenter,
            may,
            new Set<ClientInteraction>()
        );

        const juneFinalPresenter: Presenter = this.createMonthBlock(
            templateSheet,
            mayFinalPresenter,
            june,
            new Set<ClientInteraction>()
        );

        const julyFinalPresenter: Presenter = this.createMonthBlock(
            templateSheet,
            juneFinalPresenter,
            july,
            new Set<ClientInteraction>()
        );

        const augustFinalPresenter: Presenter = this.createMonthBlock(
            templateSheet,
            julyFinalPresenter,
            august,
            new Set<ClientInteraction>()
        );

        const septemberFinalPresenter: Presenter = this.createMonthBlock(
            templateSheet,
            augustFinalPresenter,
            september,
            new Set<ClientInteraction>()
        );

        const octoberFinalPresenter: Presenter = this.createMonthBlock(
            templateSheet,
            septemberFinalPresenter,
            october,
            new Set<ClientInteraction>()
        );

        const novemberFinalPresenter: Presenter = this.createMonthBlock(
            templateSheet,
            octoberFinalPresenter,
            november,
            new Set<ClientInteraction>()
        );

        const decemberFinalPresenter: Presenter = this.createMonthBlock(
            templateSheet,
            novemberFinalPresenter,
            december,
            new Set<ClientInteraction>()
        );
    }

    deleteSheet(): void {
    }

    private createMonthBlock(
        templateSheet: Excel.Worksheet,
        previousPresenter: Presenter,
        reportingMonth: Date,
        clientInteractions: Set<ClientInteraction>
    ): Presenter {

        // Header/banner:
        const headerPresenter: TemplateMonthHeaderPresenter = new TemplateMonthHeaderPresenter(
            templateSheet,
            previousPresenter,
            new Array<Decorator>(
                this.boldDecorator,
                this.lightBlueCellColorDecorator,
                this.centerTextDecorator
            ),
            reportingMonth
        );

        // TODO: REMOVE THIS DEBUGGING STATEMENT:
        console.log(`About to create template header for month: ${reportingMonth.getUTCMonth()} ${reportingMonth.getUTCFullYear()}`);

        headerPresenter.addContent();

        // Column names:
        const columnHeaderPresenter: TemplateColumnHeaderPresenter = new TemplateColumnHeaderPresenter(
            templateSheet,
            headerPresenter,
            new Array<Decorator>(
                this.boldDecorator,
                this.centerTextDecorator,
                this.autoFitDecorator,
                this.lightGreyCellColorDecorator
            )
        );
        columnHeaderPresenter.addContent();

        // Cases
        // let previousClientInteractionPresenter: Presenter = columnHeaderPresenter;
        // clientInteractions.forEach(function (clientInteraction) {
        //     const clientInteractionPresenter: ClientPresenter = new ClientPresenter(
        //         templateSheet,
        //         previousClientInteractionPresenter,
        //         new Array<Decorator>(this.centerTextDecorator),
        //         clientInteraction
        //     );
        //     clientInteractionPresenter.addContent();
        //     previousClientInteractionPresenter = clientInteractionPresenter;
        // });

        // Return a new BlankRowPresenter so there's a blank row between lines.  This simply increments the
        // next row index by one and adds no content, so we don't need to call addContent().
        // return new BlankRowPresenter(templateSheet, previousClientInteractionPresenter, new Array<Decorator>());
        return new BlankRowPresenter(templateSheet, columnHeaderPresenter, new Array<Decorator>());
    }

}