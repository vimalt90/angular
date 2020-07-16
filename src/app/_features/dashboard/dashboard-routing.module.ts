import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { Routes, RouterModule } from "@angular/router";
import { TokenGuard } from "src/app/_core/guard/token.guard";


export const routes: Routes = [

  { path: "", component: DashboardComponent, canActivate: [TokenGuard], },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {
  constructor() {
    console.log("DashboardRoutingModule");
  }
}
