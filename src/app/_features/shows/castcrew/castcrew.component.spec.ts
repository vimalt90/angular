import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CastcrewComponent } from "./castcrew.component";

describe("CastcrewComponent", () => {
  let component: CastcrewComponent;
  let fixture: ComponentFixture<CastcrewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CastcrewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CastcrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
