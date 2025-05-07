// User types
export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

// Account types
export interface Account {
  id: string;
  userId: string;
  name: string;
  balance: number;
  type: 'current' | 'savings';
  accountNumber: string;
}

// Transaction types
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

// API response types
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

// Filter types
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

// Form types
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