"use client";

import { useState } from "react";
import { FilterIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { TransactionFilters } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type TransactionFiltersProps = {
  onApplyFilters: (filters: TransactionFilters) => void;
  onClearFilters: () => void;
};

export function TransactionFiltersDialog({ onApplyFilters, onClearFilters }: TransactionFiltersProps) {
  const [open, setOpen] = useState(false);
  const [isFiltersApplied, setIsFiltersApplied] = useState(false);
  
  // Form state
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [type, setType] = useState("");
  const [party, setParty] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build filters object
    const filters: TransactionFilters = {
      sortBy: sortBy as "date" | "amount",
      sortOrder: sortOrder as "asc" | "desc"
    };
    
    if (startDate) filters.startDate = startDate;
    if (endDate) filters.endDate = endDate;
    if (minAmount) filters.minAmount = parseFloat(minAmount);
    if (maxAmount) filters.maxAmount = parseFloat(maxAmount);
    if (type) filters.type = type as "expense" | "income" | "transfer";
    if (party) filters.party = party;
    
    onApplyFilters(filters);
    setIsFiltersApplied(Object.keys(filters).length > 2); // More than just sortBy and sortOrder
    setOpen(false);
  };

  const handleClear = () => {
    // Reset all form fields
    setStartDate("");
    setEndDate("");
    setMinAmount("");
    setMaxAmount("");
    setType("");
    setParty("");
    setSortBy("date");
    setSortOrder("desc");
    
    onClearFilters();
    setIsFiltersApplied(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={isFiltersApplied ? "bg-yellow-50 border-yellow-500 text-yellow-700" : ""}
        >
          <FilterIcon className="h-4 w-4 mr-2" />
          {isFiltersApplied ? "Filters Applied" : "Filter Transactions"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Transactions</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">From Date</Label>
              <Input 
                id="startDate"
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">To Date</Label>
              <Input 
                id="endDate"
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minAmount">Min Amount</Label>
              <Input 
                id="minAmount"
                type="number" 
                step="0.01"
                placeholder="0.00"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxAmount">Max Amount</Label>
              <Input 
                id="maxAmount"
                type="number" 
                step="0.01"
                placeholder="1000.00"
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Transaction Type</Label>
            <select 
              id="type"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
              <option value="transfer">Transfer</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="party">Sender/Receiver</Label>
            <Input 
              id="party"
              placeholder="Search for sender or receiver"
              value={party}
              onChange={(e) => setParty(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sortBy">Sort By</Label>
              <select 
                id="sortBy"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sortOrder">Sort Order</Label>
              <select 
                id="sortOrder"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClear}
            >
              Clear Filters
            </Button>
            <Button type="submit">Apply Filters</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 