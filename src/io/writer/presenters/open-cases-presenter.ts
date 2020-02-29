import {CountByMonthPresenter} from "./count-by-month-presenter";

export class OpenCasesPresenter extends CountByMonthPresenter {

    protected reportTitle(): string {
        return "Open Cases";
    }

}