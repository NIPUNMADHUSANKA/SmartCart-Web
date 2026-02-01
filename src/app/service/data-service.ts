import { Injectable, signal } from '@angular/core';
import { AIItem } from '../interfaces/aiSuggestion';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public openShoppingList = signal<string | undefined>('');

  public normalizeUnit(value: string): AIItem['unit'] {
    const trimmed = value.trim();
    if (!trimmed) {
      return 'other';
    }

    const lower = trimmed.toLowerCase();
    const normalizedMap: Record<string, AIItem['unit']> = {
      kg: 'kg',
      kilogram: 'kg',
      kilograms: 'kg',
      g: 'g',
      gram: 'g',
      grams: 'g',
      l: 'l',
      litre: 'l',
      liter: 'l',
      litres: 'l',
      liters: 'l',
      ml: 'ml',
      millilitre: 'ml',
      milliliter: 'ml',
      millilitres: 'ml',
      milliliters: 'ml',
      piece: 'piece',
      pieces: 'piece',
      pack: 'pack',
      packs: 'pack',
      dozen: 'dozen',
      box: 'box',
      boxes: 'box',
      bottle: 'bottle',
      bottles: 'bottle',
      can: 'can',
      cans: 'can',
      cup: 'cup',
      cups: 'cup',
      other: 'other',
    };

    const mapped = normalizedMap[lower];
    if (mapped) {
      return mapped;
    }

    return 'other';
  }
}
