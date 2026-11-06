import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

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

// Mock
const overviewData = [
  { month: "Jan", income: 45000, expense: 28000 },
  { month: "Feb", income: 52000, expense: 31000 },
  { month: "Mar", income: 48000, expense: 26000 },
  { month: "Apr", income: 61000, expense: 34000 },
  { month: "May", income: 55000, expense: 29000 },
  { month: "Jun", income: 67000, expense: 32500 },
];

export default function GraphCharts() {
  return (
    <Card className="lg:col-span-4">
      <CardHeader>
        <CardTitle>Income vs Expenses</CardTitle>
        <CardDescription>Visualizing your cash flow over time</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={overviewData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
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
  );
}
