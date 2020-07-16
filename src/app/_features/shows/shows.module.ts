import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VenueShowTimeComponent } from "./venue-show-time/venue-show-time.component";
import { MovieShowTimeComponent } from "./movie-show-time/movie-show-time.component";
import { DaynightPipe } from "./daynight.pipe";
import { ShowsRoutingModule } from "./shows-routing.module";
import { SeatCountComponent } from "./seat-count/seat-count.component";
import { CastcrewComponent } from "./castcrew/castcrew.component";
import { MovieComponent } from "./movie/movie.component";
import { VenueComponent } from "./venue/venue.component";
import { UserreviewComponent } from "./userreview/userreview.component";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "src/app/_shared/shared.module";

@NgModule({
  declarations: [
    MovieShowTimeComponent,
    VenueShowTimeComponent,
    SeatCountComponent,
    CastcrewComponent,
    DaynightPipe,
    MovieComponent,
    VenueComponent,
    UserreviewComponent,
  ],

  imports: [CommonModule, FormsModule, ShowsRoutingModule, SharedModule],
  exports: [DaynightPipe],
})
export class ShowsModule {}
