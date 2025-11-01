import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListItemForm } from './shopping-list-item-form';

describe('ShoppingListItemForm', () => {
  let component: ShoppingListItemForm;
  let fixture: ComponentFixture<ShoppingListItemForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingListItemForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingListItemForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
