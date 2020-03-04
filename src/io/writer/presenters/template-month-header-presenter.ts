import {Presenter} from "./presenter";
import {Decorator} from "../decorators/decorator";
import {DateHelper} from "../../../helpers/date-helper";
import Worksheet = Excel.Worksheet;

const HEIGHT: number = 1;
const EMPTY_STRING: string = "";

export class TemplateMonthHeaderPresenter extends Presenter {
    private readonly month: Date;

    constructor(worksheet: Worksheet, previousPresenter: Presenter, decorators: Array<Decorator>, month: Date) {
        super(worksheet, previousPresenter, decorators);

        this.month = month;
    }

    addContent(): void {
        const range: Excel.Range = this.sheet.getRangeByIndexes(this.getRowIndex(), 0, 1, 13);

        range.values = [[
            this.reportTitle(),
            EMPTY_STRING,
            EMPTY_STRING,
            EMPTY_STRING,
            EMPTY_STRING,
            EMPTY_STRING,
            EMPTY_STRING,
            EMPTY_STRING,
            EMPTY_STRING,
            EMPTY_STRING,
            EMPTY_STRING,
            EMPTY_STRING,
            EMPTY_STRING
        ]];

        // TODO: CREATE A DECORATOR THAT CHANGES THE DATE TO SHOW THE FULL MONTH AND YEAR
        this.decorate(range);
    }

    getNextRowIndex(): number {
        return this.getRowIndex() + HEIGHT;
    }

    protected reportTitle(): string {
        return DateHelper.getMonthName(this.month) + " " + this.month.getUTCFullYear();
    }

    private getRowIndex(): number {
        if (this.previousPresenter != null) {
            return this.previousPresenter.getNextRowIndex();
        } else {
            return 0;
        }
    }

}