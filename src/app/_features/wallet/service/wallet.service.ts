import { Injectable } from "@angular/core";
import { Subject, ReplaySubject } from "rxjs";
import { RestApiService } from "src/app/_core/service/rest-api.service";
import { EndpointsConfig } from "src/app/_config/endpoints.config";
import { RequestHeader } from "src/app/_core/model/request-header";
import { Order } from "../../booking/model/order";
import { LogService } from "src/app/_core/log/log.service";
import { ShowService } from "../../dashboard/service/show.service";

@Injectable({
  providedIn: "root",
})
export class WalletService {
  walletpayment = new ReplaySubject(1);
  wallet = new ReplaySubject(1);
  isErrorFetchingWallet = false;
  isErrorFetchingConfirmWallet = false;
  constructor(
    private restService: RestApiService,
    private logService: LogService,
    private showService: ShowService
  ) {}

  getWalletDetail(userId: string) {
    const order = new Order();
    Object.assign(this.showService.booking, order);
    this.restService
      .post(EndpointsConfig.booking.getwalletdetails, {
        user_id: userId,
        header: new RequestHeader(),
      })
      .subscribe({
        next: (response) => {
          if (response.status.statusCode === "1001") {
            this.wallet.next(response);
          } else {
            this.isErrorFetchingWallet = true;
            this.logService.error(
              "~WalletComponent~getWalletDetail~wallet retrival failed response code " +
                response.status.statusCode +
                "description" +
                response.status.statusDescription
            );
          }
        },
        error: (err) => {
          this.isErrorFetchingWallet = true;
          this.logService.error(
            "~WalletComponent~getwallet~wallet fetech error" + err
          );
        },
      });
  }

  confirmWallet() {
    const order = new Order();
    this.restService
      .post(EndpointsConfig.booking.walletgateway, order)
      .subscribe({
        next: (response) => {
          this.walletpayment.next(response);
        },
        error: (err) => {
          this.isErrorFetchingConfirmWallet = true;
          this.logService.error(
            "~ConfirmWalletComponent~confirmwallet~wallet fetech error" + err
          );
        },
      });
  }
}
