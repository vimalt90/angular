import { Injectable } from "@angular/core";
import { RequestHeader } from "src/app/_core/model/request-header";
import { RestApiService } from "src/app/_core/service/rest-api.service";
import { EndpointsConfig } from "src/app/_config/endpoints.config";
import { ReplaySubject } from "rxjs";
import { LogService } from "src/app/_core/log/log.service";
import { ShowService } from "../../dashboard/service/show.service";
import { SeatLayout } from "../model/seat-layout";

@Injectable({
  providedIn: "root",
})
export class ReservationService {
  seatlayout = new ReplaySubject<SeatLayout>(1);
  blockedSeates = new ReplaySubject(1);
  isErroFetchingSeatLayout = false;
  isErroFetchingBlockSeats = false;
  ticket = new ReplaySubject(1);

  constructor(
    private restService: RestApiService,
    private logService: LogService,
    public showService: ShowService
  ) {}

  async seatingRepresentation(showDetailsId: number, location: string) {
    const seatRequest = {
      // tslint:disable-next-line: object-literal-shorthand
      showDetailsId: showDetailsId,
      // tslint:disable-next-line: object-literal-shorthand
      location: location,
      header: new RequestHeader(),
    };

    this.restService
      .post(EndpointsConfig.booking.seatlayout, seatRequest)
      .subscribe({
        next: (response) => {
          if (response.status.statusCode === "1001") {
            this.seatlayout.next(response.seat_layout);
          } else {
            this.isErroFetchingSeatLayout = true;
            this.logService.info(
              "~ReservationService~seatingRepresentation::seat layout failes post method" +
                response.status.statusCode +
                "description" +
                response.status.statusDescription
            );
          }
        },
        error: (err) => {
          this.isErroFetchingSeatLayout = true;
          this.logService.error(
            "~ReservationService`~SeatLayoutComponent~seatingRepresentation~locaiton fetech error" +
              err
          );
        },
      });
  }
  getTicketDetails(bookingId: string, bookingReferenceId: string) {
    const ticketDetailsRequest = {
      bookingId: bookingId,
      bookingReferenceId: bookingReferenceId,
      location: this.showService.booking.city,
      header: new RequestHeader(),
    };
    this.restService
      .post(EndpointsConfig.booking.getticketdetails, ticketDetailsRequest)
      .subscribe({
        next: (response) => {
          if (response.status.statusCode === "1001") {
            this.ticket.next(response);
          } else {
            this.logService.info(
              "~ReservationService~getTicket::tiket gets failes post method" +
                response.status.statusCode +
                "description" +
                response.status.statusDescription
            );
          }
        },
        error: (err) => {
          this.logService.error(
            "~PaymentComponent~getPaymentDetail~payment fetech error" + err
          );
        },
      });
  }
}
