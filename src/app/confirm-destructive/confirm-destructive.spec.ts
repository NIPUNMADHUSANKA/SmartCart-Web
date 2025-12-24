import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDestructive } from './confirm-destructive';

describe('ConfirmDestructive', () => {
  let component: ConfirmDestructive;
  let fixture: ComponentFixture<ConfirmDestructive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDestructive]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDestructive);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
