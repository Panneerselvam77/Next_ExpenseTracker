"use client";

import { useState, type FormEvent } from "react";
import { format } from "date-fns";
import { DatePicker } from "@/components/DatePicker";
import { ComboboxBasic } from "@/components/ComboBox";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, RotateCcw } from "lucide-react";

import { category, subcategory } from "@/mock/mock";
import { addExpense } from "@/features/expense/expense.api";

const transactionTypes = ["INCOME", "EXPENSE"] as const;
const transactionCategories = category;
const transactionSubcategories = subcategory;

interface TransactionFormData {
  id: string;
  type: (typeof transactionTypes)[number] | "";
  date: string;
  category: (typeof transactionCategories)[number] | "";
  subcategory: (typeof transactionSubcategories)[number] | "";
  description: string;
  amount: string;
  createdat: Date | null;
}

const initialFormData: TransactionFormData = {
  id: "",
  type: "",
  date: "",
  category: "",
  subcategory: "",
  description: "",
  amount: "",
  createdat: null,
};

export default function TransactionForm() {
  const [formData, setFormData] =
    useState<TransactionFormData>(initialFormData);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTransactionForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (
        !formData.type ||
        !formData.date ||
        !formData.category ||
        !formData.subcategory ||
        !formData.amount
      ) {
        setError(
          "Please complete all required fields before adding the transaction.",
        );
        return;
      }

      setError(null);
      setIsSubmitting(true);

      const newTransaction = {
        ...formData,
        id: crypto.randomUUID(),
        amount: Number(formData.amount),
        createdat: new Date().toISOString(),
      };

      await addExpense(newTransaction);
      handleClearForm();
    } catch (error) {
      console.log("Error: ", error);
      setError("Failed to save transaction. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearForm = () => {
    setFormData(initialFormData);
    setError(null);
  };

  return (
    <Card className="shadow-sm border-border/60">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl flex items-center gap-2">
          <PlusCircle className="h-5 w-5 text-primary" /> New Transaction
        </CardTitle>
        <CardDescription>
          Record a new income or expense entry into your ledger.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={handleTransactionForm}>
          <Field>
            <FieldLabel htmlFor="transaction-type">Transaction Type</FieldLabel>
            <ComboboxBasic
              id="transaction-type"
              dropdowninput={transactionTypes}
              value={formData.type}
              onValueChange={(type) =>
                setFormData((current) => ({ ...current, type: type ?? "" }))
              }
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="transaction-date">Date</FieldLabel>
            <DatePicker
              id="transaction-date"
              onDateChange={(date) => {
                setFormData((current) => ({
                  ...current,
                  date: date ? format(date, "yyyy-MM-dd") : "",
                }));
                setError(null);
              }}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="transaction-category">Category</FieldLabel>
            <ComboboxBasic
              id="transaction-category"
              dropdowninput={transactionCategories}
              value={formData.category}
              onValueChange={(category) =>
                setFormData((current) => ({
                  ...current,
                  category: category ?? "",
                }))
              }
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="transaction-subcategory">
              Subcategory
            </FieldLabel>
            <ComboboxBasic
              id="transaction-subcategory"
              dropdowninput={transactionSubcategories}
              value={formData.subcategory}
              onValueChange={(subcategory) =>
                setFormData((current) => ({
                  ...current,
                  subcategory: subcategory ?? "",
                }))
              }
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="transaction-description">
              Description
            </FieldLabel>
            <Input
              id="transaction-description"
              type="text"
              placeholder="e.g. Monthly grocery run"
              value={formData.description}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="transaction-amount">Amount ($)</FieldLabel>
            <Input
              id="transaction-amount"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              value={formData.amount}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  amount: event.target.value,
                }))
              }
              required
            />
          </Field>

          {error && (
            <p
              role="alert"
              className="text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-md"
            >
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Transaction"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleClearForm}
              title="Reset Form"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
