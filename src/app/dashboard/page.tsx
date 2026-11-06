"use client";

import { useState } from "react";
import {
  Wallet,
  Plus,
  Calendar,
  Utensils,
  ShoppingBag,
  Car,
  Home,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardCard from "@/components/dashboard/DashBoardCard";
import GraphCharts from "@/components/dashboard/DashBoardGraphChart";

const recentTransactions = [
  {
    id: "tx-1",
    title: "Grocery Shopping",
    category: "Groceries",
    amount: -2450,
    date: "Today, 2:30 PM",
    icon: ShoppingBag,
    type: "expense",
  },
  {
    id: "tx-2",
    title: "Salary Credit",
    category: "Income",
    amount: 67000,
    date: "Yesterday",
    icon: Wallet,
    type: "income",
  },
  {
    id: "tx-3",
    title: "Dinner with Friends",
    category: "Dining Out",
    amount: -1850,
    date: "Nov 01, 2026",
    icon: Utensils,
    type: "expense",
  },
  {
    id: "tx-4",
    title: "Fuel Refill",
    category: "Transport",
    amount: -1200,
    date: "Oct 30, 2026",
    icon: Car,
    type: "expense",
  },
  {
    id: "tx-5",
    title: "House Rent",
    category: "Housing",
    amount: -12000,
    date: "Oct 28, 2026",
    icon: Home,
    type: "expense",
  },
];

const budgetCategories = [
  { name: "Groceries", spent: 6500, limit: 10000, color: "bg-emerald-500" },
  { name: "Dining & Outings", spent: 4500, limit: 5000, color: "bg-amber-500" },
  { name: "Shopping", spent: 8200, limit: 8000, color: "bg-rose-500" },
];

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("this-month");

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Overview of your cash flow, spend breakdown, and recent activity.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={timeRange}
            onValueChange={(value) => {
              if (value !== null) setTimeRange(value);
            }}
          >
            <SelectTrigger className="w-[150px]">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Select Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
            </SelectContent>
          </Select>

          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Add Expense
          </Button>
        </div>
      </div>
      {/* KPI Cards Grid */}
      <DashboardCard />
      {/* Main Content Grid: Charts */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Cashflow Chart (Spans 4 columns) */}
        <GraphCharts />
        {/* Category Breakdown (Spans 3 columns) */}
      </div>
      {/* Bottom Grid: Recent Transactions & Budget Tracking */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Recent Transactions List (Spans 4 columns) */}
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                Latest movements across all accounts
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-full p-2.5 ${
                        tx.type === "income"
                          ? "bg-emerald-500/10 text-emerald-600"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <tx.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        {tx.title}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {tx.category} • {tx.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-semibold ${
                        tx.type === "income"
                          ? "text-emerald-600"
                          : "text-foreground"
                      }`}
                    >
                      {tx.type === "income" ? "+" : ""}₹
                      {Math.abs(tx.amount).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Budget Limits / Quick Watch (Spans 3 columns) */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Budget Limits</CardTitle>
            <CardDescription>Monthly spending targets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {budgetCategories.map((cat) => {
              const percentage = Math.min(
                Math.round((cat.spent / cat.limit) * 100),
                100,
              );
              const isOverBudget = cat.spent > cat.limit;

              return (
                <div key={cat.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{cat.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ₹{cat.spent.toLocaleString()} / ₹
                      {cat.limit.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                  {isOverBudget && (
                    <p className="text-xs font-medium text-rose-500">
                      Exceeded limit by ₹
                      {(cat.spent - cat.limit).toLocaleString()}
                    </p>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
