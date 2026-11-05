import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Expense } from "./expense.types";
import { addExpense, fetchExpense } from "./expense.api";

interface ExpenseState {
  transactions: Expense[];
  monthlyExpenses: number;
  monthlyIncome: number;
  totalSpending: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ExpenseState = {
  transactions: [],
  monthlyExpenses: 0,
  monthlyIncome: 0,
  totalSpending: 0,
  status: "idle",
  error: null,
};

// Async thunk to fetch transactions
export const fetchTransactions = createAsyncThunk(
  "expense/fetchTransactions",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchExpense();
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch transactions");
    }
  },
);

// Async thunk to add a new transaction
export const addTransaction = createAsyncThunk(
  "expense/addTransaction",
  async (newTransaction: Expense, { rejectWithValue }) => {
    try {
      return await addExpense(newTransaction);
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to add transaction");
    }
  },
);

const calculateExpenseTotal = (transactions: Expense[]) => {
  return transactions.reduce(
    (total, transaction) =>
      transaction.type?.toLowerCase() === "expense"
        ? total + Number(transaction.amount)
        : total,
    0,
  );
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
          console.log("Action Payload: ", action.payload);
          console.log("Action Payload: ", state.transactions);
          state.totalSpending = calculateExpenseTotal(state.transactions);
          console.log("state.totalSpending: ", state.totalSpending);
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
          state.totalSpending = calculateExpenseTotal(state.transactions);
        },
      );
  },
});

// export const {  } = expenseSlice.actions;

export default expenseSlice.reducer;
