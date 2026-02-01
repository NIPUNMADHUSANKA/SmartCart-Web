export interface AISuggestionResult {
  id: string;
  categories: AICategory[];
  prompt: string;
}

export interface AICategory {
  id: string;
  suggestionId: string;
  categoryName: string;
  description?: string;
  icon?: string;
  priority: 'low' | 'normal' | 'medium' | 'high';
  items: AIItem[];
}

export interface AIItem {
  id: string;
  itemName: string;
  categoryId: string;
  description?: string;
  quantity?: number;
  unit?: 'kg' | 'piece' | 'pack' | 'dozen' | 'box' | 'g' | 'l' | 'ml' | 'bottle' | 'can' | 'cup' | 'other';
  priority?: 'low' | 'normal' | 'medium' | 'high';
}