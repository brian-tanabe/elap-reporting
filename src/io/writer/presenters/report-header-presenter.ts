import {ReportPresenter} from "./report-presenter";

const HEIGHT: number = 2;
const NEXT_ROW_INDEX: number = HEIGHT;

export class ReportHeaderPresenter extends ReportPresenter {

    addContent(): void {
        // Merge the top cell
        const topRowRange = this.reportSheet.getRange("A1:R1");
        topRowRange.merge();

        // Re-get the top cell now that the row has been merged.  Set the title, center, and fill:
        const titleRange: Excel.Range = this.reportSheet.getRange("A1:A1");
        titleRange.values = [[this.reportTitle()]];
        titleRange.format.horizontalAlignment = "Center";

        const timeSliceBannerRange: Excel.Range = this.reportSheet.getRange("A2:R2");
        timeSliceBannerRange.values = [
            [
                'Name', 'Jan', 'Feb', 'Mar', '1st Qtr', 'Apr', 'May',
                'Jun', '2nd Qtr', 'Jul', 'Aug', 'Sep', '3rd Qtr',
                'Oct', 'Nov', 'Dec', '4th Qtr', 'Total'
            ]
        ];
        timeSliceBannerRange.format.autofitColumns();

        // TODO: FIGURE OUT HOW TO CORRECTLY FILL CELLS.  THIS THROWS AN ERROR.
        // timeSliceBannerRange.format.fill.color = "#472C4";
        // titleRange.format.fill.color = "#472C4";

    }

    getNextRowIndex(): number {
        return NEXT_ROW_INDEX;
    }

    protected reportTitle(): string {
        return "DV Clients Served by DV Staff";
    }

}