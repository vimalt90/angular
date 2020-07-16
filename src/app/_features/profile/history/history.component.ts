import { Component, OnInit } from "@angular/core";
import { PreferenceService } from "../service/preference.service";


@Component({
  selector: "mp-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.scss"],
})
export class HistoryComponent implements OnInit {
  constructor(private preferenceService: PreferenceService) { }

  ngOnInit(): void {

  }

  addgenre() {
    this.preferenceService.addPreferedGenre(1);
  }
  fetchgenre() {
    this.preferenceService.getPreferredGenre();
  }
  deletegenre() {
    this.preferenceService.deletePreferredGenre(1, 2);
  }
  addvenue() {
    this.preferenceService.addPreferredVenue(2);
  }
  fetchvenue() {
    this.preferenceService.getPreferrdVenue();
  }
  deletevenue() {
    this.preferenceService.deletePreferredVenue(2, 3);
  }
  getallgenre() {
    this.preferenceService.getGenres();
  }

}



