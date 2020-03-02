import {Decorator} from "./decorator";

export class CellColorDecorator implements Decorator {
    private readonly color: string;

    constructor(color: string) {
        this.color = color;
    }

    decorate(range: Excel.Range): void {
        range.format.fill.color = this.color;
    }

}