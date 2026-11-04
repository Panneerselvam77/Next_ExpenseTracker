export const transactions = [
  {
    id: 1,
    invoice: "INV-2026-001",
    category: "Groceries",
    subcategory: "Stationery",
    type: "Expense",
    amount: 120.5,
    createdat: "2026-10-15T09:30:00Z",
  },
  {
    id: 2,
    invoice: "INV-2026-002",
    category: "Utilities",
    subcategory: "Network Providers",
    type: "Expense",
    amount: 79.99,
    createdat: "2026-10-16T14:15:00Z",
  },
  {
    id: 3,
    invoice: "INV-2026-003",
    category: "Salary",
    subcategory: "Consulting",
    type: "INCOME",
    amount: 1500.0,
    createdat: "2026-10-18T11:00:00Z",
  },
];

export const category: string[] = [
  "Food",
  "Groceries",
  "Transport",
  "Entertainment",
  "Utils",
  "Investment",
  "Salary",
  "Utilities",
];

export const subcategory = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Vegitable",
  "Snancks",
  "Tea/Coffee",
  "Movie",
  "Consulting",
];
