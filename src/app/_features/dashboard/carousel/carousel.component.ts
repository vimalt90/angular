import { Component, OnInit, ViewChild } from "@angular/core";
import { SlickCarouselComponent } from "ngx-slick-carousel";

@Component({
  selector: "mp-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.scss"],
})
export class CarouselComponent implements OnInit {
  constructor() {}
  @ViewChild("slickModal") slickModal: SlickCarouselComponent;
  ngOnInit(): void {}
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    dots: false,
    variableWidth: true,
    variableHeight: true,
    prevArrow: false,
    nextArrow: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  slides = [
    {
      img:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c2e8020b-c61a-4883-9ac0-fcc0a1039091/d53hucm-d34d101a-c798-40d2-8d67-12f0e2668d94.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvYzJlODAyMGItYzYxYS00ODgzLTlhYzAtZmNjMGExMDM5MDkxXC9kNTNodWNtLWQzNGQxMDFhLWM3OTgtNDBkMi04ZDY3LTEyZjBlMjY2OGQ5NC5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.rN0qeY5sjGah6EbpRQSkF-F9LMx8iQFHnP1sliMuQsg",
    },
    {
      img:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c2e8020b-c61a-4883-9ac0-fcc0a1039091/d53hucm-d34d101a-c798-40d2-8d67-12f0e2668d94.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvYzJlODAyMGItYzYxYS00ODgzLTlhYzAtZmNjMGExMDM5MDkxXC9kNTNodWNtLWQzNGQxMDFhLWM3OTgtNDBkMi04ZDY3LTEyZjBlMjY2OGQ5NC5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.rN0qeY5sjGah6EbpRQSkF-F9LMx8iQFHnP1sliMuQsg",
    },
  ];
}
