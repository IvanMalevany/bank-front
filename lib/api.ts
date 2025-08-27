import { 
  Account, 
  AccountSummary, 
  LoginFormData, 
  LoginResponse, 
  Transaction, 
  TransactionFilters, 
  TransactionFormData 
} from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

class ApiService {
  private token: string | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  clearToken(): void {
    this.token = null;
    localStorage.removeItem('token');
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  async login(data: LoginFormData): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Login failed');
    }

    this.setToken(result.token);
    return result;
  }

  async getAccounts(): Promise<Account[]> {
    const response = await fetch(`${API_URL}/user/accounts`, {
      headers: this.getHeaders(),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch accounts');
    }

    return result;
  }

  async getAccountSummary(accountId: string): Promise<AccountSummary> {
    const response = await fetch(`${API_URL}/account/${accountId}/summary`, {
      headers: this.getHeaders(),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch account summary');
    }

    return result;
  }

  async getTransactions(accountId: string, filters?: TransactionFilters): Promise<Transaction[]> {
    let url = `${API_URL}/account/${accountId}/transactions`;
    
    if (filters) {
      const queryParams = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, String(value));
        }
      });
      
      if (queryParams.toString()) {
        url += `?${queryParams.toString()}`;
      }
    }
    
    const response = await fetch(url, {
      headers: this.getHeaders(),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch transactions');
    }

    return result;
  }

  async createTransaction(data: TransactionFormData): Promise<Transaction> {
    const response = await fetch(`${API_URL}/transactions`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to create transaction');
    }

    return result;
  }
}

export const apiService = new ApiService(); 