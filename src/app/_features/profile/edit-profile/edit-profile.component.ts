import { Component, OnInit } from "@angular/core";
import { ProfileService } from "../service/profile.service";
import { User } from "src/app/_shared/user/model/user";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { BsModalRef } from "ngx-bootstrap/modal/public_api";
import { formatDate } from "@angular/common";
import { UserService } from "src/app/_shared/user/service/user.service";
import { map } from "rxjs/operators";

@Component({
  selector: "mp-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.scss"],
})
export class EditProfileComponent implements OnInit {
  // Form
  profile: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  primaryPhoneNumber: FormControl;
  primaryEmail: FormControl;
  dateOfBirth: FormControl;
  gender: FormControl;
  modalRef: BsModalRef;
  cancelbooking: any;
  updateemail: any;
  updateNumber: number;
  newNumber: any;
  user: User = new User();
  userDetails: any;
  constructor(
    private profileService: ProfileService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    // use form control
    (this.firstName = new FormControl("", [Validators.required])),
      (this.lastName = new FormControl("", [Validators.required]));

    this.primaryPhoneNumber = new FormControl("", [
      Validators.required,
      Validators.pattern("[6-9]\\d{9}"),
    ]);
    (this.primaryEmail = new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
    ])),
      (this.dateOfBirth = new FormControl("", [Validators.required]));
    (this.gender = new FormControl("", [Validators.required])),
      (this.profile = new FormGroup({
        firstName: this.firstName,
        lastName: this.lastName,
        primaryPhoneNumber: this.primaryPhoneNumber,
        primaryEmail: this.primaryEmail,
        dateOfBirth: this.dateOfBirth,
        gender: this.gender,
      }));
    this.userService.user$.subscribe((users) => {
      this.user = users[0];
      this.setValues();
    });
  }
  setValues() {
    this.profile.setValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      primaryPhoneNumber: this.user.primaryPhoneNumber,
      primaryEmail: this.user.primaryEmail,
      dateOfBirth: this.user.dateOfBirth,
      gender: this.user.gender,
    });
  }
  updateProfile() {
    Object.assign(this.profile.value, this.user);
    this.user.dateOfBirth = formatDate(
      this.profile.value.dateOfBirth,
      "dd-MMM-yyyy",
      "en-US"
    );
    this.profileService.updateProfile(this.user);
  }

  onSubmit() {
    this.updateProfile();
  }
}
