import {Presenter} from "./presenter";

const HEIGHT: number = 1;

export class TemplateColumnHeaderPresenter extends Presenter {

    addContent(): void {
        const range: Excel.Range = this.sheet.getRangeByIndexes(this.previousPresenter.getNextRowIndex(), 0, 1, 13);
        range.values = [[
            "    Reporting Month    ",
            "    Open Date    ",
            "                        Client                        ",
            "    Program    ",
            "                Referral Source                ",
            "                Legal Server #                ",
            "        Assigned        ",
            "                        Legal Issue                        ",
            "                        Type of Service                        ",
            "        Status        ",
            "        Date Closed        ",
            "                                                                Notes                                                                ",
            "    Court Appearance    "
        ]];

        this.decorate(range);
    }

    getNextRowIndex(): number {
        return this.previousPresenter.getNextRowIndex() + HEIGHT;
    }

    protected reportTitle(): string {
        return "";
    }

}