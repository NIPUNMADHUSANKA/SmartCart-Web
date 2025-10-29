import { Component, signal } from '@angular/core';
import { ShoppingItem } from '../shopping-item/shopping-item';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-shopping-list',
  imports: [ShoppingItem, MatExpansionModule, MatIconModule, NgClass],
  templateUrl: './shopping-list.html',
  styleUrl: './shopping-list.scss',
})
export class ShoppingList {
  readonly panelOpenState = signal(true);
  

}
