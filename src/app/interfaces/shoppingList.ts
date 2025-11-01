export type CategoryStatus = 'active' | 'archived';

export interface CategoryModel {
  id?: string;
  name: string;
  status: CategoryStatus;
  description?: string;
  icon?: string;
  priority?: number | '';
  userId?: string;
  createDate?: string;   // ISO string (bound to datetime-local)
  updateDate?: string;   // ISO string (bound to datetime-local)
}