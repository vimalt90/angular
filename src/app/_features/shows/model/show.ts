export class Show {
  showPublishedId: number;
  screenId: number;
  showTime: string;
  showDate: string;
  screenPublishedId: number;
  classes: Class[];
}
export class Class {
  classId: number;
  baseFare: number;
  fareId: number;
  availableSeats: number;
  discount: number;
  className: string;
  classPublishedId: number;
  extraFare: number;
  totalSeats: number;
}
