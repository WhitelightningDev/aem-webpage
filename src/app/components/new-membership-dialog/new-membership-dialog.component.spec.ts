import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMembershipDialogComponent } from './new-membership-dialog.component';

describe('NewMembershipDialogComponent', () => {
  let component: NewMembershipDialogComponent;
  let fixture: ComponentFixture<NewMembershipDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMembershipDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMembershipDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
