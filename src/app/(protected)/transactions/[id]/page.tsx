import axios from "axios";
import type { Expense } from "@/features/expense/expense.types";
import { connection } from "next/server";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Receipt,
  Calendar,
  Tag,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
} from "lucide-react";

export const instant = false;

interface ExpenseIdProp {
  params: Promise<{ id: string | number }>;
}

export default async function ViewTransactionById({ params }: ExpenseIdProp) {
  await connection();
  const { id } = await params;

  let transaction: Expense | null = null;
  try {
    const res = await axios.get(`http://localhost:5000/transactions/${id}`);
    transaction = res.data;
  } catch (error) {
    console.log("Error fetching transaction by ID: ", error);
  }

  const isIncome = transaction?.type?.toLowerCase() === "income";

  return (
    <div className="min-h-screen bg-muted/30 py-10 px-4 sm:px-6">
      <div className="max-w-xl mx-auto space-y-6">
        {/* Back Navigation */}
        <div>
          <Link
            href="/transactions"
            className="inline-flex h-9 items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-3 pl-0 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Transactions
          </Link>
        </div>

        {/* Main Details Card */}
        <Card className="shadow-sm border-border/60">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-full text-primary">
                  <Receipt className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-xl">Transaction Details</CardTitle>
                  <CardDescription>
                    Summary for reference #{transaction?.invoice ?? id}
                  </CardDescription>
                </div>
              </div>
              {transaction && (
                <Badge
                  variant={isIncome ? "outline" : "secondary"}
                  className={`gap-1 px-2.5 py-1 text-xs font-semibold ₹{
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
              )}
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="pt-6">
            {transaction ? (
              <div className="space-y-6">
                {/* Amount Highlight Box */}
                <div className="bg-muted/50 rounded-lg p-4 flex flex-col items-center justify-center text-center border border-border/40">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Amount
                  </span>
                  <span
                    className={`text-4xl font-extrabold tracking-tight mt-1 ${isIncome ? "text-emerald-600" : "text-foreground"}`}
                  >
                    {isIncome ? "+" : "-"}₹
                    {Number(transaction.amount).toFixed(2)}
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                      <Tag className="h-3.5 w-3.5" /> Category
                    </span>
                    <p className="font-semibold text-foreground">
                      {transaction.category}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5" /> Subcategory
                    </span>
                    <p className="font-semibold text-foreground">
                      {transaction.subcategory}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" /> Date Recorded
                    </span>
                    <p className="font-semibold text-foreground">
                      {transaction.date ?? transaction.createdat ?? "—"}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5" /> Reference / ID
                    </span>
                    <p className="font-mono text-xs font-semibold text-foreground bg-muted p-1 rounded w-fit">
                      {transaction.invoice ?? transaction.id}
                    </p>
                  </div>
                </div>

                {transaction.description && (
                  <>
                    <Separator />
                    <div className="space-y-1.5">
                      <span className="text-xs font-medium text-muted-foreground">
                        Description / Notes
                      </span>
                      <p className="text-sm text-foreground bg-muted/30 p-3 rounded-md border border-border/40">
                        {transaction.description}
                      </p>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="py-12 text-center space-y-3">
                <p className="text-destructive font-medium">
                  Transaction with ID <span className="font-mono">{id}</span>{" "}
                  could not be found.
                </p>
                <p className="text-xs text-muted-foreground">
                  It may have been deleted or the ID is incorrect.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
