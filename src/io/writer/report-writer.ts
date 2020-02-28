import {WorksheetWriter} from "./worksheet-writer";
import RequestContext = Excel.RequestContext;

const REPORT_SHEET_NAME = "Report";

export class ReportWriter implements WorksheetWriter {
    private readonly _context: RequestContext;

    constructor(context: RequestContext) {
        this._context = context;
    }

    /**
     * We'll generate a clean report every time
     */
    deleteSheet(): void {
        const reportSheet: Excel.Worksheet = this._context.workbook.worksheets.getItemOrNullObject(REPORT_SHEET_NAME);
        if (reportSheet) {
            reportSheet.delete();
        }
    }

    /**
     * Create the report sheet
     */
    createSheet(): void {

    }
}