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
import {OpenCasesCalculator} from "../calculators/open-cases-calculator";
import {DateHelper} from "../helpers/date-helper";

Office.onReady(info => {
    if (info.host === Office.HostType.Excel) {
        document.getElementById("sideload-msg").style.display = "none";
        document.getElementById("app-body").style.display = "flex";
        document.getElementById("run").onclick = generateReport;
    }
});

function generateReport() {
    Excel.run(function (context: RequestContext) {

        // This class creates and decorates the reports sheet
        const reportWriter: ReportWriter = new ReportWriter(context);
        reportWriter.deleteSheet();

        // We have to do all of our reading before we do any writing
        let sheets: Excel.WorksheetCollection = context.workbook.worksheets;
        sheets.load("items/name");

        // This is Set will store all parsed ClientInteractions from the worksheets:
        let clientInteractions = new Set<ClientInteraction>();

        // Load and read all client interactions from the workbook
        return context.sync().then(function () {

            // Delete the existing report sheet

            // Get all sheet names
            const sheetNames = getAllSheetNames(sheets);

            // For each worksheet, grab the range and create ClientInteractions
            sheetNames.forEach(sheetName => {
                const clientInteractions = parseSheetForClientInteractions(context, sheetName);

                // TODO: REMOVE THIS DEBUGGING STATEMENT:
                console.log(`generateReport: clientInteractions.size=[${clientInteractions.size}]`);

                // Create the report calculators
                const openCasesCalculator = new OpenCasesCalculator(clientInteractions, DateHelper.getReportStartDate(), DateHelper.getReportEndDate());

                // TODO: REMOVE THIS DEBUGGING STATEMENT:
                console.log(`generateReport: open cases for Dorothy in January=[${openCasesCalculator.getCount("Dorothy", DateHelper.getReportStartDate())}]`);
            });


            // clientInteractions = parseAllSheetsForClientInteractionsAndGenerateReport(context, sheetNames, reportWriter);


            // TODO: REMOVE THIS DEBUGGING STATEMENT
            console.log(`Done with the reading phase of report generation`);

        }).then(function () {

            // TODO: REMOVE THIS DEBUGGING STATEMENT
            console.log(`generateReport: about to print all ClientInteractions.  clientInteractions.length=[${clientInteractions.length}]`);
            clientInteractions.forEach((clientInteraction) => {
                // TODO: REMOVE THIS DEBUGGING STATEMENT:
                console.log(`generateReport: client=[${clientInteraction.toString()}]`);
            });

            // Create the report sheet

            // This needs to be the final line of the block
            return context.sync();
        });
    }).catch((error) => console.error(`Error: ${error}`));
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

function parseSheetForClientInteractions(context: RequestContext, sheetName: String): Set<ClientInteraction> {

    // Load the values for this sheet
    const filledInRange: Excel.Range = context.workbook.worksheets.getItem(sheetName.toString()).getUsedRange();
    filledInRange.load("values");

    const clientInteractions = new Set<ClientInteraction>();

    context.sync().then(function () {

        filledInRange.values.forEach(function (row: any[], index: number, array: any[][]) {
            if (ClientInteractionRowParser.isValidClientInteraction(row)) {

                // TODO: REMOVE THIS DEBUGGING STATEMENT
                console.log(`legal row=[${row}]`);

                clientInteractions.add(ClientInteractionRowParser.buildClientInteraction(row));
            }
        });

    }).then(context.sync).then(function () {
        // TODO: DETERMINE IF WE NEED TO SYNC BEFORE RETURNING

        // TODO: REMOVE THIS DEBUGGING STATEMENT
        console.log(`parseSheetForClientInteractions: sheetName=[${sheetName}], interactions.length=[${clientInteractions.length}]`);
        return clientInteractions;
    });
}

/**
 *
 * @param context: The request's context.  This method requires a sync for every sheet that's parsed.
 * @param sheetNames: A Set containing strings representing the name of each sheet to parse
 * @param reportWriter: The
 */
function parseAllSheetsForClientInteractionsAndGenerateReport(context: RequestContext, sheetNames: Set<String>, reportWriter: ReportWriter) {

    const clientInteractions = new Set<ClientInteraction>();
    sheetNames.forEach((sheetName: String) => {

        // TODO: REMOVE THIS DEBUGGING STATEMENT
        console.log(`parseAllSheetsForClientInteractions: sheet=[${sheetName}]`);

        const filledInRange: Excel.Range = context.workbook.worksheets.getItem(sheetName.toString()).getUsedRange();
        filledInRange.load("values");

        context.sync().then(function () {

            // TODO: REMOVE THIS DEBUGGING STATEMENT
            console.log(`parseAllSheetsForClientInteractions: range.null?=[${filledInRange == null}]`);

            filledInRange.values.forEach(function (row: any[], index: number, array: any[][]) {
                if (ClientInteractionRowParser.isValidClientInteraction(row)) {

                    // TODO: REMOVE THIS DEBUGGING STATEMENT
                    console.log(`legal row=[${row}]`);

                    clientInteractions.add(ClientInteractionRowParser.buildClientInteraction(row));
                }
            });

            // TODO: REMOVE THIS DEBUGGING STATEMENT
            console.log(`parseAllSheetsForClientInteractions: sheetName=[${sheetName}], interactions.length=[${clientInteractions.length}]`);

        }).then(context.sync).then(function () {
            // TODO: REMOVE THIS DEBUGGING STATEMENT
            console.log(`parseAllSheetsForClientInteractions: all interactions.length=[${clientInteractions.length}]`);

        });

        return clientInteractions;
    });
}