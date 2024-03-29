import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SendModalComponent } from './send-modal.component';

describe('SendModalComponent', () => {
  let component: SendModalComponent;
  let fixture: ComponentFixture<SendModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SendModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
