"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { AccountSummaryCard } from "@/components/account-summary";
import { TransactionsTable } from "@/components/transactions-table";
import { TransactionFiltersDialog } from "@/components/transaction-filters";
import { TransactionForm } from "@/components/transaction-form";
import { useBankStore } from "@/lib/stores/bank-store";
import { TransactionFilters, TransactionFormData } from "@/lib/types";

export default function AccountDetailPage() {
  const router = useRouter();
  const params = useParams();
  const accountId = params.id as string;
  
  const {
    accounts,
    selectedAccount,
    accountSummary,
    transactions,
    isLoading,
    error,
    fetchAccounts,
    fetchTransactions,
    fetchAccountSummary,
    createTransaction,
    selectAccount
  } = useBankStore();

  const [currentFilters, setCurrentFilters] = useState<TransactionFilters>({
    sortBy: "date",
    sortOrder: "desc"
  });
  const [initialized, setInitialized] = useState(false);

  // Initialize data when the component loads
  useEffect(() => {
    const initializeData = async () => {
      try {
        if (!accounts.length) {
          await fetchAccounts();
        }
        
        // Find the account with the given ID
        const account = accounts.find(acc => acc.id === accountId);
        
        if (account) {
          selectAccount(account);
          await fetchAccountSummary(accountId);
          await fetchTransactions(accountId, currentFilters);
        } else {
          toast.error("Account not found");
          router.push("/dashboard");
        }
      } catch (err) {
        toast.error("Failed to load account data");
      } finally {
        setInitialized(true);
      }
    };

    if (!initialized) {
      initializeData();
    }
  }, [accountId, accounts, initialized, fetchAccounts, fetchAccountSummary, fetchTransactions, selectAccount, router, currentFilters]);

  // Apply filters to transactions
  const handleApplyFilters = (filters: TransactionFilters) => {
    setCurrentFilters(filters);
    
    if (accountId) {
      fetchTransactions(accountId, filters);
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
    const defaultFilters: TransactionFilters = {
      sortBy: "date",
      sortOrder: "desc"
    };
    
    setCurrentFilters(defaultFilters);
    
    if (accountId) {
      fetchTransactions(accountId, defaultFilters);
    }
  };

  // Add a new transaction
  const handleAddTransaction = async (data: TransactionFormData) => {
    await createTransaction(data);
  };

  if (!initialized || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-center">
          <p className="text-lg font-medium">Loading account details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => router.push("/dashboard")}
            className="mb-2"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold">{selectedAccount?.name}</h1>
          <p className="text-muted-foreground">
            Account #{selectedAccount?.accountNumber}
          </p>
        </div>
        
        {selectedAccount && accountSummary && (
          <TransactionForm 
            accounts={accounts}
            selectedAccount={selectedAccount}
            onAddTransaction={handleAddTransaction}
          />
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}

      {accountSummary && (
        <AccountSummaryCard accountSummary={accountSummary} />
      )}

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-semibold">Transactions</h2>
          <TransactionFiltersDialog 
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
          />
        </div>
        
        {selectedAccount && (
          <TransactionsTable 
            transactions={transactions} 
            accountName={selectedAccount.name} 
          />
        )}
      </div>
    </div>
  );
} 