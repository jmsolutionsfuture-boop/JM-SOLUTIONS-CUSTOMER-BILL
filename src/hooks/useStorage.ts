
import { useState, useEffect, useCallback } from 'react';
import { storage, type Customer, type Invoice, type BusinessSettings, type Product } from '../scripts/storage';

export function useStorage() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [products, setProducts] = useState<Product[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  // Use a predictable default for settings on SSR
  const [settings, setSettings] = useState<BusinessSettings>({
    name: '',
    rif: '',
    address: '',
    phone: '',
    email: '',
    taxPercentage: 16,

    currency: 'USD',
    secondaryCurrency: 'VES',
    exchangeRate: 1
  });

  const refreshData = useCallback(() => {
    setCustomers(storage.getCustomers());

    setProducts(storage.getProducts());
    setInvoices(storage.getInvoices());
    setSettings(storage.getBusinessSettings());
    setLoading(false);
  }, []);

  useEffect(() => {
    // Load actual data only on the client
    refreshData();

    // Listen for storage changes in other tabs/windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key?.includes('invoice_')) {
        refreshData();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Custom event for internal changes (same window)
    const handleInternalChange = () => refreshData();
    window.addEventListener('storage-update', handleInternalChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('storage-update', handleInternalChange);
    };
  }, [refreshData]);

  const notifyChange = () => {
    window.dispatchEvent(new CustomEvent('storage-update'));
  };

  return {
    customers,
    invoices,
    loading,
    products,

    settings,
    refreshData,
    saveCustomer: (customer: any) => {
      const res = storage.saveCustomer(customer);
      notifyChange();
      return res;
    },
    updateCustomer: (id: string, updates: any) => {
      const res = storage.updateCustomer(id, updates);
      notifyChange();
      return res;
    },
    deleteCustomer: (id: string) => {
      const res = storage.deleteCustomer(id);
      notifyChange();
      return res;
    },
    saveProduct: (product: any) => {
      const res = storage.saveProduct(product);
      notifyChange();
      return res;
    },
    updateProduct: (id: string, updates: any) => {
      const res = storage.updateProduct(id, updates);
      notifyChange();
      return res;
    },
    deleteProduct: (id: string) => {
      const res = storage.deleteProduct(id);
      notifyChange();
      return res;
    },
    saveInvoice: (invoice: any) => {
      const res = storage.saveInvoice(invoice);
      notifyChange();
      return res;
    },
    updateInvoice: (id: string, updates: any) => {
      const res = storage.updateInvoice(id, updates);
      notifyChange();
      return res;
    },
    deleteInvoice: (id: string) => {
      const res = storage.deleteInvoice(id);
      notifyChange();
      return res;
    },
    saveSettings: (newSettings: BusinessSettings) => {
      storage.saveBusinessSettings(newSettings);
      notifyChange();
    },
    clearAll: () => {
      storage.clearAll();
      notifyChange();
    },
    getNextInvoiceNumber: () => storage.getNextInvoiceNumber(),
    getCustomer: (id: string) => storage.getCustomer(id),
    getProduct: (id: string) => storage.getProduct(id),
    getInvoice: (id: string) => storage.getInvoice(id),
  };
}
