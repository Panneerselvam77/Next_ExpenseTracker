"use client";
import TransactionTable from "@/components/TranscationTable";
import TransactionForm from "@/components/TransactionForm";
import { useState } from "react";
import { Wallet } from "lucide-react";
import DisplayCard from "@/components/DisplayCard";

export default function Expense() {
  const [refresh, setRefresh] = useState(false);
  const triggerRefresh = () => setRefresh((prev) => !prev);
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
      <div>
        <DisplayCard />
      </div>
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Table / Data Section */}
        <div className="lg:col-span-2">
          <TransactionTable refresh={refresh} />
        </div>
        {/* Form Section */}
        <div className="lg:col-span-1">
          <TransactionForm onTransactionAdded={triggerRefresh} />
        </div>
      </div>
    </div>
  );
}
