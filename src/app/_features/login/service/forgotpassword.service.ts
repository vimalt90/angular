import { Injectable } from "@angular/core";
import { RestApiService } from "src/app/_core/service/rest-api.service";
import { TokenStorage } from "src/app/_core/guard/token-storage";
import { LogService } from "src/app/_core/log/log.service";
import { UserService } from "src/app/_shared/user/service/user.service";
import { User } from "src/app/_shared/user/model/user";
import { RequestHeader } from "src/app/_core/model/request-header";
import { EndpointsConfig } from "src/app/_config/endpoints.config";
import { ReplaySubject } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class ForgotpasswordService {

  // user: User = new User();

  forgotpassword = new ReplaySubject();
  resetpassword = new ReplaySubject();
  resetPasswordParam: any;

  isErrorPassword = false;
  isErrorResetToken = false;
  isErrorResetPassword = false;
  constructor(private restService: RestApiService,
    // tslint:disable-next-line: align
    private token: TokenStorage,
    // tslint:disable-next-line: align
    private logService: LogService, private route: ActivatedRoute,
    // tslint:disable-next-line: align
    private userService: UserService) { }

  forgotPassword(user: User): any {
    // this.user = user;
    user.header = new RequestHeader();
    this.restService.post(EndpointsConfig.user.forgotpassword, user).subscribe({
      next: (response) => {
        this.token.saveToken(response.token, response.refreshToken);
        this.forgotpassword.next(response);
        if (response.status.statusCode === "2001") {
          this.isErrorPassword = true;
          this.logService.info("~LoginComponent~forgotPassword~forgotPassword successfully");
        } else {

          this.logService.error(
            "~LoginComponent~forgotPassword~forgotPassword failed response code " +
            response.status.statusCode +
            "description" +
            response.status.statusDescription
          );
        }
      },
      error: (err) => {

        this.logService.error(
          "~LoginComponent~forgotPassword~forgotPassword fetech error" + err
        );
      },
    });

  }

  resetpswToken() {
    this.resetPasswordParam = this.route.snapshot.queryParams.token;
    this.token.saveToken(this.resetPasswordParam, this.resetPasswordParam);

    this.restService.post(EndpointsConfig.user.resetpasswordtoken, {
      header: new RequestHeader()
    }).subscribe({
      next: (response) => {
        if (response.status.statusCode === "2001") {
          this.isErrorResetToken = true;
          this.token.saveToken(this.resetPasswordParam, this.resetPasswordParam);

        } else {

          this.logService.error(
            "~LoginComponent~resetpswToken~resetpswToken failed response code " +
            response.status.statusCode +
            "description" +
            response.status.statusDescription
          );
        }
      },
      error: (err) => {

        this.logService.error(
          "~LoginComponent~resetpswToken~resetpswToken fetech error" + err
        );
      },

    });


  }

  resetPassword(user: User): any {
    // this.user = user;
    user.header = new RequestHeader();
    this.restService.post(EndpointsConfig.user.resetpassword, user).subscribe({
      next: (response) => {
        if (response.status.statusCode === "2001") {
          this.isErrorResetPassword = true;
          this.token.saveToken(this.resetPasswordParam, this.resetPasswordParam);

        } else {

          this.logService.error(
            "~LoginComponent~resetPassword~resetPassword failed response code " +
            response.status.statusCode +
            "description" +
            response.status.statusDescription
          );
        }
      },
      error: (err) => {

        this.logService.error(
          "~LoginComponent~resetPassword~resetPassword fetech error" + err
        );
      },

    });

  }



}
