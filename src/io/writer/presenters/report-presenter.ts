import Worksheet = Excel.Worksheet;
import {Decorator} from "../decorators/decorator";

export abstract class ReportPresenter {
    protected readonly reportSheet: Worksheet;
    protected readonly previousPresenter: ReportPresenter;
    protected readonly decorators: Array<Decorator>;

    constructor(reportSheet: Worksheet, previousPresenter: ReportPresenter, decorators: Array<Decorator>) {
        this.reportSheet = reportSheet;
        this.previousPresenter = previousPresenter;
        this.decorators = decorators;
    }

    protected abstract reportTitle(): string;

    abstract addContent(): void;

    abstract getNextRowIndex(): number;

    protected decorate(range: Excel.Range): void {
        // if(!this.decorators) {
        //     return;
        // }

        this.decorators.forEach(function (decorator) {
            decorator.decorate(range);
        });
    }

}