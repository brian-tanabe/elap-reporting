const {getJsDateFromExcel} = require("excel-date-to-js");

export class DateHelper {

    static convertExcelDateToDate(excelDate: String): Date {
        return getJsDateFromExcel(excelDate);
    }

    static getReportStartDate(): Date {
        // TODO: MAKE THIS AN INPUT VARIABLE
        // return new Date(Date.UTC(2019, 0, 1).valueOf());
        return new Date(Date.UTC(2020, 0, 15).valueOf());
    }

    static getReportEndDate(): Date {
        // TODO: MAKE THIS AN INPUT VARIABLE
        // return new Date(Date.UTC(2019, 11, 31).valueOf());
        return new Date(Date.UTC(2020, 11, 15).valueOf());
    }
}