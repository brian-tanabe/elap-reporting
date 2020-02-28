import Workbook = Excel.Workbook;
import {WorkbookInterface} from "../workbook-interface";
import RequestContext = Excel.RequestContext;

export class WorkbookReader implements WorkbookInterface {
    private _worksheets: Excel.WorksheetCollection;

    constructor(context: RequestContext) {
        this.gatherVariables(context);
    }

    private gatherVariables(context: RequestContext) {
        this._worksheets = context.workbook.worksheets;
    }

    loadDependencies(context: Excel.RequestContext): Excel.RequestContext {
        // TODO: REMOVE THIS DEBUGGING STATEMENT
        console.log(`WorkbookReader: loadDependencies about to load dependencies`);

        this._worksheets.load("items/name");

        // TODO: REMOVE THIS DEBUGGING STATEMENT
        console.log(`WorkbookReader: loadDependencies dependencies loaded`);

        return context;
    }

    syncAndExecute(context: Excel.RequestContext): Excel.RequestContext {

        // TODO: REMOVE THIS DEBUGGING STATEMENT
        console.log(`WorkbookReader: executeAndSync started`);

        context.sync().then(function () {

            // TODO: REMOVE THIS DEBUGGING STATEMENT
            console.log(`WorkbookReader: executeAndSync sheets=[${this._worksheets.items}]`);

            for (let i in this._worksheets.items) {
                console.log(this._worksheets.items[i].name);
            }
        });

        // TODO: REMOVE THIS DEBUGGING STATEMENT
        console.log(`WorkbookReader: executeAndSync done`);

        return context;
    }

}