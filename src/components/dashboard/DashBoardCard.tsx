import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ArrowUpRight,
  IndianRupee,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";

export default function DashboardCard() {
  return (
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
  );
}
