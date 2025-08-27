"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Transaction, TransactionType } from "@/lib/types";
import { formatCurrency, formatDate, getTransactionTypeClass } from "@/lib/utils";

type TransactionsTableProps = {
  transactions: Transaction[];
  accountName: string;
};

export function TransactionsTable({ transactions, accountName }: TransactionsTableProps) {
  if (!transactions.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No transactions found.</p>
      </div>
    );
  }

  const getDisplayAmount = (transaction: Transaction): { amount: string; type: TransactionType } => {
    if (transaction.receiver === accountName && transaction.sender !== accountName) {
      return {
        amount: `+${formatCurrency(Math.abs(transaction.amount))}`,
        type: 'income',
      };
    } else if (transaction.sender === accountName && transaction.receiver !== accountName) {
      return {
        amount: `-${formatCurrency(Math.abs(transaction.amount))}`,
        type: 'expense',
      };
    } else {
      return {
        amount: formatCurrency(transaction.amount),
        type: 'transfer',
      };
    }
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Sender</TableHead>
            <TableHead>Receiver</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => {
            const { amount, type } = getDisplayAmount(transaction);
            
            return (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{formatDate(transaction.date)}</TableCell>
                <TableCell>{transaction.message}</TableCell>
                <TableCell>{transaction.sender}</TableCell>
                <TableCell>{transaction.receiver}</TableCell>
                <TableCell className={`text-right ${getTransactionTypeClass(type)}`}>
                  {amount}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
} 