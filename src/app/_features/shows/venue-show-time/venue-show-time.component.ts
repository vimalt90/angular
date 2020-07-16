import { Component, OnInit, TemplateRef } from "@angular/core";
import { ShowTimeService } from "../service/show-time.service";
import { DatePipe } from "@angular/common";
import { ModalService } from "src/app/_core/service/modal.service";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";
import { ShowService } from "../../dashboard/service/show.service";

@Component({
  selector: "mp-venue",
  templateUrl: "./venue-show-time.component.html",
  styleUrls: ["./venue-show-time.component.scss"],
})
export class VenueShowTimeComponent implements OnInit {
  showClass: any;
  seatCount: number;
  venueId: number;
  city: string;
  constructor(
    public showTimeService: ShowTimeService,
    // tslint:disable-next-line: align
    private datePipe: DatePipe,
    public showService: ShowService,
    // tslint:disable-next-line: align
    private modalservice: ModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.venueId = this.showService.booking.venueId;
    this.city = this.showService.booking.city;
    this.getShowDates(this.venueId, this.city);
    this.showTimeService.venueShowDates.pipe(first()).subscribe((showDate) => {
      this.getVenueShowTime(showDate[0]?.showDate);
    });
  }
  async getShowDates(venueId: number, city: string) {
    await this.showTimeService.getVenueShowDates(venueId, city);
  }

  getVenueShowTime(showDate: string) {
    this.showTimeService.getVenueShowTime(this.venueId, this.city, showDate);
  }

  onSelectMovies(movies: any) {
    Object.assign(this.showService.booking, movies);
    this.router.navigate(["shows"]);
  }

  confirmSeatSelectModal(
    seatselection: TemplateRef<any>,
    movieId: number,
    movieName: string,
    companyId: number,
    // tslint:disable-next-line: align
    showPublishedId: number,
    screenId: number,
    showTime: string
  ) {
    this.showService.booking.movieId = movieId;
    this.showService.booking.movieName = movieName;
    this.showService.booking.companyId = companyId;
    this.showService.booking.showPublishedId = showPublishedId;
    this.showService.booking.screenId = screenId;
    this.showService.booking.showTime = showTime;
    this.modalservice.show(seatselection);
  }

  close() {
    this.modalservice.hide();
  }
}
