"use client";

import { useState, type FormEvent } from "react";
import { format } from "date-fns";
import { Pencil, RotateCcw } from "lucide-react";
import { DatePicker } from "@/components/transactions/DatePicker";
import { ComboboxBasic } from "@/components/transactions/ComboBox";
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
import { useAppDispatch } from "@/hooks/hooks";
import { updateTransaction } from "@/features/expense/expense.slice";
import type { Expense } from "@/features/expense/expense.types";
import { getApiRequestErrorMessage } from "@/lib/api/errors";
import { category, subcategory } from "@/mock/mock";

const transactionTypes = ["INCOME", "EXPENSE"] as const;

interface TransactionFormData {
  type: string;
  date: string;
  category: string;
  subcategory: string;
  description: string;
  amount: string;
}

interface UpdateFormProps {
  transaction: Expense;
  onUpdated: () => void;
  onCancel: () => void;
}

function getTransactionDate(transaction: Expense): string {
  const value = transaction.date ?? transaction.createdat ?? "";
  if (!value) return "";

  const datePart = value.slice(0, 10);
  const date = new Date(`${datePart}T00:00:00`);
  return Number.isNaN(date.getTime()) ? "" : datePart;
}

function getInitialFormData(transaction: Expense): TransactionFormData {
  return {
    type: transaction.type.toUpperCase(),
    date: getTransactionDate(transaction),
    category: transaction.category,
    subcategory: transaction.subcategory,
    description: transaction.description ?? "",
    amount: String(transaction.amount),
  };
}

export default function UpdateForm({
  transaction,
  onUpdated,
  onCancel,
}: UpdateFormProps) {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState(() =>
    getInitialFormData(transaction),
  );
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const amount = Number(formData.amount);
    if (
      !formData.type ||
      !formData.date ||
      !formData.category.trim() ||
      !formData.subcategory.trim() ||
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      setError("Enter a valid type, date, category, subcategory, and amount.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      await dispatch(
        updateTransaction({
          id: transaction.id,
          changes: {
            type: formData.type,
            date: formData.date,
            category: formData.category.trim(),
            subcategory: formData.subcategory.trim(),
            description: formData.description.trim(),
            amount,
          },
        }),
      ).unwrap();
      onUpdated();
    } catch (updateError) {
      setError(
        getApiRequestErrorMessage(
          updateError,
          "Unable to update this transaction. Please try again.",
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  function resetForm() {
    setFormData(getInitialFormData(transaction));
    setError(null);
  }

  const transactionDate = formData.date
    ? new Date(`${formData.date}T00:00:00`)
    : null;
  const categories = [
    ...new Set([
      ...category,
      ...(formData.category ? [formData.category] : []),
    ]),
  ];
  const subcategories = [
    ...new Set([
      ...subcategory,
      ...(formData.subcategory ? [formData.subcategory] : []),
    ]),
  ];

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Pencil aria-hidden="true" className="size-5 text-primary" />
          Edit Transaction
        </CardTitle>
        <CardDescription>
          Update the details for transaction #
          {transaction.invoice ?? transaction.id}.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
          <Field>
            <FieldLabel htmlFor="update-transaction-type">
              Transaction Type
            </FieldLabel>
            <ComboboxBasic
              id="update-transaction-type"
              dropdowninput={transactionTypes}
              value={formData.type}
              onValueChange={(type) =>
                setFormData((current) => ({ ...current, type: type ?? "" }))
              }
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="update-transaction-date">Date</FieldLabel>
            <DatePicker
              id="update-transaction-date"
              value={transactionDate}
              onDateChange={(date) =>
                setFormData((current) => ({
                  ...current,
                  date: date ? format(date, "yyyy-MM-dd") : "",
                }))
              }
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="update-transaction-category">
              Category
            </FieldLabel>
            <ComboboxBasic
              id="update-transaction-category"
              dropdowninput={categories}
              value={formData.category}
              onValueChange={(value) =>
                setFormData((current) => ({
                  ...current,
                  category: value ?? "",
                }))
              }
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="update-transaction-subcategory">
              Subcategory
            </FieldLabel>
            <ComboboxBasic
              id="update-transaction-subcategory"
              dropdowninput={subcategories}
              value={formData.subcategory}
              onValueChange={(value) =>
                setFormData((current) => ({
                  ...current,
                  subcategory: value ?? "",
                }))
              }
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="update-transaction-description">
              Description
            </FieldLabel>
            <Input
              id="update-transaction-description"
              type="text"
              placeholder="Add a description"
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
            <FieldLabel htmlFor="update-transaction-amount">
              Amount ($)
            </FieldLabel>
            <Input
              id="update-transaction-amount"
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
              className="rounded-md bg-destructive/10 p-3 text-sm font-medium text-destructive"
            >
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
              disabled={isSubmitting}
              title="Reset changes"
            >
              <RotateCcw aria-hidden="true" className="mr-2 size-4" />
              Reset
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
