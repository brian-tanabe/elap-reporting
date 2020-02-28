import {ReportPresenter} from "./report-presenter";
import Worksheet = Excel.Worksheet;

const HEIGHT: number = 1;

export class NamePresenter extends ReportPresenter {
    private readonly _name;

    constructor(reportSheet: Worksheet, previousPresenter: ReportPresenter, name: String) {
        super(reportSheet, previousPresenter);
        this._name = name;
    }

    addContent(): void {
        // Get the cell to place the name:
        const rowIndex: number = this.previousPresenter.getNextRowIndex();

        // TODO REMOVE THIS DEBUGGING STATEMENT:
        console.log(`NamePresenter addContent: row=[${rowIndex}]`);

        // getCell is a zero-indexed API:
        const nameCell: Excel.Range = this.reportSheet.getCell(rowIndex, 0);

        // Set the name:
        nameCell.values = [[this._name]];

        // Stylize the cell:
        // TODO: FIGURE OUT HOW TO CORRECTLY FILL CELLS.  THIS THROWS AN ERROR.
        nameCell.format.autofitColumns();
        // nameCell.format.fill.color = "#472C4";
        // nameCell.format.fill.color = "#472C4";
    }

    getNextRowIndex(): number {
        return this.previousPresenter.getNextRowIndex() + HEIGHT;
    }

}