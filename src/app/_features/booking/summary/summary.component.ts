import { Component, OnInit } from "@angular/core";
import { Order } from "../model/order";
import { PaymentService } from "../service/payment.service";
import { FormGroup } from "@angular/forms";
import { ShowService } from "../../dashboard/service/show.service";
import { Router } from '@angular/router';

@Component({
  selector: "mp-summary",
  templateUrl: "./summary.component.html",
  styleUrls: ["./summary.component.scss"],
})
export class SummaryComponent implements OnInit {
  disablePaymentButton: Boolean = true;
  loginform: FormGroup;
  bookinId: any;
  paymentToken: any;
  location: string;
  movieName: string;
  venueName: string;
  language: string;
  isFirstOpen: boolean = true;
  order = new Order();
  constructor(
    public paymentService: PaymentService,
    public showService: ShowService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.paymentService.paymentMode();
  }

  makePayment(paymentMode: number) {
    this.showService.booking.paymentMode = paymentMode;
    this.order.customerName = this.order.customerEmail;
    this.paymentService.getPaymentDetail(this.order);
    this.paymentService.payment.subscribe((response) => {
      this.order = response;

    });
  }
  
}
