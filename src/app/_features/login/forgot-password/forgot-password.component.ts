import { Component, OnInit } from "@angular/core";
import { ForgotpasswordService } from "../service/forgotpassword.service";
import { User } from "src/app/_shared/user/model/user";
import { TokenStorage } from "src/app/_core/guard/token-storage";
import { ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/_shared/user/service/user.service';

@Component({
  selector: "mp-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
    // formgroup
  forgotResetPasswordForm: FormGroup;
  passwords: FormControl;
  confirmpassword: FormControl;
  resetPasswordParam: any;

  constructor(public password: ForgotpasswordService, private token: TokenStorage, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.resetPasswordParam = this.route.snapshot.queryParams["token"];
    this.password.resetpswToken();
  }

  forgotpswReset(){
    const user = new User;
    user.password = "123456";
   this.password.resetPassword(user);;
  }
}

