"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/hooks/hooks";

export default function DisplayCard() {
  const { totalSpending } = useAppSelector((state) => state.expense);

  return (
    <div>
      <Card className="relative sm-auto w-full max-w-sm ">
        <CardHeader>
          <CardTitle>Total Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card Content: {totalSpending} </p>
        </CardContent>
      </Card>
    </div>
  );
}
