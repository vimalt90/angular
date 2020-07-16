import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LocationRoutingModule } from "./location-routing.module";
import { ViewLocationsComponent } from "./view-locations/view-locations.component";

@NgModule({
  declarations: [ViewLocationsComponent],
  imports: [
    CommonModule,
    LocationRoutingModule
  ]
})
export class LocationModule { }
