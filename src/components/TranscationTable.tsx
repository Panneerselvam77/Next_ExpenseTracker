"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Expense } from "@/features/expense/expense.types";
// import { transactions } from "@/mock/mock";
// import { fetchExpense } from "@/features/expense/expense.api";
import axios from "axios";
import { useEffect, useState } from "react";

const thead = ["Invoice", "Date", "Catagory", "Sub-Catagory", "Type", "Amount"];

export default function TransactionTable({ refresh }: { refresh: boolean }) {
  const [transactions, setTransactions] = useState<Expense[]>([]);
  const formatDate = (value: string | undefined) => {
    if (!value) return "—";

    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "—" : value.slice(0, 10);
  };

  const fetchExpenses = async () => {
    try {
      const url = "http://localhost:5000/transactions";
      const res = await axios.get(url);
      setTransactions(res.data);
      console.log("Res; ", res.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [refresh]);
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          {thead.map((th) => (
            <TableHead
              className={
                th === "Amount"
                  ? "text-right"
                  : th === "Invoice"
                    ? "w-[100px]"
                    : ""
              }
              key={th}
            >
              {th}
            </TableHead>
          ))}
          {/* <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="font-medium">
              {transaction.invoice ?? transaction.id}
            </TableCell>
            <TableCell>
              {formatDate(transaction.createdat ?? transaction.date)}
            </TableCell>
            <TableCell>{transaction.category}</TableCell>
            <TableCell>{transaction.subcategory}</TableCell>
            <TableCell>{transaction.type}</TableCell>
            <TableCell className="text-right">{transaction.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
