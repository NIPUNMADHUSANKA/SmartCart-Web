export type CategoryStatus = 'active' | 'archived';

export interface CategoryModel {
  categoryId?: string | '';
  categoryName: string;
  status: CategoryStatus;
  description?: string;
  icon?: string;
  priority?: number | '';
  userId?: string | '1';
  createdAt?: string | '';   // ISO string (bound to datetime-local)
  updatedAt?: string | '';  // ISO string (bound to datetime-local)
}