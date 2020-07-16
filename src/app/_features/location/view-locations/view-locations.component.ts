import { Component, OnInit } from "@angular/core";
import { LocationService } from "../service/location.service";

@Component({
  selector: "mp-view-locations",
  templateUrl: "./view-locations.component.html",
  styleUrls: ["./view-locations.component.scss"],
})
export class ViewLocationsComponent implements OnInit {
  constructor(public locationservice: LocationService) { }

  ngOnInit(): void {
    this.locationservice.getAllLocation();
  }
}
