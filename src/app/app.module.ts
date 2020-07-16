import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "./_core/core.module";
import { SharedModule } from "./_shared/shared.module";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { DatePipe } from "@angular/common";
import { AccordionModule } from "ngx-bootstrap/accordion";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    FormsModule,
    AccordionModule.forRoot(),

    ReactiveFormsModule,
    CarouselModule.forRoot(),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  exports: [DatePipe],
})
export class AppModule {}
