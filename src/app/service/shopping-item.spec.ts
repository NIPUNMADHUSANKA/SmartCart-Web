import { TestBed } from '@angular/core/testing';

import { ShoppingItem } from './shopping-item';

describe('ShoppingItem', () => {
  let service: ShoppingItem;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingItem);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
