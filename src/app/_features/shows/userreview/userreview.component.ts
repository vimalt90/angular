import { Component, OnInit, TemplateRef } from "@angular/core";
import { ShowService } from "../../dashboard/service/show.service";
import { ModalService } from "src/app/_core/service/modal.service";
import { UserReviewService } from "../../profile/service/user-review.service";
import { DatePipe } from "@angular/common";
import { Review } from "../../profile/model/review";

@Component({
  selector: "mp-userreview",
  templateUrl: "./userreview.component.html",
  styleUrls: ["./userreview.component.scss"]
})
export class UserreviewComponent implements OnInit {
  rating: number;
  commentValue: string;
  titleComment: string;
  constructor(public showService: ShowService, private modalservice: ModalService,
    // tslint:disable-next-line: align
    public userReview: UserReviewService, private datePipe: DatePipe, ) { }

  ngOnInit(): void {
  }

  userReviewComments(movieId: number, successReview: TemplateRef<any>) {
    const review = new Review();
    review.movieId = movieId;
    review.title = this.titleComment;
    review.comments = this.commentValue;
    review.userId = "hi@gmail.com";
    const todaysDate = new Date();
    const currentDate = this.datePipe.transform(todaysDate, "dd-MMM-yyyy");
    review.reviewDate = currentDate;
    review.rating = this.rating;
    this.userReview.addUserReview(review);
    this.modalservice.hide();
    this.modalservice.show(successReview);
  }

  closeUserReviewModal() {
    this.modalservice.hide();
  }
  onClick(rating: number): void {
    this.rating = rating;
  }
}
