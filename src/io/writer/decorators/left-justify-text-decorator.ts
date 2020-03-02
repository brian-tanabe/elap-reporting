import {Decorator} from "./decorator";

export class LeftJustifyTextDecorator implements Decorator {

    decorate(range: Excel.Range): void {
        range.format.horizontalAlignment = "Left";
    }

}