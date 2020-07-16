import { State, Action, StateContext, Select } from "@ngxs/store";
import { AddUser, DeleteUser, UpdateUser } from "./user-action";
import { Injectable } from "@angular/core";
import { User } from "../model/user";
@State<User[]>({
  name: "user",
  defaults: [],
})
@Injectable()
export class UserState {
  @Action(AddUser)
  addUser(ctx: StateContext<User[]>, { user }: AddUser) {
    ctx.setState([...ctx.getState(), user]);
  }

  @Action(DeleteUser)
  deleteByUserId(ctx: StateContext<User[]>, { userId }: DeleteUser) {
    ctx.setState(ctx.getState().filter((user: User) => user.userId !== userId));
  }

  @Action(UpdateUser)
  update(ctx: StateContext<User[]>, { user }: UpdateUser) {
    ctx.setState(
      ctx.getState().filter((current: User) => current.userId !== user.userId)
    );
    ctx.setState([...ctx.getState(), user]);
  }
}
