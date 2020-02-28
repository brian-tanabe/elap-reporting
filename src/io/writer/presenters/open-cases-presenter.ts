import {ReportPresenter} from "./report-presenter";
import {OpenCasesCalculator} from "../../../calculators/open-cases-calculator";
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

const REPORT_TITLE: string = "Open Cases";

export class OpenCasesPresenter extends ReportPresenter {
    private readonly openCasesCalculator: OpenCasesCalculator;
    private readonly attorneyName: string;

    constructor(reportSheet: Worksheet, previousPresenter: ReportPresenter, openCasesCalculator: OpenCasesCalculator, attorneyName: string) {
        super(reportSheet, previousPresenter);

        this.openCasesCalculator = openCasesCalculator;
        this.attorneyName = attorneyName;
    }

    addContent(): void {
        const janCount = this.openCasesCalculator.getCount(this.attorneyName, this.getMonthAsDate(JAN_INDEX));
        const febCount = this.openCasesCalculator.getCount(this.attorneyName, this.getMonthAsDate(FEB_INDEX));
        const marCount = this.openCasesCalculator.getCount(this.attorneyName, this.getMonthAsDate(MAR_INDEX));
        const aprCount = this.openCasesCalculator.getCount(this.attorneyName, this.getMonthAsDate(APR_INDEX));
        const mayCount = this.openCasesCalculator.getCount(this.attorneyName, this.getMonthAsDate(MAY_INDEX));
        const junCount = this.openCasesCalculator.getCount(this.attorneyName, this.getMonthAsDate(JUN_INDEX));
        const julCount = this.openCasesCalculator.getCount(this.attorneyName, this.getMonthAsDate(JUL_INDEX));
        const augCount = this.openCasesCalculator.getCount(this.attorneyName, this.getMonthAsDate(AUG_INDEX));
        const sepCount = this.openCasesCalculator.getCount(this.attorneyName, this.getMonthAsDate(SEP_INDEX));
        const octCount = this.openCasesCalculator.getCount(this.attorneyName, this.getMonthAsDate(OCT_INDEX));
        const novCount = this.openCasesCalculator.getCount(this.attorneyName, this.getMonthAsDate(NOV_INDEX));
        const decCount = this.openCasesCalculator.getCount(this.attorneyName, this.getMonthAsDate(DEC_INDEX));

        const openCasesArray = [
            [
                REPORT_TITLE,
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
                janCount + febCount + marCount + aprCount + mayCount + junCount + julCount + augCount + sepCount + octCount + novCount + decCount
            ]
        ];

        // Add the data
        const range = this.reportSheet.getRangeByIndexes(this.previousPresenter.getNextRowIndex(), 0, HEIGHT, WIDTH);
        range.values = openCasesArray;

        // Stylize the row:
        range.format.autofitColumns();
    }

    getNextRowIndex(): number {
        return this.previousPresenter.getNextRowIndex() + HEIGHT;
    }

    private getMonthAsDate(monthIndex: number): Date {
        const year = this.openCasesCalculator.reportStartDate.getUTCFullYear();

        return new Date(Date.UTC(year, monthIndex, 1).valueOf());
    }
}