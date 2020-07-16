import { Injectable } from "@angular/core";
import { RestApiService } from "src/app/_core/service/rest-api.service";
import { LogService } from "src/app/_core/log/log.service";
import { EndpointsConfig } from "src/app/_config/endpoints.config";
import { RequestHeader } from "src/app/_core/model/request-header";
import { Movie } from "../model/movie";
import { CastCrew } from "../model/cast-crew";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MovieService {
  isErrorFetchingMovieDeatils = false;
  isErrorFetchingCastAndCrew = false;

  movie = new BehaviorSubject(new Movie());
  castCrew = new BehaviorSubject(new CastCrew());

  constructor(
    private restService: RestApiService,
    private logService: LogService
  ) {}

  getMovie(movieid: number) {
    this.restService
      .post(EndpointsConfig.moviedetails.movietrailer, {
        movieId: movieid,
        header: new RequestHeader(),
      })
      .subscribe({
        next: (response) => {
          if (response.status.statusCode === "1001") {
            this.movie.next(response.movie);
          } else {
            this.isErrorFetchingMovieDeatils = true;
            this.logService.error(
              "~MovieNameComponent~getMovieDetails~movie retrival failed response code " +
                response.status.statusCode +
                "description" +
                response.status.statusDescription
            );
          }
        },
        error: (err) => {
          this.isErrorFetchingMovieDeatils = true;
          this.logService.error(
            "~MovieNameComponent~getMovieDetails~movie retrival failed response code " +
              err
          );
        },
      });
  }

  getCastAndCrew(movieid: number) {
    this.restService
      .post(EndpointsConfig.moviedetails.castandcrew, {
        movieId: movieid,
        header: new RequestHeader(),
      })
      .subscribe({
        next: (response) => {
          if (response.status.statusCode === "1001") {
            this.castCrew.next(response.castcrew);
          } else {
            this.isErrorFetchingCastAndCrew = true;
            this.logService.error(
              "~MovieNameComponent~CastandCrew~movie retrival failed response code " +
                response.status.statusCode +
                "description" +
                response.status.statusDescription
            );
          }
        },
        error: (err) => {
          this.isErrorFetchingCastAndCrew = true;
          this.logService.error(
            "~MovieNameComponent~CastandCrew~movie retrival failed response code " +
              err
          );
        },
      });
  }
}
