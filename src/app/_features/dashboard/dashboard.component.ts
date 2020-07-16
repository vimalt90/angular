import { Component, OnInit, TemplateRef } from "@angular/core";
import { ModalService } from "src/app/_core/service/modal.service";
import { UserService } from "src/app/_shared/user/service/user.service";

@Component({
  selector: "mp-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  showalternator = "summary";
  activeElem = "summary";
  // style: string = "default";
  constructor(
    private modalservice: ModalService,
    public userService: UserService
  ) {}
  ngOnInit(): void {}
  openLogin(login: TemplateRef<any>) {
    this.modalservice.show(login);
  }
  // This method will alternate the display between
  // Now-showing and upcoming view
  switchShow(viewname: any) {
    if (viewname === "summary") {
      this.showalternator = "summary";
    } else if (viewname === "nowshowing") {
      this.activeElem = "nowshowing";
      this.showalternator = "nowshowing";
    } else {
      this.activeElem = "upcoming";
      this.showalternator = "upcoming";
    }
  }
  // To set the side menu element active
  setActive(activeElem: string) {
    this.activeElem = activeElem;
  }
}
