import { Component, OnInit } from "@angular/core";
import { ShowService } from "src/app/_features/dashboard/service/show.service";
import { VenueService } from "src/app/_features/shows/service/venue.service";
import { StyleChangeService } from "../service/style-change.service";

@Component({
  selector: "mp-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent implements OnInit {
  showalternator = "summary";
  activeElem = "summary";
  // tslint:disable-next-line: no-inferrable-types
  style: string = "default";
  constructor(
    public showService: ShowService,
    public venuecityService: VenueService,
    private stylechanges: StyleChangeService
  ) {}

  ngOnInit(): void {
    // subscribe to changing styles
    // tslint:disable-next-line: ban-types
    this.stylechanges.homestyle$.subscribe((bool: Boolean) => {
      if (this.style === "default") {
        this.style = "";
      } else {
        this.style = "default";
      }
    });
  }
  // This method will alternate the display between
  // Now-showing and upcoming view
  switchShow(viewname: any) {
    if (viewname === "summary") {
      this.showalternator = "summary";
    } else if (viewname === "nowshowing") {
      this.activeElem = "nowshowing";
      this.showalternator = "nowshowing";
    } else {
      this.activeElem = "upcoming";
      this.showalternator = "upcoming";
    }
  }
  // To set the side menu element active
  setActive(activeElem: string) {
    this.activeElem = activeElem;
  }
}
