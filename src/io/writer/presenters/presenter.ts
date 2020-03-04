import Worksheet = Excel.Worksheet;
import {Decorator} from "../decorators/decorator";

export abstract class Presenter {
    protected readonly sheet: Worksheet;
    protected readonly previousPresenter: Presenter;
    protected readonly decorators: Array<Decorator>;

    constructor(worksheet: Worksheet, previousPresenter: Presenter, decorators: Array<Decorator>) {
        this.sheet = worksheet;
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