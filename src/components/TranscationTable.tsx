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
import { useEffect } from "react";
import { PenIcon, Trash } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchTransactions } from "@/features/expense/expense.slice";

const thead = [
  "Invoice",
  "Date",
  "Catagory",
  "Sub-Catagory",
  "Type",
  "Amount",
  "Action",
];

export default function TransactionTable({ refresh }: { refresh: boolean }) {
  const dispatch = useAppDispatch();

  const { transactions } = useAppSelector((state) => state.expense);

  const formatDate = (value: string | undefined) => {
    if (!value) return "—";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "—" : value.slice(0, 10);
  };

  useEffect(() => {
    dispatch(fetchTransactions());
  }, []);

  const handleAmout = () => {
    console.log(
      "Transaction",
      transactions.reduce(
        (total, transaction) =>
          transaction.type?.toLowerCase() === "expense"
            ? total + Number(transaction.amount)
            : total,
        0,
      ),
    );
  };
  handleAmout();
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
            <TableCell className="flex">
              <span>
                <PenIcon className="h-4 w-4" />
              </span>
              <span>
                <Trash className="h-4 w-4" />
              </span>
            </TableCell>
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
