import { Injectable } from "@angular/core";
import { User } from "src/app/_shared/user/model/user";
import { RestApiService } from "src/app/_core/service/rest-api.service";
import { LogService } from "src/app/_core/log/log.service";
import { UserService } from "src/app/_shared/user/service/user.service";
import { RequestHeader } from "src/app/_core/model/request-header";
import { EndpointsConfig } from "src/app/_config/endpoints.config";
import { ReplaySubject } from "rxjs";
import { TokenStorage } from "src/app/_core/guard/token-storage";

@Injectable({
  providedIn: "root"
})
export class LoginotpService {

  user: User;
  loginotp = new ReplaySubject(1);
  varificationotp = new ReplaySubject(1);

  isErrorLoginOtp = false;
  isErrorVerificationOtp = false;

  constructor(private restService: RestApiService,
    // tslint:disable-next-line: align
    private logService: LogService,
    // tslint:disable-next-line: align
    private token: TokenStorage,
    // tslint:disable-next-line: align
    private userService: UserService) { }


  validationOtp(user: User): any {

    this.user = user;
    this.user.header = new RequestHeader();
    this.restService.post(EndpointsConfig.user.validationotp, this.user).subscribe({
      next: (response) => {
        if (response.status.statusCode === "2001" || response.status.statusCode === "3002") {
          this.isErrorVerificationOtp = true;
          this.varificationotp.next(response);
        } else {

          this.logService.error(
            "~LoginComponent~validationOtp~validationOtp failed response code " +
            response.status.statusCode +
            "description" +
            response.status.statusDescription
          );
        }
      },
      error: (err) => {

        this.logService.error(
          "~LoginComponent~validationOtp~validationOtp fetech error" + err
        );
      },

    });

  }

}
