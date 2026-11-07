import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Expense } from "./expense.types";
import {
  addExpense,
  deleteExp,
  fetchExpense,
  updateExpense,
} from "./expense.api";

interface ExpenseState {
  transactions: Expense[];
  monthlyExpenses: number;
  monthlyIncome: number;
  totalSpending: number;
  totalIncome: number;
  total: number;
  deletingIds: string[];
  transactionsRevision: number;
  lastAddedTransactionId: string | null;
  latestFetchRequestId: string | null;
  fetchRevision: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ExpenseState = {
  transactions: [],
  monthlyExpenses: 0,
  monthlyIncome: 0,
  totalSpending: 0,
  totalIncome: 0,
  total: 0,
  deletingIds: [],
  transactionsRevision: 0,
  lastAddedTransactionId: null,
  latestFetchRequestId: null,
  fetchRevision: 0,
  status: "idle",
  error: null,
};

// Async thunk to fetch transactions
export const fetchTransactions = createAsyncThunk(
  "expense/fetchTransactions",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchExpense();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch transactions",
      );
    }
  },
);

// Async thunk to add a new transaction
export const addTransaction = createAsyncThunk<
  Expense,
  Expense,
  { rejectValue: string }
>(
  "expense/addTransaction",
  async (newTransaction: Expense, { rejectWithValue }) => {
    try {
      return await addExpense(newTransaction);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to add transaction",
      );
    }
  },
);

export const updateTransaction = createAsyncThunk<
  Expense,
  { id: string | number; changes: Partial<Expense> },
  { rejectValue: string }
>("expense/updateTransaction", async ({ id, changes }, { rejectWithValue }) => {
  try {
    return await updateExpense(id, changes);
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Failed to update transaction",
    );
  }
});

export const deleteTransaction = createAsyncThunk<
  string,
  string | number,
  { rejectValue: string }
>("expense/deleteTransaction", async (id, { rejectWithValue }) => {
  const parsedId = String(id);
  try {
    await deleteExp(parsedId);
    return parsedId;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Failed to delete transaction",
    );
  }
});

const totalExpense = (transactions: Expense[]) => {
  return transactions.reduce(
    (total, transaction) =>
      transaction.type?.toLowerCase() === "expense"
        ? total + Number(transaction.amount)
        : total,
    0,
  );
};

const totalIncome = (transactions: Expense[]) => {
  return transactions.reduce(
    (total, transaction) =>
      transaction.type?.toLowerCase() === "income"
        ? total + Number(transaction.amount)
        : total,
    0,
  );
};

const totalAmout = (transactions: Expense[]) => {
  const sum = totalIncome(transactions) - totalExpense(transactions);
  return sum;
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Transactions cases
      .addCase(fetchTransactions.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
        state.latestFetchRequestId = action.meta.requestId;
        state.fetchRevision = state.transactionsRevision;
      })
      .addCase(
        fetchTransactions.fulfilled,
        (state, action) => {
          if (state.latestFetchRequestId !== action.meta.requestId) return;

          state.latestFetchRequestId = null;
          state.status = "succeeded";
          if (state.fetchRevision !== state.transactionsRevision) return;

          const transactions = [...action.payload];
          const lastAddedIndex = transactions.findIndex(
            (transaction) =>
              String(transaction.id) === state.lastAddedTransactionId,
          );
          if (lastAddedIndex > 0) {
            const [lastAddedTransaction] = transactions.splice(lastAddedIndex, 1);
            if (lastAddedTransaction) {
              transactions.unshift(lastAddedTransaction);
            }
          }

          state.transactions = transactions;
          state.totalSpending = totalExpense(state.transactions);
          state.totalIncome = totalIncome(state.transactions);
          state.total = totalAmout(state.transactions);
        },
      )
      .addCase(fetchTransactions.rejected, (state, action) => {
        if (state.latestFetchRequestId !== action.meta.requestId) return;

        state.latestFetchRequestId = null;
        if (state.fetchRevision !== state.transactionsRevision) {
          state.status = "succeeded";
          return;
        }

        state.status = "failed";
        state.error = action.payload as string;
      })
      // Add Transaction cases
      .addCase(addTransaction.pending, (state) => {
        state.error = null;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        const alreadyExists = state.transactions.some(
          (transaction) =>
            String(transaction.id) === String(action.payload.id),
        );
        if (!alreadyExists) {
          state.transactions.unshift(action.payload);
        }
        state.transactionsRevision += 1;
        state.lastAddedTransactionId = String(action.payload.id);
        state.status = "succeeded";
        state.error = null;
        state.totalSpending = totalExpense(state.transactions);
        state.totalIncome = totalIncome(state.transactions);
        state.total = totalAmout(state.transactions);
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.error =
          action.payload ?? action.error.message ?? "Failed to add transaction";
      })
      // Delete
      .addCase(deleteTransaction.pending, (state, action) => {
        const id = String(action.meta.arg);
        if (!state.deletingIds.includes(id)) {
          state.deletingIds.push(id);
        }
        state.error = null;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          (transaction) => String(transaction.id) !== action.payload,
        );
        state.transactionsRevision += 1;
        if (state.lastAddedTransactionId === action.payload) {
          state.lastAddedTransactionId = null;
        }
        state.deletingIds = state.deletingIds.filter(
          (id) => id !== action.payload,
        );
        state.totalSpending = totalExpense(state.transactions);
        state.totalIncome = totalIncome(state.transactions);
        state.total = totalAmout(state.transactions);
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        const id = String(action.meta.arg);
        state.deletingIds = state.deletingIds.filter(
          (deletingId) => deletingId !== id,
        );
        state.error =
          action.payload ??
          action.error.message ??
          "Failed to delete transaction";
      })
      // Update
      .addCase(updateTransaction.pending, (state) => {
        state.error = null;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const index = state.transactions.findIndex(
          (transaction) => String(transaction.id) === String(action.payload.id),
        );
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
        state.transactionsRevision += 1;
        state.totalSpending = totalExpense(state.transactions);
        state.totalIncome = totalIncome(state.transactions);
        state.total = totalAmout(state.transactions);
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.error =
          action.payload ??
          action.error.message ??
          "Failed to update transaction";
      });
  },
});

// export const {  } = expenseSlice.actions;

export default expenseSlice.reducer;
