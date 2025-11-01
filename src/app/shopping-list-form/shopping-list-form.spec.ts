import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListForm } from './shopping-list-form';

describe('ShoppingListForm', () => {
  let component: ShoppingListForm;
  let fixture: ComponentFixture<ShoppingListForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingListForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingListForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
