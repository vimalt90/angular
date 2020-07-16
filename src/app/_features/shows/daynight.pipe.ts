import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "daynight"
})
export class DaynightPipe implements PipeTransform {
  time: any;
  ampm: any;
  transform(item: string): any {

    if (!item) { return ""; }
    item = item.toLowerCase().replace(/\s/g, "");
    this.time = item.substring(0, item.indexOf(":"));
    this.ampm = item.substring(item.length - 2, item.length);

    if (this.ampm === "am") {
      return "morning";
    } else if (
      // tslint:disable-next-line: use-isnan
      NaN !== Number(this.time) &&
      Number(this.time) <= 6 &&
      this.ampm === "pm"
    ) {
      return "noon";
    } else if (
      // tslint:disable-next-line: use-isnan
      NaN !== Number(this.time) &&
      Number(this.time) > 6 &&
      this.ampm === "pm"
    ) {
      return "night";
    }
  }

}
