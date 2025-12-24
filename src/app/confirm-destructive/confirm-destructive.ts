import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-destructive',
  imports: [CommonModule],
  templateUrl: './confirm-destructive.html',
  styleUrl: './confirm-destructive.scss',
})
export class ConfirmDestructive {
  @Input() popupTitle!:string;
  @Input() showConfirm!:boolean;
  @Output() deleteItem = new EventEmitter<boolean>();

  toggleCancel(){
    this.deleteItem.emit(false);
  }

  toggleDelete(){
    this.deleteItem.emit(true);
  }

}
