import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsCreateComponent } from './sms-create.component';

describe('SmsCreateComponent', () => {
  let component: SmsCreateComponent;
  let fixture: ComponentFixture<SmsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
