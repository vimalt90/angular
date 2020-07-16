import { Injectable } from "@angular/core";
import { RestApiService } from "src/app/_core/service/rest-api.service";
import { LogService } from "src/app/_core/log/log.service";
import { EndpointsConfig } from "src/app/_config/endpoints.config";
import { ShowService } from "../../dashboard/service/show.service";
import { ReplaySubject, Observable } from "rxjs";
import { Order } from "../model/order";
import { SelectedSeatLayout } from "../model/seat-layout";
import { Faredetailsrequest } from "../model/fare-details-request";
import { RequestHeader } from "src/app/_core/model/request-header";
import { SeatBlockingRequest } from "../model/seat-blocking-request";
import { PaymentRequest } from "../model/payment-request";

@Injectable({
  providedIn: "root",
})
export class PaymentService {
  payment = new ReplaySubject<Order>(1);
  wallet = new ReplaySubject(1);
  fareDeatils = new ReplaySubject(1);
  paymentModes = new ReplaySubject(1);
  isErrorFetchingPayment = false;
  isErrorFetchingMakeWalletPayment = false;

  constructor(
    private restService: RestApiService,
    private logService: LogService,
    private showService: ShowService
  ) {}

  getPaymentDetail(payment) {
    const paymentReqeust = new PaymentRequest();
    Object.assign(paymentReqeust, this.showService.booking);
    Object.assign(paymentReqeust, payment);
    paymentReqeust.header = new RequestHeader();
    paymentReqeust.showDetailsId = this.showService.booking.showPublishedId;

    this.restService
      .post(EndpointsConfig.booking.payment, paymentReqeust)
      .subscribe({
        next: (response) => {
          if (response.status.statusCode === "1001") {
            this.payment.next(response.paymentDetails);
          } else {
            this.logService.info(
              "~ReservationService~seatingRepresentation::seat layout failes post method" +
                response.status.statusCode +
                "description" +
                response.status.statusDescription
            );
          }
        },
        error: (err) => {
          this.isErrorFetchingPayment = true;
          this.logService.error(
            "~PaymentComponent~getPaymentDetail~payment fetech error" + err
          );
        },
      });
  }

  makeWalletPayment() {
    const order = new Order();
    Object.assign(order, this.showService.booking);
    this.restService
      .post(EndpointsConfig.bookingseatservice.walletpayment, order)
      .subscribe({
        next: (response) => {
          if (
            response.status.statusCode === "1001" ||
            response.status.statusCode === "1003"
          ) {
            this.wallet.next(response);
          } else if (
            response.status.statusCode === "1004" ||
            response.status.statusCode === "1005"
          ) {
            this.wallet.next(response);
          } else {
            this.isErrorFetchingMakeWalletPayment = true;
            this.logService.error(
              "~PaymentComponent~makeWalletPayment~payment retrival failed response code " +
                response.status.statusCode +
                "description" +
                response.status.statusDescription
            );
          }
        },
        error: (err) => {
          this.isErrorFetchingMakeWalletPayment = true;
          this.logService.error(
            "~PaymentComponent~makeWalletPayment~payment retrival failed response code " +
              err
          );
        },
      });
  }
  paymentMode() {
    this.restService.get(EndpointsConfig.booking.paymentMode).subscribe({
      next: (response) => {
        this.paymentModes.next(response);
      },
    });
  }

  getFareDetail() {
    const fareDetailsRequest = new Faredetailsrequest();
    fareDetailsRequest.header = new RequestHeader();
    Object.assign(fareDetailsRequest, this.showService.booking);
    fareDetailsRequest.showDetailsId = this.showService.booking.showPublishedId;

    this.restService
      .post(EndpointsConfig.booking.faredetails, fareDetailsRequest)
      .subscribe({
        next: (response) => {
          if (response.status.statusCode === "1001") {
            this.fareDeatils.next(response);
            // this.showService.booking.orderId = response.orderId;
          } else {
            this.logService.info(
              "~ReservationService~bookingSummaryReserveAndBlock::booking summary failes post method" +
                response.status.statusCode +
                "description" +
                response.status.statusDescription
            );
          }
        },
        error: (err) => {
          this.logService.info(
            "~ReservationService~bookingSummaryReserveAndBlock::booking summary failes post method" +
              err
          );
        },
      });
  }
}
