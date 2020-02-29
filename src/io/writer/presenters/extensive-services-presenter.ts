import {CountByMonthPresenter} from "./count-by-month-presenter";

export class ExtensiveServicesPresenter extends CountByMonthPresenter {

    protected reportTitle(): string {
        return "Extensive Services";
    }

}