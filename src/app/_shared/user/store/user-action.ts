import { User } from "../model/user";

export class AddUser {
  public static readonly type = "[AddUser] action";
  constructor(public user: User) {}
}

export class DeleteUser {
  public static readonly type = "[DeleteUser] action";
  constructor(public userId: string) {}
}
export class UpdateUser {
  public static readonly type = "[UpdateUser] action";
  constructor(public user: User) {}
}
