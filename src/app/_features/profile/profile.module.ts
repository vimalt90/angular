import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HistoryComponent } from "./history/history.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { PreferenceComponent } from "./preference/preference.component";
import { ProfileRouterModule } from "./profile-router/profile-router.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";

@NgModule({
  declarations: [HistoryComponent, EditProfileComponent, PreferenceComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    ProfileRouterModule,
  ],
})
export class ProfileModule {}
