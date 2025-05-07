"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AccountSummary } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

type AccountSummaryCardProps = {
  accountSummary: AccountSummary;
};

export function AccountSummaryCard({ accountSummary }: AccountSummaryCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Account Summary</CardTitle>
          <CardDescription>Overview of your account activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Current Balance</h4>
              <p className="text-3xl font-bold">{formatCurrency(accountSummary.balance)}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Total Income</h4>
                <p className="text-xl font-semibold text-green-600">{formatCurrency(accountSummary.statistics.totalIncome)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Total Expenses</h4>
                <p className="text-xl font-semibold text-red-600">{formatCurrency(accountSummary.statistics.totalExpenses)}</p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Net Flow</h4>
              <p className={`text-lg font-semibold ${accountSummary.statistics.netFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(accountSummary.statistics.netFlow)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
          <CardDescription>Your account information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Account Name</h4>
              <p className="font-medium">{accountSummary.name}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Account Number</h4>
              <p className="font-medium">{accountSummary.accountNumber}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Account Type</h4>
              <p className="font-medium capitalize">{accountSummary.type}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Monthly Balance History</h4>
              <div className="mt-2 space-y-2">
                {accountSummary.statistics.monthlyBalances.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{item.month}</span>
                    <span className={`text-sm font-medium ${item.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(item.balance)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 