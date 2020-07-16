import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { RestApiService } from "src/app/_core/service/rest-api.service";
import { LogService } from "src/app/_core/log/log.service";
import { EndpointsConfig } from "src/app/_config/endpoints.config";
import { User } from "src/app/_shared/user/model/user";
import { RequestHeader } from "src/app/_core/model/request-header";
import { UserService } from "src/app/_shared/user/service/user.service";
import { TokenStorage } from "src/app/_core/guard/token-storage";
import { FormGroup, FormControl } from "@angular/forms";
@Injectable({
  providedIn: "root",
})
export class ProfileService {
  bookingHistory = new ReplaySubject(1);
  user = new ReplaySubject<User>(1);

  isErrorFetchingprofile = false;
  isErrorUpdateProfile = false;
  isErrorBooking = false;
  isErrorCancelHistory = false;
  firstName: string;

  constructor(
    private restService: RestApiService,
    // tslint:disable-next-line: align
    private token: TokenStorage,
    // tslint:disable-next-line: align
    private logService: LogService,
    private userService: UserService
  ) {}

  getProfile(user: User): any {
    this.restService
      .post(EndpointsConfig.profile.retrieve, {
        header: new RequestHeader(),
      })
      .subscribe({
        next: (response) => {
          if (response.status.statusCode === "2001") {
            user = response;
            this.userService.update(user);
            this.user.next(user);
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

  updateProfile(user: User): any {
    user.header = new RequestHeader();

    this.restService.post(EndpointsConfig.profile.update, user).subscribe({
      next: (response) => {
        if (response.status.statusCode === "2001") {
          this.userService.update(user);
          this.logService.info(
            "~ProfileComponent~~ updateprofile~~updateprofile successfully"
          );
        } else {
          this.isErrorUpdateProfile = true;
          this.logService.error(
            "~EditProfileComponent~updateProfile~updateProfile retrival failed response code " +
              response.status.statusCode +
              "description" +
              response.status.statusDescription
          );
        }
      },
      error: (err) => {
        this.isErrorUpdateProfile = true;
        this.logService.error(
          "~EditProfileComponent~updateProfile~updateProfile fetech error" + err
        );
      },
    });
  }

  // history
  getBookingHistory(city: string) {
    const request = { location: city, header: new RequestHeader() };
    this.restService
      .post(EndpointsConfig.profile.bookinghistory, request)
      .subscribe({
        next: (response) => {
          if (response.status.statusCode === "1001") {
            this.bookingHistory.next(response);
            this.logService.info(
              "~HistoryComponent~getBookingHistory~getBookingHistory successfully"
            );
          } else {
            this.isErrorBooking = true;
            this.logService.error(
              "~HistoryComponent~getBookingHistory~bookinghistory failed response code " +
                response.status.statusCode +
                "description" +
                response.status.statusDescription
            );
          }
        },
        error: (err) => {
          this.isErrorBooking = true;
          this.logService.error(
            "~HistoryComponent~getBookingHistory~bookinghistory fetech error" +
              err
          );
        },
      });
  }

  cancelBooking(bookingId: string) {
    const request = { booking_id: bookingId, header: new RequestHeader() };
    this.restService
      .post(EndpointsConfig.profile.cancelbooking, request)
      .subscribe({
        next: (response) => {
          if (
            response.status.statusCode === "1001" ||
            response.status.statusCode === "1002"
          ) {
            this.logService.info(
              "~HistoryComponent~cancelBooking~cancelbooking successfully"
            );
          } else {
            this.isErrorCancelHistory = true;
            this.logService.error(
              "~HistoryComponent~cancelBooking~cancelbooking failed response code " +
                response.status.statusCode +
                "description" +
                response.status.statusDescription
            );
          }
        },
        error: (err) => {
          this.isErrorCancelHistory = true;
          this.logService.error(
            "~HistoryComponent~cancelBooking~cancelbooking fetech error" + err
          );
        },
      });
  }
}
