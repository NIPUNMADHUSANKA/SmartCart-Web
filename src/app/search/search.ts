import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {

  @Output() queryChange = new EventEmitter<string>();

  onInput(event: Event){
    const value = (event.target as HTMLInputElement).value;
    this.queryChange.emit(value);
  }

}
