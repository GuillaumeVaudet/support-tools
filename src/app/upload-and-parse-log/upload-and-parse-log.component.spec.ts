import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAndParseLogComponent } from './upload-and-parse-log.component';

describe('UploadAndParseLogComponent', () => {
  let component: UploadAndParseLogComponent;
  let fixture: ComponentFixture<UploadAndParseLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadAndParseLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadAndParseLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
