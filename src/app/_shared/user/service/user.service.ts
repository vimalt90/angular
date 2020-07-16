import { Injectable } from "@angular/core";
import { Dispatch } from "@ngxs-labs/dispatch-decorator";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { UserState } from "../store/user-state";
import { User } from "../model/user";
import { AddUser, DeleteUser, UpdateUser } from "../store/user-action";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor() {}
  @Select(UserState)
  public user$: Observable<User[]>;

  @Dispatch()
  public add(user: User) {
    return new AddUser(user);
  }

  @Dispatch()
  public delete(userId: string) {
    return new DeleteUser(userId);
  }
  @Dispatch()
  public update(user: User) {
    return new UpdateUser(user);
  }
}
