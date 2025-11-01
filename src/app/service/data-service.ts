import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public openShoppingList = signal<boolean>(false);

  
}
