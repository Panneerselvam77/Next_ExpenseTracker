export const overviewData = [
  { month: "Jan", income: 45000, expense: 28000 },
  { month: "Feb", income: 52000, expense: 31000 },
  { month: "Mar", income: 48000, expense: 26000 },
  { month: "Apr", income: 61000, expense: 34000 },
  { month: "May", income: 55000, expense: 29000 },
  { month: "Jun", income: 67000, expense: 32500 },
];

export const categoryData = [
  { name: "Housing", value: 12000, color: "#2563eb" },
  { name: "Groceries", value: 6500, color: "#16a34a" },
  { name: "Transport", value: 3500, color: "#d97706" },
  { name: "Dining Out", value: 4500, color: "#dc2626" },
  { name: "Utilities", value: 6000, color: "#9333ea" },
];

export const recentTransactions = [
  {
    id: "tx-1",
    title: "Grocery Shopping",
    category: "Groceries",
    amount: -2450,
    date: "Today, 2:30 PM",
    icon: "ShoppingBag",
    type: "expense",
  },
  {
    id: "tx-2",
    title: "Salary Credit",
    category: "Income",
    amount: 67000,
    date: "Yesterday",
    icon: "Wallet",
    type: "income",
  },
  {
    id: "tx-3",
    title: "Dinner with Friends",
    category: "Dining Out",
    amount: -1850,
    date: "Nov 01, 2026",
    icon: "Utensils",
    type: "expense",
  },
  {
    id: "tx-4",
    title: "Fuel Refill",
    category: "Transport",
    amount: -1200,
    date: "Oct 30, 2026",
    icon: "Car",
    type: "expense",
  },
  {
    id: "tx-5",
    title: "House Rent",
    category: "Housing",
    amount: -12000,
    date: "Oct 28, 2026",
    icon: "Home",
    type: "expense",
  },
];

export const budgetCategories = [
  { name: "Groceries", spent: 6500, limit: 10000, color: "bg-emerald-500" },
  { name: "Dining & Outings", spent: 4500, limit: 5000, color: "bg-amber-500" },
  { name: "Shopping", spent: 8200, limit: 8000, color: "bg-rose-500" },
];
