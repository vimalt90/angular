import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SeatLayoutComponent } from "./seat-layout/seat-layout.component";
import { SummaryComponent } from "./summary/summary.component";
import { ConfirmationComponent } from "./confirmation/confirmation.component";
import { BookingRoutingModule } from "./booking-routing.module";
import { SeatCountComponent } from "../shows/seat-count/seat-count.component";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [SeatLayoutComponent, SummaryComponent, ConfirmationComponent],
  imports: [
    CommonModule, BookingRoutingModule,AccordionModule,FormsModule
  ],
  exports: [],
})
export class BookingModule { }
