"use client";

import { useState } from "react";
import { toast } from "sonner";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Account, TransactionFormData, TransactionType } from "@/lib/types";
import { getInputDateString } from "@/lib/utils";

type TransactionFormProps = {
  accounts: Account[];
  selectedAccount: Account;
  onAddTransaction: (data: TransactionFormData) => Promise<void>;
};

export function TransactionForm({ accounts, selectedAccount, onAddTransaction }: TransactionFormProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [type, setType] = useState<TransactionType>("expense");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(getInputDateString());
  const [sender, setSender] = useState(selectedAccount.name);
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");

  const handleTypeChange = (newType: TransactionType) => {
    setType(newType);
    
    if (newType === "expense") {
      setSender(selectedAccount.name);
      setReceiver("");
    } else if (newType === "income") {
      setSender("");
      setReceiver(selectedAccount.name);
    } else if (newType === "transfer") {
      setSender(selectedAccount.name);
      const otherAccount = accounts.find(acc => acc.id !== selectedAccount.id);
      setReceiver(otherAccount ? otherAccount.name : "");
    }
  };

  const resetForm = () => {
    setType("expense");
    setAmount("");
    setDate(getInputDateString());
    setSender(selectedAccount.name);
    setReceiver("");
    setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    if (!sender) {
      toast.error("Please enter a sender");
      return;
    }
    
    if (!receiver) {
      toast.error("Please enter a receiver");
      return;
    }
    
    if (!date) {
      toast.error("Please select a date");
      return;
    }
    
    const data: TransactionFormData = {
      accountId: selectedAccount.id,
      amount: parseFloat(amount),
      date: new Date(date).toISOString(),
      sender,
      receiver,
      message,
      type,
    };
    
    setIsLoading(true);
    
    try {
      await onAddTransaction(data);
      toast.success("Transaction added successfully!");
      resetForm();
      setOpen(false);
    } catch (error) {
      toast.error("Failed to add transaction");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen);
      if (newOpen) {
        resetForm();
      }
    }}>
      <DialogTrigger asChild>
        <Button className="bg-yellow-600 hover:bg-yellow-700">
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="type">Transaction Type</Label>
            <select 
              id="type"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={type}
              onChange={(e) => handleTypeChange(e.target.value as TransactionType)}
              disabled={isLoading}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
              <option value="transfer">Transfer</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input 
              id="amount"
              type="number" 
              step="0.01"
              min="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sender">From</Label>
              <Input 
                id="sender"
                placeholder="Sender"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                disabled={isLoading || type === "income"}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="receiver">To</Label>
              <Input 
                id="receiver"
                placeholder="Receiver"
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
                disabled={isLoading || type === "expense"}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Transaction Date</Label>
            <Input 
              id="date"
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Description</Label>
            <Input 
              id="message"
              placeholder="Transaction description"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isLoading}
            />
          </div>
          
          <div className="flex justify-end pt-4">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              {isLoading ? "Adding..." : "Add Transaction"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 