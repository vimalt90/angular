import { Component, OnInit, TemplateRef } from "@angular/core";
import { PreferenceService } from '../service/preference.service';
import { ShowService } from '../../dashboard/service/show.service';
import { ModalService } from 'src/app/_core/service/modal.service';
import { VenueService } from '../../shows/service/venue.service';

@Component({
  selector: "mp-preference",
  templateUrl: "./preference.component.html",
  styleUrls: ["./preference.component.scss"],
})
export class PreferenceComponent implements OnInit {
  // city: string;
  preferenceService: any;
  userPreferenceGenreId: number;
  indexPreference: any;
  DeleteVenueResponse: any;
  DeleteGenreResponse: any;
  switchtoVenue: boolean;
  switchtoRemoveVenue: boolean;
  venueId:number;
  constructor(public preference: PreferenceService,public showService: ShowService,private modalService: ModalService,
    public venueService: VenueService) {}

  ngOnInit() {  
    // this.preference.addPreferedGenre(7);
    this.preference.getPreferrdVenue();
    this.preference.getGenres();
    this.fetchGenre();
  }
  fetchGenre()
{
this.preference.getPreferredGenre(); 
}

addvenues(venueId:number){
  this.preference.addPreferredVenue(venueId);
  this.preference.getPreferrdVenue();
}


  // check box select or unselect
  userSelectedGenre(event, genreid: number) {
    if (event.target.checked) {
      this.preference.addPreferedGenre(genreid);
    } 
    else {
      this.preference.deletePreferredGenre(genreid,3);
    }
  }

  getCity(template: TemplateRef<any>){
    this.modalService.show(template);
    this.venueService.getVenuebyCity("Chennai");

  }

  confirmDelete() {
    this.venueId = this.showService.booking.venueId;
    this.preference.deletePreferredVenue(this.venueId,2);
    this.switchtoRemoveVenue = false;
  }

  removeVenuePopup(venueId: number, i, template: TemplateRef<any>) {
  this.modalService.show(template);
  this.indexPreference = i;
   this.showService.booking.venueId=venueId;
    this.switchtoRemoveVenue = true;
  }


}
