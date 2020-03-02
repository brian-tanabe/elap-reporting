import {Decorator} from "./decorator";

export class BoldDecorator implements Decorator {

    decorate(range: Excel.Range): void {
        range.format.font.bold = true;
    }

}