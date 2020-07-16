import { Component, OnInit, TemplateRef } from "@angular/core";
import { ModalService } from "src/app/_core/service/modal.service";
import { Router } from "@angular/router";
import { ShowTimeService } from "../service/show-time.service";
import { ShowService } from "../../dashboard/service/show.service";

@Component({
  selector: "mp-seatcount",
  templateUrl: "./seat-count.component.html",
  styleUrls: ["./seat-count.component.scss"],
})
export class SeatCountComponent implements OnInit {
  seatCount: number;
  showClass: any;
  // tslint:disable-next-line: max-line-length
  constructor(private modalservice: ModalService, private router: Router, public shows: ShowTimeService, public showService: ShowService) { }

  ngOnInit(): void {
    this.setSeatCount(2);
  }

  openLogin(template: TemplateRef<any>) {
    this.modalservice.show(template);
  }
  close() {
    this.modalservice.hide();
    this.setSeatCount(2);
  }
  // To get BaseFare of Claasses According to the venue
  getBaseFare(showClass: any) {
    this.showClass = showClass;
  }
  setSeatCount(count: number) {
    this.seatCount = count;
    this.showService.booking.seatCount = count;
  }
  onSeatLayout() {
    this.router.navigate(["/booking"]);
    this.modalservice.hide();
  }
}
