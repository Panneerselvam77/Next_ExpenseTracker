import type { Expense } from "./expense.types";
import axios from "axios";

const baseUrl = "http://localhost:5000/transactions";

export async function fetchExpense(): Promise<Expense[]> {
  const res = await axios.get<Expense[]>(baseUrl);
  return res.data;
}

export async function addExpense(body: Expense) {
  const res = await axios.post<Expense[]>(baseUrl, body);
  return res.data;
}
