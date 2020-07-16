import { InjectionToken } from "@angular/core";

export let ENDPOINTS_CONFIG = new InjectionToken("endpoints.config");

export const EndpointsConfig: any = {
  user: {
    authenticate: "/api/v1/login/authenticate",
    login: "/user-service/api/rest/v1/user/authenticate",
    register: "/user-service/api/rest/v1/user/register",
    loginotp: "/user-service/api/rest/v1/user/authenticate/otp/initiate",
    validationotp: "/user-service/api/rest/v1/user/authenticate/otp/validation",
    socialRegistration: "/user-service/api/rest/v1/user/social/login",
    forgotpassword: "/user-service/api/rest/v1/user/password/reset/send/email",
    resetpasswordtoken: "/user-service/api/rest/v1/user/password/reset/validation/token",
    resetpassword: "/user-service/api/rest/v1/user/password/reset",

  },
  moviedetails: {
    movietrailer: "/admin-service/api/rest/v1/manage-movies/get-movie-details",
    castandcrew: "/admin-service/api/rest/v1/manage-cineast/movie/cineasts",
    adduserreview: "/admin-service/api/rest/v1/manage-review/user/store",
    getrecommended: "/show-service/api/rest/v1/shows/recommended/movies",
  },

  booking: {
    seatlayout:
      "/reservation-service/api/rest/v1/reservation/seatingRepresentation",
    seatblock: "/reservation-service/api/rest/v1/reservation/reserveAndBlock",
    payment: "/payment-web/api/rest/v1/details",
    walletpayment: "/payment-web/api/rest/v1/walletPayment",
    resendnotification:
      "/reservation-service/api/rest/v1/reservation/resend/notification",
    walletgateway: "/payment-web/api/rest/v1/details/wallet",
    getwalletdetails: "/payment-web/api/rest/v1/getWalletDetails",
    paymentMode:"/reservation-service/api/rest/v2/Reservation/getPaymentModes",
    faredetails:"/reservation-service/api/rest/v2/Reservation/getFareDetails",
    getticketdetails:"/reservation-service/api/rest/v2/Reservation/getTicketDetails"
  },
  location: {
    viewlocation: "/admin-service/api/rest/v1/manage/get-deployed-locations",
  },

  profile: {
    bookinghistory: "/reservation-service/api/rest/v1/bookinghistory/retrieve",
    cancelbooking:
      "/reservation-service/api/rest/v1/reservation/booking/cancel",
    retrieve: "/user-service/api/rest/v1/user/profile/retrieve",
    update: "/user-service/api/rest/v1/user/profile/update",
  },
  preference: {
    fetchgenre: "/user-service/api/rest/v1/user/profile/fetch/preference/genre",
    addgenre: "/user-service/api/rest/v1/user/profile/add/preference/genre",
    deletegenre:
      "/user-service/api/rest/v1/user/profile/delete/preference/genre",
    fetchvenue: "/user-service/api/rest/v1/user/profile/fetch/preference/venue",
    addvenue: "/user-service/api/rest/v1/user/profile/add/preference/venue",
    deletevenue:
      "/user-service/api/rest/v1/user/profile/delete/preference/venue",
  },
  movie: {
    showdate: "/show-service/api/rest/v1/shows/fetch/showdates",
    showtime: "/show-service/api/rest/v1/shows/movie/show-times",
    genres: "/admin-service/api/rest/v1/manage-movies/get-all-genres",
  },
  venue: {
    showdate: "/show-service/api/rest/v1/shows/fetch/venuedates",
    showtime: "/show-service/api/rest/v1/shows/venue/show-times",
    bycity: "/admin-service/api/rest/v1/manage-venues/city/venues",
    experiencebyvenue: "/admin-service/api/rest/v1/manage/venue/experiences",
  },
  logger: {
    log: "/api/v1/log",
  },
  show: {
    nowshowing: "/show-service/api/rest/v1/shows/now-showing",
    upcoming: "/admin-service/api/rest/v1/manage-movies/upcoming/movies",
  },
};
