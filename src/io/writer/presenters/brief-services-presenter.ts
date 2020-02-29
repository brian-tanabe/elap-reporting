import {CountByMonthPresenter} from "./count-by-month-presenter";

export class BriefServicesPresenter extends CountByMonthPresenter {

    protected reportTitle(): string {
        return "Brief Services";
    }

}