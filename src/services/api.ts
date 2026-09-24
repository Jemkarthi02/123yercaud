import { Business, Category, BusinessInquiry, CityEvent } from '../types';

const API_BASE = 'https://xiadot.com/123yercaud_backend/api';

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok || data.success === false) {
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }
  return data;
}

export const api = {
  auth: {
    login: async (username: string, password: string) => {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      return handleResponse<{ success: boolean; message: string; user: any; token: string }>(res);
    },
    changePassword: async (username: string, currentPassword: string, newPassword: string) => {
      const res = await fetch(`${API_BASE}/auth/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, currentPassword, newPassword })
      });
      return handleResponse<{ success: boolean; message: string }>(res);
    }
  },

  businesses: {
    getAll: async (): Promise<Business[]> => {
      const res = await fetch(`${API_BASE}/businesses`);
      const data = await handleResponse<{ success: boolean; data: Business[] }>(res);
      return data.data;
    },
    create: async (biz: Business): Promise<Business> => {
      const res = await fetch(`${API_BASE}/businesses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(biz)
      });
      const data = await handleResponse<{ success: boolean; data: Business }>(res);
      return data.data;
    },
    update: async (id: string, biz: Business): Promise<Business> => {
      const res = await fetch(`${API_BASE}/businesses/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(biz)
      });
      const data = await handleResponse<{ success: boolean; data: Business }>(res);
      return data.data;
    },
    delete: async (id: string): Promise<boolean> => {
      const res = await fetch(`${API_BASE}/businesses/${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });
      await handleResponse<{ success: boolean }>(res);
      return true;
    }
  },

  inquiries: {
    getAll: async (): Promise<BusinessInquiry[]> => {
      const res = await fetch(`${API_BASE}/inquiries`);
      const data = await handleResponse<{ success: boolean; data: BusinessInquiry[] }>(res);
      return data.data;
    },
    create: async (inq: BusinessInquiry): Promise<BusinessInquiry> => {
      const res = await fetch(`${API_BASE}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inq)
      });
      const data = await handleResponse<{ success: boolean; data: BusinessInquiry }>(res);
      return data.data;
    },
    updateStatus: async (id: string, status: BusinessInquiry['status'], notes?: string): Promise<BusinessInquiry> => {
      const res = await fetch(`${API_BASE}/inquiries/${encodeURIComponent(id)}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes })
      });
      const data = await handleResponse<{ success: boolean; data: BusinessInquiry }>(res);
      return data.data;
    },
    delete: async (id: string): Promise<boolean> => {
      const res = await fetch(`${API_BASE}/inquiries/${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });
      await handleResponse<{ success: boolean }>(res);
      return true;
    }
  },

  events: {
    getAll: async (): Promise<CityEvent[]> => {
      const res = await fetch(`${API_BASE}/events`);
      const data = await handleResponse<{ success: boolean; data: CityEvent[] }>(res);
      return data.data;
    },
    create: async (event: CityEvent): Promise<CityEvent> => {
      const res = await fetch(`${API_BASE}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      });
      const data = await handleResponse<{ success: boolean; data: CityEvent }>(res);
      return data.data;
    },
    update: async (id: string, event: CityEvent): Promise<CityEvent> => {
      const res = await fetch(`${API_BASE}/events/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      });
      const data = await handleResponse<{ success: boolean; data: CityEvent }>(res);
      return data.data;
    },
    delete: async (id: string): Promise<boolean> => {
      const res = await fetch(`${API_BASE}/events/${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });
      await handleResponse<{ success: boolean }>(res);
      return true;
    }
  },

  taxonomy: {
    get: async (): Promise<{ categories: Category[]; localities: string[] }> => {
      const res = await fetch(`${API_BASE}/taxonomy`);
      const data = await handleResponse<{ success: boolean; data: { categories: Category[]; localities: string[] } }>(res);
      return data.data;
    },
    createCategory: async (category: Category): Promise<Category> => {
      const res = await fetch(`${API_BASE}/taxonomy/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category)
      });
      const data = await handleResponse<{ success: boolean; data: Category }>(res);
      return data.data;
    },
    deleteCategory: async (name: string): Promise<boolean> => {
      const res = await fetch(`${API_BASE}/taxonomy/categories/${encodeURIComponent(name)}`, {
        method: 'DELETE'
      });
      await handleResponse<{ success: boolean }>(res);
      return true;
    },
    addSubcategory: async (categoryName: string, subcategory: string): Promise<Category> => {
      const res = await fetch(`${API_BASE}/taxonomy/categories/${encodeURIComponent(categoryName)}/subcategories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subcategory })
      });
      const data = await handleResponse<{ success: boolean; data: Category }>(res);
      return data.data;
    },
    deleteSubcategory: async (categoryName: string, subcategory: string): Promise<Category> => {
      const res = await fetch(
        `${API_BASE}/taxonomy/categories/${encodeURIComponent(categoryName)}/subcategories/${encodeURIComponent(subcategory)}`,
        { method: 'DELETE' }
      );
      const data = await handleResponse<{ success: boolean; data: Category }>(res);
      return data.data;
    },
    addLocality: async (name: string): Promise<string> => {
      const res = await fetch(`${API_BASE}/taxonomy/localities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      const data = await handleResponse<{ success: boolean; locality: string }>(res);
      return data.locality;
    },
    deleteLocality: async (name: string): Promise<boolean> => {
      const res = await fetch(`${API_BASE}/taxonomy/localities/${encodeURIComponent(name)}`, {
        method: 'DELETE'
      });
      await handleResponse<{ success: boolean }>(res);
      return true;
    }
  },

  settings: {
    get: async (): Promise<Record<string, string>> => {
      const res = await fetch(`${API_BASE}/settings`);
      const data = await handleResponse<{ success: boolean; data: Record<string, string> }>(res);
      return data.data;
    },
    update: async (settings: Record<string, string>): Promise<boolean> => {
      const res = await fetch(`${API_BASE}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      await handleResponse<{ success: boolean }>(res);
      return true;
    }
  }
};
