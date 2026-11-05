import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/auth.slice";
import expenseReducer from "@/features/expense/expense.slice";

export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      expense: expenseReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
