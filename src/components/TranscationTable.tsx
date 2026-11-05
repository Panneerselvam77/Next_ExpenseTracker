// name=TranscationTable.tsx
"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  PenIcon,
  Trash,
  ReceiptText,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  deleteTransaction,
  fetchTransactions,
} from "@/features/expense/expense.slice";
import UpdateForm from "./UpdateForm";
import type { Expense } from "@/features/expense/expense.types";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const thead = [
  "Invoice / ID",
  "Date",
  "Category",
  "Subcategory",
  "Type",
  "Amount",
  "Actions",
];

export default function TransactionTable() {
  const dispatch = useAppDispatch();
  const [editingTransaction, setEditingTransaction] = useState<Expense | null>(
    null,
  );

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of items per page

  const { transactions, status, deletingIds, error, total } = useAppSelector(
    (state) => state.expense,
  );

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  // Safely format dates
  const formatDate = (value: string | undefined) => {
    if (!value) return "—";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "—" : value.slice(0, 10);
  };

  const handleDelete = (id: string | number) => {
    dispatch(deleteTransaction(id));
  };

  // Compute total pages
  const totalPages = Math.ceil((transactions?.length || 0) / pageSize);

  // Slice transactions for current page
  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return transactions.slice(start, start + pageSize);
  }, [transactions, currentPage]);

  // Handle page change safely
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  

  return (
    <>
      <Card className="shadow-sm border-border/60">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl flex items-center gap-2">
            <ReceiptText className="h-5 w-5 text-primary" /> Recent Transactions
          </CardTitle>
          <CardDescription>
            A history of your recorded income and expenses.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <p role="alert" className="mb-3 text-sm text-destructive">
              {error}
            </p>
          )}
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  {thead.map((th) => (
                    <TableHead
                      key={th}
                      className={
                        th === "Amount"
                          ? "text-right"
                          : th === "Actions"
                            ? "text-center w-[100px]"
                            : th === "Invoice / ID"
                              ? "w-[120px]"
                              : ""
                      }
                    >
                      {th}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {status === "loading" ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-24 text-center text-muted-foreground"
                    >
                      Loading transactions...
                    </TableCell>
                  </TableRow>
                ) : paginatedTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No transactions recorded yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedTransactions.map((transaction) => {
                    const isIncome =
                      transaction.type?.toLowerCase() === "income";
                    return (
                      <TableRow
                        key={transaction.id}
                        className="hover:bg-muted/40 transition-colors"
                      >
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          #{transaction.invoice ?? transaction.id}
                        </TableCell>
                        <TableCell className="text-sm">
                          {formatDate(
                            transaction.date ?? transaction.createdat,
                          )}
                        </TableCell>
                        <TableCell className="font-medium">
                          {transaction.category}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {transaction.subcategory}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={isIncome ? "outline" : "secondary"}
                            className={`gap-1 px-2 py-0.5 text-xs font-semibold ${
                              isIncome
                                ? "border-emerald-500/30 text-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20"
                                : "border-rose-500/30 text-rose-600 bg-rose-50/50 dark:bg-rose-950/20"
                            }`}
                          >
                            {isIncome ? (
                              <ArrowUpRight className="h-3 w-3" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3" />
                            )}
                            {transaction.type}
                          </Badge>
                        </TableCell>
                        <TableCell
                          className={`text-right font-semibold ${isIncome ? "text-emerald-600" : "text-foreground"}`}
                        >
                          {isIncome ? "+" : "-"}$
                          {Number(transaction.amount).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-1">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-primary"
                              onClick={() => setEditingTransaction(transaction)}
                              aria-label={`Edit transaction ${transaction.invoice ?? transaction.id}`}
                            >
                              <PenIcon className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              type="button"
                              disabled={deletingIds.includes(
                                String(transaction.id),
                              )}
                              onClick={() => handleDelete(transaction.id)}
                            >
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
              <TableFooter className="bg-muted/50 font-medium">
                <TableRow>
                  <TableCell colSpan={5}>Total Expenses</TableCell>
                  {total > 0 ? (
                    <TableCell className="text-right font-bold text-green-600">
                      ${total.toFixed(2)}
                    </TableCell>
                  ) : (
                    <TableCell className="text-right font-bold text-rose-600">
                      ${total.toFixed(2)}
                    </TableCell>
                  )}
                  <TableCell />
                </TableRow>
              </TableFooter>
            </Table>
          </div>

          {/* Shadcn UI Pagination Controls */}
          {totalPages > 1 && (
            <Pagination className="py-2">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => {
                    // Show first page, last page, and pages surrounding current page
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            isActive={currentPage === page}
                            onClick={() => handlePageChange(page)}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    return null;
                  },
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </CardContent>
      </Card>

      <Sheet
        open={editingTransaction !== null}
        onOpenChange={(open) => {
          if (!open) setEditingTransaction(null);
        }}
      >
        <SheetContent
          side="right"
          className="w-full overflow-y-auto sm:max-w-xl"
        >
          <div className="p-6">
            {editingTransaction && (
              <UpdateForm
                key={String(editingTransaction.id)}
                transaction={editingTransaction}
                onUpdated={() => setEditingTransaction(null)}
                onCancel={() => setEditingTransaction(null)}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
