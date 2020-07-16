import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ReservationService } from "../service/reservation.service";
import { ShowService } from "../../dashboard/service/show.service";

@Component({
  selector: "mp-confirmation",
  templateUrl: "./confirmation.component.html",
  styleUrls: ["./confirmation.component.scss"],
})
export class ConfirmationComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public reservationservice: ReservationService,
    public showService: ShowService
  ) {}

  ngOnInit(): void {
    let bookingId = this.route.snapshot.queryParams["bookingId"];
    let bookingReferenceId = this.route.snapshot.queryParams[
      "bookingReferenceId"
    ];
    this.reservationservice.getTicketDetails(bookingId, bookingReferenceId);
  }
}
