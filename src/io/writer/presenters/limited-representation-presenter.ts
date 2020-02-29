import {CountByMonthPresenter} from "./count-by-month-presenter";

export class LimitedRepresentationPresenter extends CountByMonthPresenter {

    protected reportTitle(): string {
        return "Limited Representation";
    }

}