import {Decorator} from "./decorator";

export class AutoFitDecorator implements Decorator {

    decorate(range: Excel.Range): void {
        range.format.autofitColumns();
    }

}