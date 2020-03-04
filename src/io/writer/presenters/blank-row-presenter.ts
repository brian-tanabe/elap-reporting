import {Presenter} from "./presenter";

export class BlankRowPresenter extends Presenter {
    private readonly height: number = 1;

    addContent(): void {
        // intentionally left blank
    }

    getNextRowIndex(): number {
        return this.previousPresenter.getNextRowIndex() + this.height;
    }

    protected reportTitle(): string {
        // intentionally left blank
        return "";
    }

}