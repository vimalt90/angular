import { Injectable } from "@angular/core";
import { MovieState } from "../store/movie-state";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { IMovie, Movie } from "src/app/_features/shows/model/movie";
import { filter } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class MovieStateService {
  constructor(private store: Store) {}

  getNowShowingMovies(): Observable<IMovie[]> {
    return this.store.select((state) => state.movies);
  }
  getMovie(movieId: number): Observable<IMovie> {
    return this.store.select((state) =>
      state.movies.filter((movie: Movie) => movie.movieId === movieId)
    );
  }
}
