import {ClientInteraction} from "../containers/client-interaction";
import {DateHelper} from "../helpers/date-helper";

// Constants
const COLUMN_REPORTING_MONTH: number = 0;
const COLUMN_OPEN_DATE: number = 1;
const COLUMN_CLIENT: number = 2;
const COLUMN_PROGRAM: number = 3;
const COLUMN_REFERRAL_SOURCE: number = 4;
const COLUMN_LEGAL_SEVER_NUMBER: number = 5;
const COLUMN_ASSIGNED: number = 6;
const COLUMN_LEGAL_ISSUE: number = 7;
const COLUMN_TYPE_OF_SERVICE: number = 8;
const COLUMN_STATUS: number = 9;
const COLUMN_DATE_CLOSED: number = 10;
const COLUMN_NOTES: number = 11;
const COLUMN_COURT_APPEARANCES: number = 12;

const EXPECTED_NUMBER_OF_COLUMNS: number = 13;

export class ClientInteractionRowParser {

    /**
     * Returns TRUE if the row from the Excel sheet represents a ClientInteraction; else FALSE.
     *
     * @param row
     */
    static isValidClientInteraction(row: any[]): Boolean {

        // Check if we have the expected number of rows.  They often put stuff to the right of the table.
        // We'll ignore that but not fail this check.
        if (Number(row.length.valueOf()) < Number(EXPECTED_NUMBER_OF_COLUMNS)) {
            return false;
        }

        try {
            // Try building the ClientInteraction object.  If it throws an exception, we know this was not a valid row
            this.buildClientInteraction(row);
            return true;
        } catch (error) {
            return false;
        }

    }

    /**
     * This method marshals the column data into ClientInteraction objects.  It will throw an error
     * if any of the dates are incorrect and if any of the non-closed dates are empty
     *
     * @param row
     */
    static buildClientInteraction(row: any[]): ClientInteraction {

        const reportingMonth: Date = DateHelper.convertExcelDateToDate(row[COLUMN_REPORTING_MONTH]);
        const openDate: Date = DateHelper.convertExcelDateToDate(row[COLUMN_OPEN_DATE]);
        const client: string = row[COLUMN_CLIENT];

        const legalServerNumber: string = row[COLUMN_LEGAL_SEVER_NUMBER];
        const attorney: string = row[COLUMN_ASSIGNED];
        const status: string = row[COLUMN_STATUS];
        const typeOfService: string = row[COLUMN_TYPE_OF_SERVICE];
        const courtAppearancesString: string = row[COLUMN_COURT_APPEARANCES];

        // If the case was closed, it's safe to assume there will be a closed date
        const closedDateString: string = row[COLUMN_DATE_CLOSED];
        let closedDate: Date;
        if (closedDateString === "closed") {
            closedDate = DateHelper.convertExcelDateToDate(closedDateString);
        }

        let courtAppearances: number = 0;
        if (Number(courtAppearancesString)) {
            courtAppearances = row[COLUMN_COURT_APPEARANCES];
        }

        return new ClientInteraction(
            reportingMonth,
            openDate,
            client,
            attorney,
            legalServerNumber,
            closedDate,
            typeOfService.trim(),
            courtAppearances,
            status.trim().toLowerCase()
        );
    }

}