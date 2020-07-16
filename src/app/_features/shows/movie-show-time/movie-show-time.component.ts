import { Component, OnInit, TemplateRef } from "@angular/core";
import { ShowTimeService } from "../service/show-time.service";
import { DatePipe } from "@angular/common";
import { ModalService } from "src/app/_core/service/modal.service";
import { ShowService } from "../../dashboard/service/show.service";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";
import { MovieService } from "../service/movie.service";
import { MovieStateService } from "src/app/_shared/movie/service/movie-state.service";
import { Observable } from "rxjs";
import { IMovie, Movie } from "../model/movie";

@Component({
  selector: "mp-movie",
  templateUrl: "./movie-show-time.component.html",
  styleUrls: ["./movie-show-time.component.scss"],
})
export class MovieShowTimeComponent implements OnInit {
  movie$: Observable<IMovie>;
  movie: Movie;
  seatCount: number;
  showClass: any;
  userComment: boolean;
  movieId: number;
  city: string;
  movieShowTermsUrl: string;
  showDate: string;
  constructor(
    public showsTimeService: ShowTimeService,
    private modalservice: ModalService,
    public showService: ShowService,
    private router: Router,
    public movieService: MovieService,
    public movieStateService: MovieStateService
  ) {}

  ngOnInit(): void {
    this.movieId = this.showService.booking.movieId;
    this.city = this.showService.booking.city;
    this.movie$ = this.movieStateService.getMovie(this.movieId);
    this.getShowDates(this.movieId, this.city);
    if (this.showService.booking.showDate === undefined) {
      this.showsTimeService.movieShowDates
        .pipe(first())
        .subscribe((showDate) => {
          this.getMovieShowTimes(showDate[0]?.showDate);
        });
    } else {
      this.getMovieShowTimes(this.showService.booking.showDate);
    }
    this.movie$.subscribe((movie) => (this.movie = movie[0]));
  }
  async getShowDates(movieId: number, city: string) {
    await this.showsTimeService.getMovieShowDates(movieId, city);
  }
  onVenueSelect(venueId: number, venueName: string) {
    this.showService.booking.venueId = venueId;
    this.showService.booking.venueName = venueName;
    this.router.navigate(["/venues-show-time"]);
  }

  getMovieShowTimes(showDate: string) {
    this.showsTimeService.getMovieShowTime(this.movieId, this.city, showDate);
    this.showService.booking.showDate = showDate;
  }

  openUserReviewModal(userComment: TemplateRef<any>) {
    this.userComment = true;
    this.modalservice.show(userComment);
  }
  closeUserReviewModal() {
    this.modalservice.hide();
  }

  close() {
    this.modalservice.hide();
  }
  openModal(castcrew: TemplateRef<any>) {
    this.modalservice.show(castcrew);
  }
  showMovieDetails(movieId: number) {}

  openSeatCountModal(
    seatselection: TemplateRef<any>,
    venueId: number,
    venueName: string,
    companyId: number,
    showPublishedId: number,
    screenId: number,
    showTime: string
  ) {
    this.showService.booking.venueId = venueId;
    this.showService.booking.venueName = venueName;
    this.showService.booking.companyId = companyId;
    this.showService.booking.showPublishedId = showPublishedId;
    this.showService.booking.screenId = screenId;
    this.showService.booking.showTime = showTime;
    this.modalservice.show(seatselection);
  }
}
