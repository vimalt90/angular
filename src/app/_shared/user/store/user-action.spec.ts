import { AddUser } from "./user-action";
import { User } from "../model/user";

describe("UserAction", () => {
  it("should create an instance", () => {
    expect(new AddUser(new User())).toBeTruthy();
  });
});
