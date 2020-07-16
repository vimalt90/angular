import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { EndpointsConfig } from "src/app/_config/endpoints.config";
import { RestApiService } from "src/app/_core/service/rest-api.service";
import { LogService } from "src/app/_core/log/log.service";
import { RequestHeader } from "src/app/_core/model/request-header";
import { map } from "rxjs/operators";
import { ShowDate } from "../model/show-date";
import { DatePipe } from "@angular/common";
import { Venue } from "../model/venue";

@Injectable({
  providedIn: "root",
})
export class ShowTimeService {
  movieShowDates = new ReplaySubject<ShowDate>(1);
  venueShowDates = new ReplaySubject(1);
  venues = new ReplaySubject<Venue[]>(1);
  movies = new ReplaySubject(1);

  isErrorMovieShowDate = false;
  isErrorVenueShowDate = false;
  isErrorMovieShowTime = false;
  isErrorVenueShowTime = false;
  // tslint:disable-next-line: no-inferrable-types
  public activeElement: string = "nodate";
  constructor(
    private restService: RestApiService,
    private logService: LogService,
    private datePipe: DatePipe
  ) {}

  async getMovieShowDates(movieId: number, city: string) {
    this.restService
      .post(EndpointsConfig.movie.showdate, {
        movie_id: movieId,
        // tslint:disable-next-line: object-literal-shorthand
        city: city,
        header: new RequestHeader(),
      })
      .pipe(
        map((response) => {
          if (response.status.statusCode === "5001") {
            return response.showDate;
          } else {
            this.isErrorMovieShowDate = true;
            this.logService.error(
              "getMovieShowDates failed response code " +
                response.status.statusCode +
                "description" +
                response.status.statusDescription
            );
          }
        }),
        map((showDates) =>
          showDates.map((showDate) => {
            return this.formatShowDate(new ShowDate(showDate));
          })
        )
      )
      .subscribe((showDates) => this.movieShowDates.next(showDates));
  }

  // activedate
  //  if (showDate !== undefined) {

  //   if (this.activeElement === "nodate") {
  //     this.activeElement = showDate[0].showDate;
  //   } else if (this.activeElement !== "nodate") {
  //     this.activeElement = JSON.parse(localStorage.getItem("selectedDates"));
  //   }
  // }

  getVenueShowDates(venueId: number, city: string) {
    this.restService
      .post(EndpointsConfig.venue.showdate, {
        venue_id: venueId,
        // tslint:disable-next-line: object-literal-shorthand
        city: city,
        header: new RequestHeader(),
      })
      .pipe(
        map((response) => {
          if (response.status.statusCode === "6001") {
            return response.showDate;
          } else {
            this.isErrorVenueShowDate = true;
            this.logService.error(
              "getVenueShowDates failed response code " +
                response.status.statusCode +
                "description" +
                response.status.statusDescription
            );
          }
        }),
        map((showDates) =>
          showDates.map((showDate) => {
            return this.formatShowDate(new ShowDate(showDate));
          })
        )
      )
      .subscribe((showDates) => this.venueShowDates.next(showDates));
  }

  private formatShowDate(show: ShowDate): ShowDate {
    const showDate = show.showDate;
    const currentDate = new Date();
    const nextDate = new Date();
    nextDate.setDate(new Date().getDate() + 1);

    const today = this.datePipe.transform(currentDate, "dd-MMM-yyyy");
    const tomorrow = this.datePipe.transform(nextDate, "dd-MMM-yyyy");
    const showDay = this.datePipe.transform(showDate, "dd-MMM-yyyy");

    const nextDates = new Date();
    nextDates.setDate(nextDates.getDate() + 1);

    if (showDay === today) {
      show.day = "TODAY";
    } else if (showDay === tomorrow) {
      show.day = "TOM";
    }
    return show;
  }

  getMovieShowTime(movieId: number, city: string, showDate: string) {
    this.restService
      .post(EndpointsConfig.movie.showtime, {
        movie_id: movieId,
        // tslint:disable-next-line: object-literal-shorthand
        city: city,
        // tslint:disable-next-line: object-literal-shorthand
        showDate: showDate,
        header: new RequestHeader(),
      })
      .subscribe({
        next: (response) => {
          if (response.status.statusCode === "2001") {
            this.venues.next(response.movie.venues);
          } else if (response.status.statusCode === "3004") {
            this.venues.next(undefined);
          } else {
            this.isErrorMovieShowTime = true;
            this.logService.error(
              "venues failed response code " +
                response.status.statusCode +
                "description" +
                response.status.statusDescription
            );
          }
        },
        error: (err) => {
          this.isErrorMovieShowTime = true;
          this.logService.error("venues fetech error" + err);
        },
      });
  }

  getVenueShowTime(venueId: number, city: string, showDate: string) {
    this.restService
      .post(EndpointsConfig.venue.showtime, {
        venue_id: venueId,
        // tslint:disable-next-line: object-literal-shorthand
        city: city,
        // tslint:disable-next-line: object-literal-shorthand
        showDate: showDate,
        header: new RequestHeader(),
      })
      .subscribe({
        next: (response) => {
          if (response.status.statusCode === "3001") {
            this.movies.next(response.venue.movies);
          } else {
            this.isErrorVenueShowTime = true;
            this.logService.error(
              "getVenueShowTime failed response code " +
                response.status.statusCode +
                "description" +
                response.status.statusDescription
            );
          }
        },
        error: (err) => {
          this.isErrorVenueShowTime = true;
          this.logService.error("getVenueShowTime fetech error" + err);
        },
      });
  }
}
