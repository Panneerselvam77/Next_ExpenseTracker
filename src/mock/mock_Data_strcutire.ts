export interface MockSample {
  id: number;
  invoice: string | number;
  type: string; // Enum: INCOME, EXPENSE, TRANSFER
  amount: number; // Stored in base currency units
  currency: string; // "IND"
  category: string; //
  sub_category: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  status: string; // "COMPLETED", "PENDING"
}

export const Category = [
  "FOOD", "Transport", "Medical" 
]