import {Presenter} from "./presenter";
import Worksheet = Excel.Worksheet;
import {Decorator} from "../decorators/decorator";

const HEIGHT: number = 1;

export class NamePresenter extends Presenter {
    private readonly name: string;

    constructor(reportSheet: Worksheet, previousPresenter: Presenter, name: string, decorators: Array<Decorator>) {
        super(reportSheet, previousPresenter, decorators);
        this.name = name;
    }

    addContent(): void {
        // Get the cell to place the name:
        const rowIndex: number = this.previousPresenter.getNextRowIndex();

        // getCell is a zero-indexed API:
        const nameCell: Excel.Range = this.sheet.getCell(rowIndex, 0);

        // Set the name:
        nameCell.values = [[this.reportTitle()]];

        // Decorate this cell
        this.decorate(nameCell);
    }

    getNextRowIndex(): number {
        return this.previousPresenter.getNextRowIndex() + HEIGHT;
    }

    protected reportTitle(): string {
        return this.name;
    }

}