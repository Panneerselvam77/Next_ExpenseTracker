import type { Expense } from "./expense.types";
import axios from "axios";

export async function fetchExpense(): Promise<Expense[]> {
  const res = await axios.get<Expense[]>("http://localhost:5000/transactions");
  return res.data;
}
