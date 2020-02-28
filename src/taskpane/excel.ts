/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global console, document, Excel, Office */

import WorksheetCollection = Excel.WorksheetCollection;
import RequestContext = Excel.RequestContext;
import {ClientInteraction} from "../containers/client-interaction";
import {ClientInteractionRowParser} from "../parsers/client-interaction-row-parser";
import {Set} from "collections/set";
import {ReportWriter} from "../io/writer/report-writer";
import {DateHelper} from "../helpers/date-helper";
import {ClientInteractionHelper} from "../helpers/client-interaction-helper";

Office.onReady(info => {
    if (info.host === Office.HostType.Excel) {
        document.getElementById("sideload-msg").style.display = "none";
        document.getElementById("app-body").style.display = "flex";
        document.getElementById("run").onclick = generateReport;
    }
});

function generateReport() {
    Excel.run(function (context: RequestContext) {

        // Get the range of the current active worksheet
        const filledInRange: Excel.Range = context.workbook.worksheets.getActiveWorksheet().getUsedRange();
        filledInRange.load("values");

        // Load and read all client interactions from the workbook
        return context.sync().then(function () {

            // Get all client interactions for this sheet
            const clientInteractions = parseSheetForClientInteractions(filledInRange);
            const attorneyName: string = ClientInteractionHelper.getAttorneyName(clientInteractions);

            // TODO: REMOVE THIS DEBUGGING STATEMENT:
            console.log(`generateReport: clientInteractions.size=[${clientInteractions.size}]`);

            // This class creates and decorates the reports sheet
            const reportWriter: ReportWriter = new ReportWriter(
                context,
                attorneyName,
                clientInteractions,
                DateHelper.getReportStartDate(),
                DateHelper.getReportEndDate()
            );

            // Delete the existing report sheet
            reportWriter.deleteSheet();

            // Create the report sheet:
            reportWriter.createSheet();

            // This needs to be the final line of the block
            return context.sync();
        });
    });
}

function getAllSheetNames(sheets: WorksheetCollection): Set<String> {
    const sheetNames = new Set<String>();
    for (let i in sheets.items) {
        const sheetName: String = sheets.items[i].name;

        // TODO: REMOVE THIS DEBUGGING STATEMENT
        console.log(`getAllSheetNames: name=[${sheetName}]`);
        sheetNames.add(sheetName);
    }

    return sheetNames;
}

function parseSheetForClientInteractions(sheetRange: Excel.Range): Set<ClientInteraction> {

    const clientInteractions = new Set<ClientInteraction>();

    sheetRange.values.forEach(function (row: any[], index: number, array: any[][]) {
        if (ClientInteractionRowParser.isValidClientInteraction(row)) {
            clientInteractions.add(ClientInteractionRowParser.buildClientInteraction(row));
        }
    });

    return clientInteractions;
}