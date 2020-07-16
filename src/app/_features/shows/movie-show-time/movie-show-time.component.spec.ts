import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MovieShowTimeComponent } from "./movie-show-time.component";
import { ShowTimeService } from '../service/show-time.service';
import { ModalService } from 'src/app/_core/service/modal.service';
import { ShowService } from '../../dashboard/service/show.service';
import { MovieService } from '../service/movie.service';
import { Router } from '@angular/router';
import { Booking } from '../../booking/model/booking';
import { SeatLayout, Class } from '../../booking/model/seat-layout';
import { Genres } from '../../booking/model/genres';

fdescribe("MovieComponent", () => {
  let component: MovieShowTimeComponent;
  let showsTimeService: ShowTimeService;
  let modalservice: ModalService;
  let showService: ShowService;
  let router: Router;
  let movieService: MovieService;
  let booking: Booking={
    customerEmail: "string",
    customerName: "string",
    customerPhone: 9999999999,
    city: "string",
    classId: 1,
    movieId: 1,
    screenId: 1,
    venueId: 1,
    venueName: "string",
    movieName: "string",
    movieConsent: "string",
    venueConsent: "string",
    classPublishedId: "string",
    seatLayout: [],
    genres:[],
    orderId: "string",
    orderAmount: 10,
    bookingId: "string",
    trailerUrl: "string",
    posterUrl: "string",
    overAllRating: 1,
    language: "string",
    censorCertificate: "string",
    duration: "string",
    companyId: 1,
    showPublishedId: 1,
    seatCount: 1,
    venueShowTermsFlag: "string",
    venueShowTermsFileId: 1,
    movieShowTermsFileId: 1,
    movieShowTermsFlag: "string",
    userId: "string",
    showTime: "string",
    showDate: "string",
    
  }

  beforeEach(() => {
    component = new MovieShowTimeComponent(showsTimeService, modalservice, showService, router, movieService)
  });
  it("should create MovieShowTimeComponent", () => {
    expect(component).toBeInstanceOf(MovieShowTimeComponent)
  });
});
