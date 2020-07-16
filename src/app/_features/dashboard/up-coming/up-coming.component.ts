import { Component, OnInit } from "@angular/core";
import { ShowService } from "../service/show.service";

@Component({
  selector: "mp-up-coming",
  templateUrl: "./up-coming.component.html",
  styleUrls: ["./up-coming.component.scss"],
})
export class UpComingComponent implements OnInit {
  constructor(public showService: ShowService) {}

  ngOnInit(): void {
    this.showService.getUpcomingMovies();
  }
  onMovieSelect(movie: any) {}
}
