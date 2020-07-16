import {
  Component,
  OnInit,
  Input,
  ContentChild,
  TemplateRef,
  Output,
  EventEmitter,
} from "@angular/core";

@Component({
  selector: "mp-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
})
export class CardComponent implements OnInit {
  constructor() {}
  @Input()
  cards: any;

  @Output()
  movieSelect = new EventEmitter();

  ngOnInit(): void {}

  onCardSelect(movie: any) {
    this.movieSelect.emit(movie);
  }
}
