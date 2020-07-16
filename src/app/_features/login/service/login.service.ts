import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { EndpointsConfig } from "src/app/_config/endpoints.config";
import { RestApiService } from "src/app/_core/service/rest-api.service";
import { TokenStorage } from "src/app/_core/guard/token-storage";
import { LogService } from "src/app/_core/log/log.service";
import { RequestHeader } from "src/app/_core/model/request-header";
import { User } from "src/app/_shared/user/model/user";
import { UserService } from "src/app/_shared/user/service/user.service";
import { CommonConstants } from "src/app/_core/constants/common-constants.enum";
import { ProfileService } from "../../profile/service/profile.service";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  success = false;
  registrationSuccess = false;
  socialLoginIn = false;
  // user: User = new User();
  login = new ReplaySubject(1);
  registers = new ReplaySubject(1);
  loginOtpsuccess = new ReplaySubject(1);
  varificationotp = new ReplaySubject(1);
  isErrorLoginOtp = false;
  isErrorVerificationOtp = false;
  isErrorFetchingprofile = false;

  constructor(
    private restService: RestApiService,
    private token: TokenStorage,
    private logService: LogService,
    private userService: UserService,
    private profileService: ProfileService
  ) {}

  logIn(user: User): any {
    // this.logService.info("log in");
    // this.user = user;
    user.header = new RequestHeader();
    this.restService.post(EndpointsConfig.user.login, user).subscribe({
      next: (response) => {
        this.token.saveToken(response.token, response.refreshToken);
        this.login.next(response);
        if (
          response.status.statusCode === "1001" ||
          response.status.statusCode === "3001" ||
          response.status.statusCode === "3002"
        ) {
          this.success = true;
          this.userService.delete(CommonConstants.GUEST_USER);
          this.profileService.getProfile(user);
        } else {
          this.success = true;
          this.logService.error(
            "~LoginComponent~logIn~logIn failed response code " +
              response.status.statusCode +
              "description" +
              response.status.statusDescription
          );
        }
      },
      error: (err) => {
        this.success = true;
        this.logService.error("~LoginComponent~logIn~logIn fetech error" + err);
      },
    });
  }

  register(user: User): any {
    // this.logService.info("log in");
    // this.user = user;
    user.header = new RequestHeader();
    this.restService.post(EndpointsConfig.user.register, user).subscribe({
      next: (response) => {
        this.token.saveToken(response.token, response.refreshToken);
        this.registers.next(response);
        if (response.status.statusCode === "2001") {
          this.registrationSuccess = true;
          this.userService.add(user);
        } else {
          this.logService.error(
            "~LoginComponent~register~register failed response code " +
              response.status.statusCode +
              "description" +
              response.status.statusDescription
          );
        }
      },
      error: (err) => {
        this.logService.error(
          "~LoginComponent~register~register fetech error" + err
        );
      },
      complete: () => {
        if (this.registrationSuccess) {
          this.logIn(user);
        }
      },
    });
  }

  socialLogin(user: User): any {
    // this.user = user;
    user.header = new RequestHeader();
    this.restService
      .post(EndpointsConfig.user.socialRegistration, user)
      .subscribe({
        next: (response) => {
          this.token.saveToken(response.token, response.refreshToken);
          this.login.next(response);
          if (response.status.statusCode === "2001") {
            this.socialLoginIn = true;
            this.userService.add(user);
          } else {
            this.logService.error(
              "~LoginComponent~socialLogin~socialLogin failed response code " +
                response.status.statusCode +
                "description" +
                response.status.statusDescription
            );
          }
        },
        error: (err) => {
          this.logService.error(
            "~LoginComponent~socialLogin~socialLogin fetech error" + err
          );
        },
        complete: () => {
          if (this.socialLoginIn) {
            this.logIn(user);
          }
        },
      });
  }
  intiateOtp(phoneNumber: string): any {
    const request = {
      // tslint:disable-next-line: object-literal-shorthand
      phoneNumber: phoneNumber,
      header: new RequestHeader(),
    };

    this.restService.post(EndpointsConfig.user.loginotp, request).subscribe({
      next: (response) => {
        this.token.saveToken(response.token, response.refreshToken);
        if (response.status.statusCode === "2001") {
          this.isErrorLoginOtp = true;
          this.loginOtpsuccess.next(response);
          console.log(response);
        } else {
          this.logService.error(
            "~LoginComponent~loginOtp~loginOtp failed response code " +
              response.status.statusCode +
              "description" +
              response.status.statusDescription
          );
        }
      },
      error: (err) => {
        this.logService.error(
          "~LoginComponent~loginOtp~loginOtp fetech error" + err
        );
      },
    });
  }
  validationOtp(passCode: string, userId: string) {
    const request = {
      // tslint:disable-next-line: object-literal-shorthand
      passCode: passCode,
      // tslint:disable-next-line: object-literal-shorthand
      userId: userId,
      header: new RequestHeader(),
    };
    this.restService.post(EndpointsConfig.user.login, request).subscribe({
      next: (response) => {
        if (
          response.status.statusCode === "1001" ||
          response.status.statusCode === "3002"
        ) {
          this.isErrorVerificationOtp = true;
          this.token.saveToken(response.token, response.refreshToken);
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
      complete: () => {
        this.retriveProfile();
      },
    });
  }

  retriveProfile() {
    console.log("service call");
    const request = {
      header: new RequestHeader(),
    };
    this.restService.post(EndpointsConfig.profile.retrieve, request).subscribe({
      next: (response) => {
        if (response.status.statusCode === "2001") {
          this.token.saveToken(response.token, response.refreshToken);

          console.log(this.token);
          this.userService.add(response);
          console.log(response);
        } else {
          this.isErrorFetchingprofile = true;
          this.logService.error(
            "~EditProfileComponent~getProfile~Profile retrival failed response code " +
              response.status.statusCode +
              "description" +
              response.status.statusDescription
          );
        }
      },
      error: (err) => {
        this.isErrorFetchingprofile = true;
        this.logService.error(
          "~EditProfileComponent~getProfile~profile fetech error" + err
        );
      },
    });
  }
}
