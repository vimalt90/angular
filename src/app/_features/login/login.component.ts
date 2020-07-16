import { Component, OnInit, TemplateRef, Output, EventEmitter, ElementRef, ViewChild } from "@angular/core";
import { LoginService } from "./service/login.service";
import { ModalService } from "src/app/_core/service/modal.service";
import { User } from "src/app/_shared/user/model/user";
import { LoginotpService } from "./service/loginotp.service";
import { ForgotpasswordService } from "./service/forgotpassword.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LogService } from 'src/app/_core/log/log.service';

@Component({
  selector: "mp-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private modalservice: ModalService, private loginotpService: LoginotpService,
    private forgotpassword: ForgotpasswordService, private logService: LogService,
    private routerObj: Router,
  ) { }
  showPassword: boolean;
  @Output() hidechange = new EventEmitter();
  hideModal: any;
  header: any = "Login";
  swithtoRegister: boolean;
  switchtoForgotPassword: boolean;
  authFail: boolean;

  // Form
   loginForm: FormGroup;
   email: FormControl;

   // Form Password
   passwordForm: FormGroup;
   password: FormControl;

   // Form control for Authenticate

   signForm: FormGroup;
   otp: FormControl;

   // forgotpassword Form

  forgotPasswordForm: FormGroup;
  emailPassword: FormControl;
  mailPassword: boolean;
  passwordOtp: boolean;
  timer: boolean;
  settimer: boolean;
  timeLeft = 60;
  interval;
  NewPassword: boolean;
  buttonFade: boolean;
  callingApi: false;
  @ViewChild("clearInput") clearInput: ElementRef;

  ngOnInit() {
    // this.otp();
    // Forms intialization
    this.email = new FormControl("", [
      Validators.required,
      Validators.pattern(
        /^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/
      ),
    ]);
    this.otp = new FormControl("", [
      Validators.required,
      Validators.maxLength(6),
    ]);

    (this.password = new FormControl("", [Validators.required])),
      (this.emailPassword = new FormControl("", [
        Validators.required,
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
      ]));

    this.loginForm = new FormGroup({
      email: this.email,
    });

    this.passwordForm = new FormGroup({
      password: this.password,
    });

    this.signForm = new FormGroup({
      otp: this.otp,
    });

    this.forgotPasswordForm = new FormGroup({
      emailPassword: this.emailPassword,
    });
  }
  openLogin(template: TemplateRef<any>) {
    this.modalservice.show(template);
  }
  close() {
    console.log("click");
    this.modalservice.hide();
  }

  signInWithFB(){
    console.log("signInWithFB");
  }
  signInWithGoogle(){
    console.log("signInWithGoogle")
  }
  onSubmit(){
    if (this.swithtoRegister) {
      console.log("register");
      const user = new User();
      user.userId = this.loginForm.value.email;
      user.password = this.passwordForm.value.password;
      this.loginService.register(user);
    }else{
    const user = new User();
    user.userId = this.loginForm.value.email;
    user.passCode = this.passwordForm.value.password;
    console.log("authenticatecall");
    this.loginService.logIn(user);
    this.routerObj.navigate(["/"]);
    this.callingApi = false;
  }
}
  // display password use eye icon
  toggleShowPassword() {
    if (this.showPassword === false) {
      this.showPassword = true;
    } else {
      this.showPassword = false;
    }
  }
  headerClose() {
    this.hideModal = true;
    this.hidechange.emit(this.hideModal);
  }
  loginorRegisterTitle(title: any) {
    if (title === "register") {
      this.header = "Register";
      this.swithtoRegister = true;
    } else if (title === "forgotpass") {
      this.header = "ForgortPassword";
      this.switchtoForgotPassword = true;
    } else if (title === "login") {
      this.header = "Login";
      this.swithtoRegister = false;
    }
  }

  displayPassword(inputValue: any, event: any) {
    if (!isNaN(inputValue)) {
      if (inputValue.length > 10) {
        this.mailPassword = true;
      } else if (inputValue.length < 11) {
        this.mailPassword = false;
      }
    } else {
      this.mailPassword = true;
    }
  }
  /// timer settime in login otp screen

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
        clearInterval(this.interval);
        this.timer = true;
        this.settimer = false;
      }
    }, 1000);
  }
  forgotPassword(){
    if (this.forgotPasswordForm.valid){
      const user = new User();
      user.emailId =this.forgotPasswordForm.value.emailPassword;
      this.forgotpassword.forgotPassword(user);
      this.NewPassword = true;
    }
    // this.NewPassword = true;
    console.log("forgotPassword");

  }
  otpPhoneRegister(){
      this.logService.info("~login-modal component~otpphoneRegister method");
      if (!this.mailPassword) {
        this.logService.info(
          "~LoginModalComponent~submit sign Login form Valid" +
            this.loginForm.valid
        );
        if (this.loginForm.valid) {
          const phone = this.loginForm.value.email;
          this.loginService.intiateOtp(phone);
          this.passwordOtp = true;
        }
  } 
  else{ 
    this.onSubmit();
  }
      this.timer = false;
      this.settimer = true;
}
 
  otpTrigger(){
    this.logService.info("~login-modal component~otpTrigger method");
    if (!this.mailPassword) {
       this.logService.info(
          "~LoginModalComponent~submit sign Login form Valid" +
            this.loginForm.valid
        );
       if (this.loginForm.valid) {
          const phone = this.loginForm.value.email;
          this.loginService.intiateOtp(phone);
          this.passwordOtp = true;
        } 
        else {
          // this.authFail = true;
          // this.errorMsg = appmessage.login.invalidnumber;
          // this.logService.log(
          //   "~LoginModalComponent~signingin~~Phone number invalid"
          // );

        }
      } else {
        this.onSubmit();
      }


  }
  errorMessages() {
    this.buttonFade = true;
  }
  errorMessage() {
    this.authFail = false;
  }
  authenticateOtp(){
    this.logService.info("~LoginModalComponent~authenticateOtp~");
    if (this.signForm.valid && this.loginForm.valid) {
    this.loginService.validationOtp(this.signForm.value.otp, this.loginForm.value.email);
    this.callingApi = false;
    this.modalservice.hide();
  }
}
  clearSearchInput() {
    this.clearInput.nativeElement.value = "";
  }

  retrive(){
    // const user = new User();
    this.loginService.retriveProfile();
    console.log("retrive call");
  }
}

