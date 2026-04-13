const API_BASE_URL = 'http://localhost:3001/api';

export interface Product {
  id: string;
  name_en: string;
  name_mr: string;
  price: number;
  description_en: string;
  description_mr: string;
  category: string;
  category_mr: string;
  image: string;
  ingredients_en: string;
  ingredients_mr: string;
  nutrition: string;
  expiry: string;
  expiry_mr: string;
  storage_en: string;
  storage_mr: string;
  sizes: string[];
}

export interface Category {
  en: string;
  mr: string;
}

// API functions
export const api = {
  // Products
  getProducts: async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  },

  getProduct: async (id: string): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return response.json();
  },

  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products by category');
    }
    return response.json();
  },

  // Categories
  getCategories: async (): Promise<Category[]> => {
    const response = await fetch(`${API_BASE_URL}/products/categories/all`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return response.json();
  },

  // Health check
  healthCheck: async (): Promise<{ status: string; message: string }> => {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) {
      throw new Error('Backend not available');
    }
    return response.json();
  }
};
