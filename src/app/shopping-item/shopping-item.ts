import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-shopping-item',
  imports: [MatCardModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './shopping-item.html',
  styleUrl: './shopping-item.scss',
})
export class ShoppingItem {

}
