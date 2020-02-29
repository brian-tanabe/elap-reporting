import {CountByMonthPresenter} from "./count-by-month-presenter";

export class ClosedCasesPresenter extends CountByMonthPresenter {

    protected reportTitle(): string {
        return "Closed Cases";
    }

}