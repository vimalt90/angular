import { State, Action, StateContext } from "@ngxs/store";
import { AddMovie, DeleteMovie, DeleteMovies } from "./movie-action";
import { IMovie } from "src/app/_features/shows/model/movie";
import { Injectable } from "@angular/core";

//Giving our state a model

@State<IMovie[]>({
  name: "movies",
  // defaults is optional
  defaults: [],
})
@Injectable()
export class MovieState {
  // Add contact action
  @Action(AddMovie)
  add({ getState, setState }: StateContext<IMovie[]>, { movie }: AddMovie) {
    setState([...getState(), movie]);
  }

  // Delete contact action
  @Action(DeleteMovie)
  delete(
    { getState, setState }: StateContext<IMovie[]>,
    { index }: DeleteMovie
  ) {
    setState(getState().filter((movie, i) => i !== index));
  }
  @Action(DeleteMovies)
  deleteAll({ getState, setState }: StateContext<IMovie[]>, {}: DeleteMovies) {
    let state = getState();
    setState((state = [] as IMovie[]));
  }
}
