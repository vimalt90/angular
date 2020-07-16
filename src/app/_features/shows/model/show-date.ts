import { DatePipe } from "@angular/common";

export class ShowDate {
    showDate: string;
    day: string;
    constructor(showDate: ShowDate) {
        this.showDate = showDate.showDate;
        this.day = showDate.day;
    }
}
