import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { PreferenceComponent } from '../preference/preference.component';


const routes: Routes = [
  {
    path: "",
    component: EditProfileComponent,
  },
  {
    path: "preference",
    component: PreferenceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRouterModule { }
