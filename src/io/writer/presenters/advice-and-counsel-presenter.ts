import {CountByMonthPresenter} from "./count-by-month-presenter";

export class AdviceAndCounselPresenter extends CountByMonthPresenter {

    protected reportTitle(): string {
        return "Advice & Counsel ";
    }

}