import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinesViewComponent } from './lines-view.component';

describe('LinesViewComponent', () => {
  let component: LinesViewComponent;
  let fixture: ComponentFixture<LinesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
