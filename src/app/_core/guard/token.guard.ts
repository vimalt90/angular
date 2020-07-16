import { Injectable, OnDestroy } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Router } from "@angular/router";
import { EndpointsConfig } from "src/app/_config/endpoints.config";
import { TokenStorage } from "./token-storage";
import { RestApiService } from "../service/rest-api.service";
import { CommonConstants } from "../constants/common-constants.enum";
import { RequestHeader } from "../model/request-header";
import { UserService } from "src/app/_shared/user/service/user.service";
import { User } from "src/app/_shared/user/model/user";

@Injectable()
export class TokenGuard implements CanActivate {
  success = false;
  constructor(
    private router: Router,
    private restService: RestApiService,
    private token: TokenStorage,
    private userService: UserService
  ) {}

  canActivate() {
    if (this.token.getToken()) {
      return true;
    } else {
      const user = new User();
      user.passCode = "";
      user.userId = CommonConstants.GUEST_USER;
      user.header = new RequestHeader();
      this.restService
        .post(EndpointsConfig.user.login, user)
        .subscribe((response) => {
          if (response.status.statusCode === "1001") {
            this.token.saveToken(response.token, response.token);
            this.userService.delete(user.userId);
            this.userService.add(user);
            this.router.navigate(["/"]);
            return true;
          } else if (response.status.statusCode === "3001") {
            return false;
          }
        });
    }
    return false;
  }
}
