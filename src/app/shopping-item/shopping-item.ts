import { NgClass} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-shopping-item',
  imports: [MatCardModule, MatButtonModule, NgClass, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './shopping-item.html',
  styleUrl: './shopping-item.scss',
})
export class ShoppingItem {

  status = 'high-piority';

}
