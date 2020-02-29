import {CountByMonthPresenter} from "./count-by-month-presenter";

export class NewAcceptedCasesPresenter extends CountByMonthPresenter {

    protected reportTitle(): string {
        return "New Accepted Cases";
    }

}