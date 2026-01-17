import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-ai-suggestion',
  imports: [MatExpansionModule, MatButtonModule],
  templateUrl: './ai-suggestion.html',
  styleUrl: './ai-suggestion.scss',
})
export class AiSuggestion {

    readonly pageName = signal('AI Suggestions');

}
