import { Injectable, NgZone } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  constructor(private zone: NgZone) {}

  showSuccess(message: string): void {
    // Had an issue with the snackbar being ran outside of angular's zone.
    this.zone.run(() => {
      //  this.snackBar.open(message, 'X', { duration: 200 });
    });
  }

  showError(message: string, duration: any): void {
    this.zone.run(() => {
      // The second parameter is the text in the button.
      // In the third, we send in the css class for the snack bar.
      // this.snackBar.open(message, 'X', { panelClass: ['error'], duration: duration });
    });
  }
}
