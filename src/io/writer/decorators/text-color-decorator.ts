import {Decorator} from "./decorator";

export class TextColorDecorator implements Decorator {
    private readonly color: string;

    constructor(color: string) {
        this.color = color;
    }

    decorate(range: Excel.Range): void {
        range.format.font.color = this.color;
    }

}
