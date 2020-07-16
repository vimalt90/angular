import { Component, OnInit } from "@angular/core";
import { StyleChangeService } from "../service/style-change.service";

@Component({
  selector: "mp-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor(private stylechanges: StyleChangeService) {}

  ngOnInit(): void {}

  changeStyle() {
    this.stylechanges.changeHomeStyle();
  }
}
