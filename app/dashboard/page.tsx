"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useBankStore } from "@/lib/stores/bank-store";
import { useAuthStore } from "@/lib/stores/auth-store";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { accounts, fetchAccounts, isLoading, error } = useBankStore();
  const { user } = useAuthStore();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initializeData = async () => {
      try {
        await fetchAccounts();
      } catch (err) {
        toast.error("Failed to load accounts");
      } finally {
        setInitialized(true);
      }
    };

    if (!initialized) {
      initializeData();
    }
  }, [fetchAccounts, initialized]);

  if (!initialized || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-center">
          <p className="text-lg font-medium">Loading your accounts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.firstName} {user?.lastName}! Here's your financial overview.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}

      {accounts.length === 0 ? (
        <div className="p-8 text-center bg-gray-50 rounded-lg border border-dashed">
          <h3 className="font-medium text-lg mb-2">No Accounts Found</h3>
          <p className="text-muted-foreground mb-4">You don't have any bank accounts yet.</p>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Accounts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accounts.map((account) => (
              <Link href={`/dashboard/account/${account.id}`} key={account.id}>
                <Card className="h-full transition-all hover:shadow-md">
                  <CardHeader>
                    <CardTitle>{account.name}</CardTitle>
                    <CardDescription>
                      Account #{account.accountNumber}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-2">
                      {formatCurrency(account.balance)}
                    </div>
                    <p className="text-sm text-muted-foreground capitalize">
                      {account.type} Account
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 