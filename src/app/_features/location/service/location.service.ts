import { Injectable } from "@angular/core";
import { RestApiService } from "src/app/_core/service/rest-api.service";
import { EndpointsConfig } from "src/app/_config/endpoints.config";
import { RequestHeader } from "src/app/_core/model/request-header";
import { ReplaySubject } from "rxjs";
import { LogService } from "src/app/_core/log/log.service";

@Injectable({
  providedIn: "root",
})
export class LocationService {
  location = new ReplaySubject(1);
  isErrorFetchingLocation = false;
  constructor(
    private restService: RestApiService,
    private logService: LogService
  ) { }

  getAllLocation() {
    this.restService
      .post(EndpointsConfig.location.viewlocation, {
        header: new RequestHeader(),
      })
      .subscribe({
        next: (response) => {
          if (response.status.statusCode === 1001) {
            this.location.next(response);
          } else {
            this.isErrorFetchingLocation = true;
            this.logService.error(
              "~LocationComponent~getlocation~locaiton retrival failed response code " +
              response.status.statusCode +
              "description" +
              response.status.statusDescription
            );
          }
        },
        error: (err) => {
          this.isErrorFetchingLocation = true;
          this.logService.error(
            "~LocationComponent~getlocation~locaiton fetech error" + err
          );
        },
      });
  }
}
