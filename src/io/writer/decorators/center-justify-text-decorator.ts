import {Decorator} from "./decorator";

export class CenterJustifyTextDecorator implements Decorator {

    decorate(range: Excel.Range): void {
        range.format.horizontalAlignment = "Center";
    }

}