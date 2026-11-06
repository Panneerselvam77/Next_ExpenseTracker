"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/hooks/hooks";
import { Wallet, TrendingDown, TrendingUp } from "lucide-react";

interface DisplayCardTypes {
  cardTitle: string;
  cardDescription: string;
  cardAmount: number;
  cardType: string;
  cardLogo?: string;
}

export default function DisplayCard({ prop }: { prop: DisplayCardTypes }) {
  const { totalSpending } = useAppSelector((state) => state.expense);
  // Card title
  // card amount
  // card description
  return (
    <Card className="w-fit min-w-[200px] max-w-[240px] overflow-hidden border-border/60 shadow-sm transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {prop.cardTitle}
        </CardTitle>
        <div className="p-2 bg-primary/10 rounded-full text-primary">
          <Wallet className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <div className="text-3xl font-bold tracking-tight text-foreground">
            ₹{Number(prop.cardAmount || 0).toFixed(2)}
          </div>
          {prop.cardType === "Expense" ? (
            <span className="text-xs text-rose-500 font-medium flex items-center">
              <TrendingDown className="h-3 w-3 mr-0.5" /> {prop.cardType}
            </span>
          ) : (
            <span className="text-xs text-green-500 font-medium flex items-center">
              <TrendingUp className="h-3 w-3 mr-0.5" /> {prop.cardType}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {prop.cardDescription}
        </p>
      </CardContent>
    </Card>
  );
}
