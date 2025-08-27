export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Account {
  id: string;
  userId: string;
  name: string;
  balance: number;
  type: 'current' | 'savings';
  accountNumber: string;
}

export type TransactionType = 'expense' | 'income' | 'transfer';

export interface Transaction {
  id: string;
  accountId: string;
  date: string;
  amount: number;
  sender: string;
  receiver: string;
  message: string;
  type: TransactionType;
}

export interface LoginResponse {
  user: User;
  token: string;
  success: boolean;
}

export interface AccountSummary extends Account {
  statistics: {
    totalIncome: number;
    totalExpenses: number;
    netFlow: number;
    monthlyBalances: {
      month: string;
      income: number;
      expenses: number;
      netChange: number;
    }[];
  };
}

export interface TransactionFilters {
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
  type?: TransactionType;
  party?: string;
  sortBy?: 'date' | 'amount';
  sortOrder?: 'asc' | 'desc';
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface TransactionFormData {
  accountId: string;
  amount: number;
  sender: string;
  receiver: string;
  message: string;
  date: string;
  type: TransactionType;
} 