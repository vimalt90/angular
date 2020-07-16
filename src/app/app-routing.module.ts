import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { VenueComponent } from "./_features/shows/venue/venue.component";
import { ForgotPasswordComponent } from "./_features/login/forgot-password/forgot-password.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: "./_features/dashboard/dashboard.module#DashboardModule",
  },
  {
    path: "login",
    loadChildren: "./_features/login/login.module#LoginModule",
  },
  {
    path: "shows",
    loadChildren: "./_features/shows/shows.module#ShowsModule",
  },
  {
    path: "profile",
    loadChildren: "./_features/profile/profile.module#ProfileModule",
  },
  {
    path: "booking",
    loadChildren: "./_features/booking/booking.module#BookingModule",
  },
  {
    path: "location",
    loadChildren: "./_features/location/location.module#LocationModule",
  },
  {
    path: "wallet",
    loadChildren: "./_features/wallet/wallet.module#WalletModule",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor() {
    console.log("AppRoutingModule");
  }
}
