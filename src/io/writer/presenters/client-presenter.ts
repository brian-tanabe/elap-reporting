import {Presenter} from "./presenter";
import {Decorator} from "../decorators/decorator";
import {ClientInteraction} from "../../../containers/client-interaction";
import {DateHelper} from "../../../helpers/date-helper";
import Worksheet = Excel.Worksheet;

const HEIGHT: number = 1;

export class ClientPresenter extends Presenter {
    private readonly client: ClientInteraction;

    constructor(worksheet: Worksheet, previousPresenter: Presenter, decorators: Array<Decorator>, client: ClientInteraction) {
        super(worksheet, previousPresenter, decorators);

        this.client = client;
    }

    addContent(): void {
        const range: Excel.Range = this.sheet.getRangeByIndexes(this.previousPresenter.getNextRowIndex(), 0, 1, 13);
        range.values = [[
            DateHelper.getReportingMonthString(this.client.reportingMonth),
            DateHelper.getHumanReadableDateString(this.client.openDate),
            this.client.clientName,
            "DV",
            "Jewish Family Services",
            this.client.legalServerNumber,
            this.client.attorneyName,
            "DVPO",
            this.client.typeOfService,
            this.client.status,
            DateHelper.getHumanReadableDateString(this.client.closedDate),
            "Here are some notes",
            this.client.courtAppearances
        ]]
        ;

        range.numberFormat = [[
            "MMM-yy",
            "mm/dd/yy",
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            "mm/dd/yy",
            null,
            null
        ]];

        this.decorate(range);
    }

    getNextRowIndex(): number {
        return this.previousPresenter.getNextRowIndex() + HEIGHT;
    }

    protected reportTitle(): string {
        return "";
    }

}