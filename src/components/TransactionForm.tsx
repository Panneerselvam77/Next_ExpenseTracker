"use client";

import { useState, type FormEvent } from "react";
import { format } from "date-fns";
import { DatePicker } from "@/components/DatePicker";
import { ComboboxBasic } from "@/components/ComboBox";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { category, subcategory } from "@/mock/mock";
import { addExpense } from "@/features/expense/expense.api";

const transactionTypes = ["INCOME", "EXPENSE"] as const;
const transactionCategories = category;
const transactionSubcategories = subcategory;

interface TransactionFormData {
  type: (typeof transactionTypes)[number] | "";
  date: string;
  category: (typeof transactionCategories)[number] | "";
  subcategory: (typeof transactionSubcategories)[number] | "";
  description: string;
  amount: string;
}

const initialFormData: TransactionFormData = {
  type: "",
  date: "",
  category: "",
  subcategory: "",
  description: "",
  amount: "",
};

interface TransactionFormProps {
  onTransactionAdded: () => void;
}

export default function TransactionForm({
  onTransactionAdded,
}: TransactionFormProps) {
  const [formData, setFormData] =
    useState<TransactionFormData>(initialFormData);
  const [error, setError] = useState<string | null>(null);

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
        setError("Complete all required fields before adding the transaction.");
        return;
      }

      setError(null);
      console.log("FormData: ", {
        ...formData,
        amount: Number(formData.amount),
        createdAt: Date.now(),
      });

      const newTransaction = {
        ...formData,
        id: Date.now(),
      };

      addExpense(newTransaction);
      handleClearForm();
      onTransactionAdded();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleClearForm = () => {
    setFormData(initialFormData);
  };

  return (
    <form className="flex flex-col gap-4 p-4" onSubmit={handleTransactionForm}>
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
        <FieldLabel htmlFor="transaction-subcategory">Subcategory</FieldLabel>
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
        <FieldLabel htmlFor="transaction-description">Description</FieldLabel>
        <Input
          id="transaction-description"
          type="text"
          placeholder="Add description"
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
        <FieldLabel htmlFor="transaction-amount">Amount</FieldLabel>
        <Input
          id="transaction-amount"
          type="number"
          min="0.01"
          step="0.01"
          placeholder="Add amount"
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
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      <Button type="submit">Add Transaction</Button>
    </form>
  );
}
