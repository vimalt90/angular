export class RequestHeader {
  callingAPI: string;
  channel: string;
  transactionId: string;

  constructor() {
    this.callingAPI = "reservationweb";
    this.channel = "booking-web";
    this.transactionId = "1234567";
  }
}
