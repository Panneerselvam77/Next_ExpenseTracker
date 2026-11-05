import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
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
export const addTransaction = createAsyncThunk(
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
      .addCase(fetchTransactions.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchTransactions.fulfilled,
        (state, action: PayloadAction<Expense[]>) => {
          state.status = "succeeded";
          state.transactions = action.payload;
          state.totalSpending = totalExpense(state.transactions);
          state.totalIncome = totalIncome(state.transactions);
          state.total = totalAmout(state.transactions);
        },
      )
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      // Add Transaction cases
      .addCase(
        addTransaction.fulfilled,
        (state, action: PayloadAction<Expense[]>) => {
          state.transactions.push(...action.payload);
          state.totalSpending = totalExpense(state.transactions);
          state.totalIncome = totalIncome(state.transactions);
          state.total = totalAmout(state.transactions);
        },
      )
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
