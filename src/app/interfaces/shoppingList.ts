export type CategoryStatus = 'active' | 'archived';

export interface CategoryModel {
  categoryId?: string | '';
  categoryName: string;
  status: CategoryStatus;
  description?: string;
  icon?: string;
  priority?: string | '';
  userId?: string | '1';
  createdAt?: string | '';   // ISO string (bound to datetime-local)
  updatedAt?: string | '';  // ISO string (bound to datetime-local)
}

export interface ShoppingItemModel {
  itemId?: string | '';
  itemName?: string;
  description?: string | null;
  quantity?: number;
  unit?: string;
  status: CategoryStatus;
  priority?: string | '';
  categoryId?: string;
  createdAt?: string | '';   // ISO string (bound to datetime-local)
  updatedAt?: string | '';  // ISO string (bound to datetime-local)

}

export interface UserProfileModel {
  userId?: String | '';
  fullName?: String;
  userName?: String;
  email?: String;
  password?: String;
   createdAt?: string | '';   // ISO string (bound to datetime-local)
  updatedAt?: string | '';  // ISO string (bound to datetime-local)
}