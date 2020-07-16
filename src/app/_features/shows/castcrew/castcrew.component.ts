import { Component, OnInit } from "@angular/core";
import { MovieService } from "src/app/_features/shows/service/movie.service";
import { ShowService } from "src/app/_features/dashboard/service/show.service";
import { ModalService } from "src/app/_core/service/modal.service";

@Component({
  selector: "mp-castcrew",
  templateUrl: "./castcrew.component.html",
  styleUrls: ["./castcrew.component.scss"],
})
export class CastcrewComponent implements OnInit {
  movieId: number;

  constructor(
    public movieService: MovieService,
    public showService: ShowService,
    // tslint:disable-next-line: align
    private modalservice: ModalService
  ) {}

  ngOnInit(): void {
    this.movieId = this.showService.booking.movieId;
    this.movieService.getMovie(this.movieId);
  }
  close() {
    this.modalservice.hide();
  }
}
