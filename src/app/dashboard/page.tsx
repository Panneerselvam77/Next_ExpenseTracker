"use client";

import { useState } from "react";
import {
  IndianRupee,
  TrendingUp,
  TrendingDown,
  Wallet,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  CreditCard,
  Utensils,
  ShoppingBag,
  Car,
  Home,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock Data
const overviewData = [
  { month: "Jan", income: 45000, expense: 28000 },
  { month: "Feb", income: 52000, expense: 31000 },
  { month: "Mar", income: 48000, expense: 26000 },
  { month: "Apr", income: 61000, expense: 34000 },
  { month: "May", income: 55000, expense: 29000 },
  { month: "Jun", income: 67000, expense: 32500 },
];

const categoryData = [
  { name: "Housing", value: 12000, color: "#2563eb" },
  { name: "Groceries", value: 6500, color: "#16a34a" },
  { name: "Transport", value: 3500, color: "#d97706" },
  { name: "Dining Out", value: 4500, color: "#dc2626" },
  { name: "Utilities", value: 6000, color: "#9333ea" },
];

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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Balance
            </CardTitle>
            <div className="rounded-md bg-primary/10 p-2 text-primary">
              <Wallet className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹1,42,850</div>
            <p className="mt-1 flex items-center text-xs text-emerald-600">
              <ArrowUpRight className="mr-1 h-3 w-3" /> +8.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Monthly Income
            </CardTitle>
            <div className="rounded-md bg-emerald-500/10 p-2 text-emerald-600">
              <TrendingUp className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹67,000</div>
            <p className="mt-1 flex items-center text-xs text-emerald-600">
              <ArrowUpRight className="mr-1 h-3 w-3" /> +12% vs average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Expenses
            </CardTitle>
            <div className="rounded-md bg-rose-500/10 p-2 text-rose-600">
              <TrendingDown className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹32,500</div>
            <p className="mt-1 flex items-center text-xs text-rose-600">
              <ArrowUpRight className="mr-1 h-3 w-3" /> +4.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Net Savings
            </CardTitle>
            <div className="rounded-md bg-blue-500/10 p-2 text-blue-600">
              <IndianRupee className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹34,500</div>
            <p className="mt-1 text-xs text-muted-foreground">
              51.5% savings rate this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid: Charts */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Cashflow Chart (Spans 4 columns) */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Income vs Expenses</CardTitle>
            <CardDescription>
              Visualizing your cash flow over time
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={overviewData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="incomeGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="expenseGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis
                    dataKey="month"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    tickFormatter={(value) => `₹${value / 1000}k`}
                  />
                  <Tooltip
                    formatter={(value) => [
                      value == null ? "" : `₹${Number(value).toLocaleString()}`,
                      "",
                    ]}
                    contentStyle={{ borderRadius: "8px" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="income"
                    stroke="#16a34a"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#incomeGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="expense"
                    stroke="#dc2626"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#expenseGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown (Spans 3 columns) */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
            <CardDescription>Where your money went this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) =>
                      value == null ? "" : `₹${Number(value).toLocaleString()}`
                    }
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              {categoryData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-muted-foreground">{item.name}:</span>
                  <span className="font-semibold">
                    ₹{item.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
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
