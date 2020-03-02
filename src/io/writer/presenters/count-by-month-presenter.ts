import {ReportPresenter} from "./report-presenter";
import {Calculator} from "../../../calculators/calculator";
import {Decorator} from "../decorators/decorator";
import {BoldDecorator} from "../decorators/bold-decorator";
import {CellColorDecorator} from "../decorators/cell-color-decorator";
import {CenterJustifyTextDecorator} from "../decorators/center-justify-text-decorator";
import {TextColorDecorator} from "../decorators/text-color-decorator";
import {LeftJustifyTextDecorator} from "../decorators/left-justify-text-decorator";
import Worksheet = Excel.Worksheet;

const JAN_INDEX: number = 0;
const FEB_INDEX: number = 1;
const MAR_INDEX: number = 2;
const APR_INDEX: number = 3;
const MAY_INDEX: number = 4;
const JUN_INDEX: number = 5;
const JUL_INDEX: number = 6;
const AUG_INDEX: number = 7;
const SEP_INDEX: number = 8;
const OCT_INDEX: number = 9;
const NOV_INDEX: number = 10;
const DEC_INDEX: number = 11;

const HEIGHT: number = 1;
const WIDTH: number = 18;

export abstract class CountByMonthPresenter extends ReportPresenter {
    protected readonly calculator: Calculator;
    protected readonly attorneyName: string;
    private readonly boldDecorator = new BoldDecorator();
    private readonly darkBlueCellColorDecorator = new CellColorDecorator("#4175B0");
    private readonly centerTextDecorator = new CenterJustifyTextDecorator();
    private readonly leftJustifyTextDecorator = new LeftJustifyTextDecorator();
    private readonly whiteTextDecorator = new TextColorDecorator("white");

    constructor(reportSheet: Worksheet, previousPresenter: ReportPresenter, calculator: Calculator, attorneyName: string, decorators: Array<Decorator>) {
        super(reportSheet, previousPresenter, decorators);

        this.calculator = calculator;
        this.attorneyName = attorneyName;

        // TODO: REJECT ATTEMPTS TO ADD DECORATORS TO THIS CLASS.  IT DEFAULTS TO ITS OWN LIST:
        // if(decorators.length != 0) {
        //     throw new Error(`The ${this.constructor.name} does not support custom decorators!`);
        // }
    }

    addContent(): void {
        const janCount = this.calculator.getCountForMonth(this.attorneyName, this.getMonthAsDate(JAN_INDEX));
        const febCount = this.calculator.getCountForMonth(this.attorneyName, this.getMonthAsDate(FEB_INDEX));
        const marCount = this.calculator.getCountForMonth(this.attorneyName, this.getMonthAsDate(MAR_INDEX));
        const aprCount = this.calculator.getCountForMonth(this.attorneyName, this.getMonthAsDate(APR_INDEX));
        const mayCount = this.calculator.getCountForMonth(this.attorneyName, this.getMonthAsDate(MAY_INDEX));
        const junCount = this.calculator.getCountForMonth(this.attorneyName, this.getMonthAsDate(JUN_INDEX));
        const julCount = this.calculator.getCountForMonth(this.attorneyName, this.getMonthAsDate(JUL_INDEX));
        const augCount = this.calculator.getCountForMonth(this.attorneyName, this.getMonthAsDate(AUG_INDEX));
        const sepCount = this.calculator.getCountForMonth(this.attorneyName, this.getMonthAsDate(SEP_INDEX));
        const octCount = this.calculator.getCountForMonth(this.attorneyName, this.getMonthAsDate(OCT_INDEX));
        const novCount = this.calculator.getCountForMonth(this.attorneyName, this.getMonthAsDate(NOV_INDEX));
        const decCount = this.calculator.getCountForMonth(this.attorneyName, this.getMonthAsDate(DEC_INDEX));

        // Some calculators have weird implementations for the total column:
        const totalCount = this.calculator.getTotalCount(this.attorneyName, this.getMonthAsDate(DEC_INDEX));

        const openCasesArray = [
            [
                this.reportTitle(),
                janCount,
                febCount,
                marCount,
                janCount + febCount + marCount,
                aprCount,
                mayCount,
                junCount,
                aprCount + mayCount + junCount,
                julCount,
                augCount,
                sepCount,
                julCount + augCount + sepCount,
                octCount,
                novCount,
                decCount,
                octCount + novCount + decCount,
                totalCount
            ]
        ];

        // Add the data
        const range = this.reportSheet.getRangeByIndexes(this.previousPresenter.getNextRowIndex(), 0, HEIGHT, WIDTH);
        range.values = openCasesArray;

        // Stylize the row:
        range.format.autofitColumns();

        this.decorate(range);
    }

    getNextRowIndex(): number {
        return this.previousPresenter.getNextRowIndex() + 1;
    }

    // Overwritten method
    protected decorate(range: Excel.Range): void {
        // Styling common to the entire row:
        this.centerTextDecorator.decorate(range);

        // Realign the name cell to be left justified
        const nameCell = this.reportSheet.getRangeByIndexes(this.previousPresenter.getNextRowIndex(), 0, 1, 1);
        this.leftJustifyTextDecorator.decorate(nameCell);

        // Styling for the quarter cells
        const firstQuarterRange = this.reportSheet.getRangeByIndexes(this.previousPresenter.getNextRowIndex(), 4, 1, 1);
        this.darkBlueCellColorDecorator.decorate(firstQuarterRange);
        this.whiteTextDecorator.decorate(firstQuarterRange);

        const secondQuarterRange = this.reportSheet.getRangeByIndexes(this.previousPresenter.getNextRowIndex(), 8, 1, 1);
        this.darkBlueCellColorDecorator.decorate(secondQuarterRange);
        this.whiteTextDecorator.decorate(secondQuarterRange);

        const thirdQuarterRange = this.reportSheet.getRangeByIndexes(this.previousPresenter.getNextRowIndex(), 12, 1, 1);
        this.darkBlueCellColorDecorator.decorate(thirdQuarterRange);
        this.whiteTextDecorator.decorate(thirdQuarterRange);

        const forthQuarterRange = this.reportSheet.getRangeByIndexes(this.previousPresenter.getNextRowIndex(), 16, 1, 1);
        this.darkBlueCellColorDecorator.decorate(forthQuarterRange);
        this.whiteTextDecorator.decorate(forthQuarterRange);

        // Bold-ify the total cell
        const totalCell = this.reportSheet.getRangeByIndexes(this.previousPresenter.getNextRowIndex(), 17, 1, 1);
        this.boldDecorator.decorate(totalCell);
    }

    private getMonthAsDate(monthIndex: number): Date {
        const year = this.calculator.reportStartDate.getUTCFullYear();
        return new Date(Date.UTC(year, monthIndex, 1).valueOf());
    }
}