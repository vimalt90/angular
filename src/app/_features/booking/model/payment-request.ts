import { SelectedSeatLayout } from './seat-layout';
import { RequestHeader } from 'src/app/_core/model/request-header';

export class PaymentRequest {

    customerEmail:string;
    customerName:string;
    customerPhone:number;
    header: RequestHeader;
    city:string;
    classId:number;
    movieConsent:string;
    movieId:number;
    paymentMode:number;
    screenId:number;
    seat_layout:SelectedSeatLayout;
    showDetailsId:number;
    venueConsent:string;
    venueId:number;
}
