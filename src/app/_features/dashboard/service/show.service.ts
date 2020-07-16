import { Injectable } from "@angular/core";
import { RequestHeader } from "src/app/_core/model/request-header";
import { RestApiService } from "src/app/_core/service/rest-api.service";
import { EndpointsConfig } from "src/app/_config/endpoints.config";
import { ReplaySubject, Observable } from "rxjs";
import { LogService } from "src/app/_core/log/log.service";
import { Booking } from "../../booking/model/booking";
import { Store } from "@ngxs/store";
import {
  AddMovie,
  DeleteMovies,
} from "src/app/_shared/movie/store/movie-action";
import { IMovie } from "src/app/_features/shows/model/movie";
import { Movie } from "../../shows/model/movie";
import { MovieStateService } from "src/app/_shared/movie/service/movie-state.service";

@Injectable({
  providedIn: "root",
})
export class ShowService {
  booking: Booking;

  public movies$: Observable<IMovie[]>;

  upcoming = new ReplaySubject(1);
  isErrorNowshowingMovies = false;
  isErrorUpcomingMovies = false;

  constructor(
    private restService: RestApiService,
    private logService: LogService,
    private store: Store,
    public movieStateService: MovieStateService
  ) {}

  setBooking(booking: Booking) {
    this.booking = booking;
  }

  async getNowShowingMovies(city: string) {
    const reqest = { city: city, header: new RequestHeader() };

    this.restService.post(EndpointsConfig.show.nowshowing, reqest).subscribe({
      next: (response) => {
        if (
          response.status.statusCode === "2001" ||
          response.status.statusCode === "1002"
        ) {
          this.store.dispatch(new DeleteMovies());
          response.nowShowingMovies.forEach((movie: Movie) => {
            this.store.dispatch(new AddMovie(movie));
          });
        } else {
          this.isErrorNowshowingMovies = true;
          this.logService.error(
            "~NowShowingComponent~getNowhowingMovies~getNowhowingMovies failed response code " +
              response.status.statusCode +
              "description" +
              response.status.statusDescription
          );
        }
      },
      error: (err) => {
        this.isErrorNowshowingMovies = true;
        this.logService.error(
          "~NowShowingComponent~getNowhowingMovies~getNowhowingMovies fetech error" +
            err
        );
      },
      complete: () => {
        this.movies$ = this.movieStateService.getNowShowingMovies();
      },
    });
  }

  private sortMovies() {}
  // Get Upcoming Movies
  getUpcomingMovies() {
    this.restService
      .post(EndpointsConfig.show.upcoming, {
        header: new RequestHeader(),
      })
      .subscribe({
        next: (response) => {
          if (response.status.statusCode === "1001") {
            this.upcoming.next(response);
          } else {
            this.isErrorUpcomingMovies = true;
            this.logService.error(
              "~UpComingComponent~getUpcomingMovies~getUpcomingMovies failed response code " +
                response.status.statusCode +
                "description" +
                response.status.statusDescription
            );
          }
        },
        error: (err) => {
          this.isErrorUpcomingMovies = true;
          this.logService.error(
            "~UpComingComponent~getUpcomingMovies~getUpcomingMovies fetech error" +
              err
          );
        },
      });
  }
}
