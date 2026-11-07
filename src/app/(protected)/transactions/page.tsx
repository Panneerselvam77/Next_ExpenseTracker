"use client";
import TransactionTable from "@/components/transactions/TranscationTable";
import TransactionForm from "@/components/transactions/TransactionForm";
import { Wallet } from "lucide-react";
import DisplayCard from "@/components/transactions/DisplayCard";
import { useAppSelector } from "@/hooks/hooks";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useState } from "react";

export default function Transactions() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const { totalIncome, totalSpending } = useAppSelector(
    (state) => state.expense,
  );

  const handleAddForm = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  const handleSheetToggle = () => {
    setSheetOpen(!sheetOpen);
  };
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
    <>
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
          <Button onClick={handleSheetToggle}>Add Transaction</Button>
        </div>
        {/* Main Content Grid */}
        <div className="">
          {/* Table / Data Section */}
          <div>
            <TransactionTable />
          </div>
          {/* Form Section */}
          {/* <div className="lg:col-span-1">
            <TransactionForm />
          </div> */}
        </div>
      </div>
      <Sheet open={sheetOpen} onOpenChange={handleSheetToggle}>
        <SheetContent>
          <TransactionForm />
        </SheetContent>
      </Sheet>
    </>
  );
}
