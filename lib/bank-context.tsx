"use client";

import { createContext, useContext, useState } from "react";
import { Account, AccountSummary, Transaction, TransactionFilters, TransactionFormData } from "./types";
import { apiService } from "./api";

interface BankContextType {
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
}

const BankContext = createContext<BankContextType | undefined>(undefined);

export function BankProvider({ children }: { children: React.ReactNode }) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [accountSummary, setAccountSummary] = useState<AccountSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAccounts = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await apiService.getAccounts();
      setAccounts(data);
      
      // Select first account by default if none is selected
      if (data.length > 0 && !selectedAccount) {
        setSelectedAccount(data[0]);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTransactions = async (accountId: string, filters?: TransactionFilters) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await apiService.getTransactions(accountId, filters);
      setTransactions(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAccountSummary = async (accountId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await apiService.getAccountSummary(accountId);
      setAccountSummary(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const createTransaction = async (data: TransactionFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await apiService.createTransaction(data);
      
      // Refresh transactions for the current account
      if (selectedAccount) {
        await fetchTransactions(selectedAccount.id);
        await fetchAccountSummary(selectedAccount.id);
        await fetchAccounts(); // Refresh account balance
      }
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const selectAccount = (account: Account) => {
    setSelectedAccount(account);
  };

  return (
    <BankContext.Provider
      value={{
        accounts,
        transactions,
        selectedAccount,
        accountSummary,
        isLoading,
        error,
        fetchAccounts,
        fetchTransactions,
        fetchAccountSummary,
        createTransaction,
        selectAccount,
      }}
    >
      {children}
    </BankContext.Provider>
  );
}

export function useBank() {
  const context = useContext(BankContext);
  
  if (context === undefined) {
    throw new Error("useBank must be used within a BankProvider");
  }
  
  return context;
} 