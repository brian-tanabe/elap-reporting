const {getJsDateFromExcel} = require("excel-date-to-js");

export class DateHelper {

    static convertExcelDateToDate(excelDate: String): Date {
        return getJsDateFromExcel(excelDate);
    }

}