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

export async function updateExpense(
  id: string | number,
  changes: Partial<Expense>,
): Promise<Expense> {
  const res = await axios.patch<Expense>(
    `${baseUrl}/${encodeURIComponent(String(id))}`,
    changes,
  );
  return res.data;
}

export async function deleteExp(id: string): Promise<void> {
  await axios.delete(`${baseUrl}/${encodeURIComponent(id)}`);
}
