"use client";
import TransactionTable from "@/components/TranscationTable";
import TransactionForm from "@/components/TransactionForm";
import { useState } from "react";

export default function Expense() {
  const [refresh, setRefresh] = useState(false);
  const triggerRefresh = () => setRefresh((prev) => !prev);
  return (
    <div>
      <h1>Expense Board</h1>
      <div
        className=""
        style={{ display: "flex", width: "100%", height: "100vh" }}
      >
        <div style={{ flex: 2, border: "1px solid black" }}>
          <TransactionTable refresh={refresh} />
        </div>
        <div style={{ flex: 1, border: "1px solid black" }}>
          <TransactionForm onTransactionAdded={triggerRefresh} />
        </div>
      </div>
    </div>
  );
}
