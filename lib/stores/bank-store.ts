import { create } from "zustand";
import { Account, AccountSummary, Transaction, TransactionFilters, TransactionFormData } from "../types";
import { apiService } from "../api";

interface BankState {
  accounts: Account[];
  transactions: Transaction[];
  selectedAccount: Account | null;
  accountSummary: AccountSummary | null;
  isLoading: boolean;
  error: string | null;
  
  fetchAccounts: () => Promise<void>;
  fetchTransactions: (accountId: string, filters?: TransactionFilters) => Promise<void>;
  fetchAccountSummary: (accountId: string) => Promise<void>;
  createTransaction: (data: TransactionFormData) => Promise<void>;
  selectAccount: (account: Account) => void;
  
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useBankStore = create<BankState>()((set, get) => ({
  accounts: [],
  transactions: [],
  selectedAccount: null,
  accountSummary: null,
  isLoading: false,
  error: null,

  setLoading: (isLoading: boolean) => set({ isLoading }),
  setError: (error: string | null) => set({ error }),

  fetchAccounts: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const data = await apiService.getAccounts();
      set({ accounts: data, isLoading: false });
      
      if (data.length > 0 && !get().selectedAccount) {
        set({ selectedAccount: data[0] });
      }
    } catch (err) {
      set({ 
        error: (err as Error).message,
        isLoading: false 
      });
    }
  },

  fetchTransactions: async (accountId: string, filters?: TransactionFilters) => {
    set({ isLoading: true, error: null });
    
    try {
      const data = await apiService.getTransactions(accountId, filters);
      set({ transactions: data, isLoading: false });
    } catch (err) {
      set({ 
        error: (err as Error).message,
        isLoading: false 
      });
    }
  },

  fetchAccountSummary: async (accountId: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const data = await apiService.getAccountSummary(accountId);
      set({ accountSummary: data, isLoading: false });
    } catch (err) {
      set({ 
        error: (err as Error).message,
        isLoading: false 
      });
    }
  },

  createTransaction: async (data: TransactionFormData) => {
    set({ isLoading: true, error: null });
    
    try {
      await apiService.createTransaction(data);
      
      const { selectedAccount } = get();
      if (selectedAccount) {
        await get().fetchTransactions(selectedAccount.id);
        await get().fetchAccountSummary(selectedAccount.id);
        await get().fetchAccounts(); // Refresh account balance
      }
      
      set({ isLoading: false });
    } catch (err) {
      set({ 
        error: (err as Error).message,
        isLoading: false 
      });
      throw err;
    }
  },

  selectAccount: (account: Account) => {
    set({ selectedAccount: account });
  }
})); 