import { Component, OnInit, TemplateRef } from "@angular/core";
import { ReservationService } from "../service/reservation.service";
import {
  Seat,
  Class,
  SeatLayout,
  SelectedSeatLayout,
  SelectedClass,
} from "../model/seat-layout";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { ShowService } from "../../dashboard/service/show.service";
import { ModalService } from "src/app/_core/service/modal.service";
import { Router } from "@angular/router";
import { ShowTimeService } from "../../shows/service/show-time.service";
import { filter } from "rxjs/operators";
import { Show } from "../../shows/model/show";
import { PaymentService } from "../service/payment.service";

@Component({
  selector: "mp-seat-layout",
  templateUrl: "./seat-layout.component.html",
  styleUrls: ["./seat-layout.component.scss"],
})
export class SeatLayoutComponent implements OnInit {
  movieTrailerUrl: SafeResourceUrl;
  city: string;
  showPublishedId: number;
  movieId: number;
  showTime: string;
  screenId: number;
  selectedDate: string;
  posterUrl: string;
  seatLayout: SeatLayout;
  venueShows: Show[];
  selectedSeats = new Array<Seat>();
  selectedSeatCount: number;
  originalSeatCount: number;
  showProceed = false;
  classPublishedId: number;
  classId: number;
  seatselect = false;
  venueName: string;
  venueId: number;
  movieName: string;
  seatCount: number;

  constructor(
    public reservationService: ReservationService,
    public sanitizer: DomSanitizer,
    private modalservice: ModalService,
    private router: Router,
    private showService: ShowService,
    public showTimeService: ShowTimeService,
    public paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.movieName = this.showService.booking.movieName;
    this.movieId = this.showService.booking.movieId;
    this.venueName = this.showService.booking.venueName;
    this.posterUrl = this.showService.booking.posterUrl;
    this.city = this.showService.booking.city;
    this.showPublishedId = this.showService.booking.showPublishedId;

    this.seatCount = this.showService.booking.seatCount;
    this.originalSeatCount = this.seatCount;
    this.showTime = this.showService.booking.showTime;
    this.selectedDate = this.showService.booking.showDate;
    this.venueId = this.showService.booking.venueId;
    this.getShowDates(this.movieId, this.city);
    this.getMovieShowTimes(this.selectedDate);
    this.getSeatLayout();
    this.reservationService.seatlayout.subscribe((layout) => {
      this.seatLayout = layout;
    });
    this.movieTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.showService.booking.trailerUrl
    );
  }

  async getSeatLayout() {
    await this.reservationService.seatingRepresentation(
      this.showPublishedId,
      this.city
    );
  }
  async getShowDates(movieId: number, city: string) {
    await this.showTimeService.getMovieShowDates(movieId, city);
  }

  async getMovieShowTimes(showDate: string) {
    this.selectedDate = showDate;
    await this.showTimeService.getMovieShowTime(
      this.movieId,
      this.city,
      showDate
    );
    this.showTimeService.venues
      .pipe(
        filter((venues) =>
          venues.some((venue) => venue.venueId === this.venueId)
        )
      )
      .subscribe((venues) => {
        this.venueShows = venues[0].shows;
        this.selectedSeatCount = 0;
      });
  }

  onShowTimeSelection(show: any) {
    this.showService.booking.showPublishedId = show.showPublishedId;
    this.showTime = show.showTime;
    this.showService.booking.showTime = show.showTime;
    this.reservationService.seatingRepresentation(
      show.showPublishedId,
      this.city
    );
  }

  selectSeat(seats: Array<Seat>, cls: Class, selectedSeatindex: number) {
    this.classPublishedId = cls.classPublishedId;
    this.classId = cls.classId;
    this.selectedSeatCount = this.selectedSeats.length;
    let numberOfSeatsToBook =
      this.originalSeatCount - this.selectedSeatCount == 0
        ? this.originalSeatCount
        : this.originalSeatCount - this.selectedSeatCount;

    if (this.originalSeatCount === this.selectedSeats.length) {
      this.clearSelectedSeats();
    }

    for (
      let i = selectedSeatindex;
      i < selectedSeatindex + numberOfSeatsToBook;
      i++
    ) {
      const status = seats[i].bookingStatus;
      if (!seats[i].seat || status === "BOOKED" || status === "BLOCKED") return;
      this.selectSeatInSequance(seats[i]);
    }
  }

  selectSeatInSequance(seat: Seat) {
    if (!seat.seat) {
      return;
    }
    seat.selectedstatus_ui = 1;
    this.selectedSeats.push(seat);
    this.showProceed = this.selectedSeats.length === this.originalSeatCount;
    this.seatselect = true;
  }

  clearSelectedSeats() {
    this.selectedSeats = new Array<Seat>();
    this.seatLayout.classes.forEach((cls) => {
      cls.labels.forEach((row) => {
        row.seats.forEach((seat) => {
          seat.selectedstatus_ui = 0;
        });
      });
    });
  }

  proceed() {
    let seclectedSeats = new SelectedClass(
      this.classPublishedId,
      this.selectedSeats
    );
    this.showService.booking.classPublishedId = this.classPublishedId;
    this.showService.booking.classId = this.classId;
    let selectedSeatLayout = new SelectedSeatLayout(seclectedSeats);
    this.showService.booking.seat_layout = selectedSeatLayout;
    this.paymentService.getFareDetail();
    this.router.navigate(["/summary"]);
  }

  openSeatCountModal(seatselection: TemplateRef<any>) {
    this.modalservice.show(seatselection);
  }
  onSeatLayout(count: number) {
    this.clearSelectedSeats();
    this.seatCount = count;
    this.originalSeatCount = count;
    this.selectedSeatCount = count;
    this.seatselect = false;
    this.modalservice.hide();
    this.router.navigate(["/booking"]);
  }

  setSeatCount(count: number) {
    this.clearSelectedSeats();
    this.seatCount = count;
    this.seatselect = false;
  }
  close() {
    this.modalservice.hide();
    this.setSeatCount(2);
  }
}
