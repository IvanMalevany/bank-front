import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Transaction, TransactionType } from "./types"

/**
 * Merge Tailwind CSS classes using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Format currency values with appropriate symbol
 */
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

/**
 * Format date strings to localized format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

/**
 * Get simple date string (YYYY-MM-DD) for input fields
 */
export function getInputDateString(dateString?: string): string {
  const date = dateString ? new Date(dateString) : new Date()
  return date.toISOString().split('T')[0]
}

/**
 * Get transaction type based on amount and user account
 */
export function getTransactionType(transaction: Transaction, accountName: string): TransactionType {
  if (transaction.sender === accountName && transaction.receiver === accountName) {
    return 'transfer'
  }
  
  if (transaction.sender === accountName) {
    return 'expense'
  }
  
  return 'income'
}

/**
 * Get CSS class based on transaction type
 */
export function getTransactionTypeClass(type: TransactionType): string {
  switch (type) {
    case 'expense':
      return 'text-red-600'
    case 'income':
      return 'text-green-600'
    case 'transfer':
      return 'text-blue-600'
    default:
      return ''
  }
}

/**
 * Format transaction amount with +/- sign and appropriate color class
 */
export function formatTransactionAmount(amount: number, type: TransactionType): string {
  if (type === 'expense') {
    return `-${formatCurrency(Math.abs(amount))}`
  }
  
  if (type === 'income') {
    return `+${formatCurrency(Math.abs(amount))}`
  }
  
  return formatCurrency(amount)
}
