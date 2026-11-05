"use client";
import TransactionTable from "@/components/TranscationTable";
import TransactionForm from "@/components/TransactionForm";
import { Wallet } from "lucide-react";
import DisplayCard from "@/components/DisplayCard";
import { useAppSelector } from "@/hooks/hooks";
import { se } from "date-fns/locale";

export default function Expense() {
  const { totalIncome, totalSpending } = useAppSelector(
    (state) => state.expense,
  );
  const cardDisplay = [
    {
      cardTitle: "Total Income",
      cardDescription: "Cumulative income logged this period",
      cardAmount: parseInt(`${totalIncome}`),
      cardLogo: "",
      cardType: "Income",
    },
    {
      cardTitle: "Total Expense",
      cardDescription: "Cumulative expenses logged this period",
      cardAmount: parseInt(`${totalSpending}`),
      cardLogo: "",
      cardType: "Expense",
    },
  ];
  return (
    <div className="min-h-screen bg-muted/30 p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Wallet className="h-8 w-8 text-primary" /> Expense Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track your income, manage expenses, and monitor your cash flow in
            real time.
          </p>
        </div>
      </div>
      <div className="flex gap-5 ">
        {cardDisplay.map((prop) => (
          <DisplayCard prop={prop} key={prop.cardTitle} />
        ))}
      </div>
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Table / Data Section */}
        <div className="lg:col-span-2">
          <TransactionTable />
        </div>
        {/* Form Section */}
        <div className="lg:col-span-1">
          <TransactionForm />
        </div>
      </div>
    </div>
  );
}
