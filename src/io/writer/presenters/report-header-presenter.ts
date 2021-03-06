import {Presenter} from "./presenter";

const HEIGHT: number = 2;
const NEXT_ROW_INDEX: number = HEIGHT;

export class ReportHeaderPresenter extends Presenter {

    addContent(): void {
        // Merge the top cell
        const topRowRange = this.sheet.getRange("A1:R1");
        topRowRange.merge();

        // Re-get the top cell now that the row has been merged.  Set the title, center, and fill:
        const titleRange: Excel.Range = this.sheet.getRange("A1:A1");
        titleRange.values = [[this.reportTitle()]];

        const timeSliceBannerRange: Excel.Range = this.sheet.getRange("A2:R2");
        timeSliceBannerRange.values = [
            [
                'Name', '  Jan  ', '  Feb  ', '  Mar  ', '1st Qtr', '  Apr  ', '  May  ',
                '  Jun  ', '2nd Qtr', '  Jul  ', '  Aug  ', '  Sep  ', '3rd Qtr',
                '  Oct  ', '  Nov  ', '  Dec  ', '4th Qtr', '     Total     '
            ]
        ];

        // Decorate these cells!
        this.decorate(titleRange);
        this.decorate(timeSliceBannerRange);
    }

    getNextRowIndex(): number {
        return NEXT_ROW_INDEX;
    }

    protected reportTitle(): string {
        return "DV Clients Served by DV Staff";
    }

}