import { Component, OnInit, OnDestroy } from "@angular/core";
import { ShowService } from "../service/show.service";
import { Booking } from "../../booking/model/booking";
import { Router } from "@angular/router";
import { MovieState } from "src/app/_shared/movie/store/movie-state";
import { IMovie } from "../../shows/model/movie";
import { Observable } from "rxjs";
import { Select, Store } from "@ngxs/store";
import { MovieStateService } from "src/app/_shared/movie/service/movie-state.service";

@Component({
  selector: "mp-now-showing",
  templateUrl: "./now-showing.component.html",
  styleUrls: ["./now-showing.component.scss"],
})
export class NowShowingComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {}

  constructor(public showService: ShowService, private router: Router) {}

  ngOnInit(): void {
    this.getMovies();
  }

  async getMovies() {
    await this.showService.getNowShowingMovies("Chennai");
  }
  onMovieSelect(movie: any) {
    const booking = new Booking();
    Object.assign(booking, movie);
    booking.city = "Chennai";
    this.showService.setBooking(booking);
    this.router.navigate(["/shows"]);
  }
}
