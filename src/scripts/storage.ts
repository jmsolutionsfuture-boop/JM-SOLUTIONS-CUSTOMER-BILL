// Types
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  rif: string;
  createdAt: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  taxPercentage: number;
  total: number;
  date: string;
  dueDate: string;
  status: 'draft' | 'sent' | 'paid';
  notes?: string;
}

export interface BusinessSettings {
  name: string;
  rif: string;
  address: string;
  phone: string;
  email: string;
  logo?: string;
  signature?: string;
  taxPercentage: number;
  currency: string;
}

// Storage Service
class StorageService {
  private CUSTOMERS_KEY = 'invoice_customers';
  private INVOICES_KEY = 'invoice_invoices';
  private BUSINESS_KEY = 'invoice_business';

  // Customers
  getCustomers(): Customer[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(this.CUSTOMERS_KEY);
    return data ? JSON.parse(data) : [];
  }

  getCustomer(id: string): Customer | null {
    const customers = this.getCustomers();
    return customers.find(c => c.id === id) || null;
  }

  saveCustomer(customer: Omit<Customer, 'id' | 'createdAt'>): Customer {
    const customers = this.getCustomers();
    const newCustomer: Customer = {
      ...customer,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    customers.push(newCustomer);
    localStorage.setItem(this.CUSTOMERS_KEY, JSON.stringify(customers));
    return newCustomer;
  }

  updateCustomer(id: string, updates: Partial<Customer>): Customer | null {
    const customers = this.getCustomers();
    const index = customers.findIndex(c => c.id === id);
    if (index === -1) return null;
    
    customers[index] = { ...customers[index], ...updates };
    localStorage.setItem(this.CUSTOMERS_KEY, JSON.stringify(customers));
    return customers[index];
  }

  deleteCustomer(id: string): boolean {
    const customers = this.getCustomers();
    const filtered = customers.filter(c => c.id !== id);
    if (filtered.length === customers.length) return false;
    
    localStorage.setItem(this.CUSTOMERS_KEY, JSON.stringify(filtered));
    return true;
  }

  // Invoices
  getInvoices(): Invoice[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(this.INVOICES_KEY);
    return data ? JSON.parse(data) : [];
  }

  getInvoice(id: string): Invoice | null {
    const invoices = this.getInvoices();
    return invoices.find(i => i.id === id) || null;
  }

  getInvoicesByCustomer(customerId: string): Invoice[] {
    const invoices = this.getInvoices();
    return invoices.filter(i => i.customerId === customerId);
  }

  getNextInvoiceNumber(): string {
    const invoices = this.getInvoices();
    const numbers = invoices
      .map(i => parseInt(i.invoiceNumber.replace(/\D/g, '')))
      .filter(n => !isNaN(n));
    
    const maxNumber = numbers.length > 0 ? Math.max(...numbers) : 0;
    return `FAC-${String(maxNumber + 1).padStart(5, '0')}`;
  }

  saveInvoice(invoice: Omit<Invoice, 'id'>): Invoice {
    const invoices = this.getInvoices();
    const newInvoice: Invoice = {
      ...invoice,
      id: crypto.randomUUID(),
    };
    invoices.push(newInvoice);
    localStorage.setItem(this.INVOICES_KEY, JSON.stringify(invoices));
    return newInvoice;
  }

  updateInvoice(id: string, updates: Partial<Invoice>): Invoice | null {
    const invoices = this.getInvoices();
    const index = invoices.findIndex(i => i.id === id);
    if (index === -1) return null;
    
    invoices[index] = { ...invoices[index], ...updates };
    localStorage.setItem(this.INVOICES_KEY, JSON.stringify(invoices));
    return invoices[index];
  }

  deleteInvoice(id: string): boolean {
    const invoices = this.getInvoices();
    const filtered = invoices.filter(i => i.id !== id);
    if (filtered.length === invoices.length) return false;
    
    localStorage.setItem(this.INVOICES_KEY, JSON.stringify(filtered));
    return true;
  }

  // Business Settings
  getBusinessSettings(): BusinessSettings {
    if (typeof window === 'undefined') {
      return this.getDefaultSettings();
    }
    const data = localStorage.getItem(this.BUSINESS_KEY);
    return data ? JSON.parse(data) : this.getDefaultSettings();
  }

  saveBusinessSettings(settings: BusinessSettings): void {
    localStorage.setItem(this.BUSINESS_KEY, JSON.stringify(settings));
  }

  private getDefaultSettings(): BusinessSettings {
    return {
      name: 'Mi Empresa',
      rif: 'J-00000000-0',
      address: 'Dirección de la empresa',
      phone: '+58 412-0000000',
      email: 'info@miempresa.com',
      taxPercentage: 16,
      currency: 'USD'
    };
  }

  // Utility
  clearAll(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.CUSTOMERS_KEY);
    localStorage.removeItem(this.INVOICES_KEY);
    localStorage.removeItem(this.BUSINESS_KEY);
  }
}

export const storage = new StorageService();
