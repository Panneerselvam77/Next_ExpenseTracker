export interface Expense {
  id: number | string;
  invoice?: string;
  category: string;
  subcategory: string;
  type: string;
  amount: number | string;
  createdat?: string;
  date?: string;
  description?: string;
}
