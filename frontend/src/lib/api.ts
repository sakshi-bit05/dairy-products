const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

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
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        console.error(`API Error: ${response.status} - Failed to fetch products`);
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  getProduct: async (id: string): Promise<Product> => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      if (!response.ok) {
        console.error(`API Error: ${response.status} - Failed to fetch product ${id}`);
        throw new Error(`Failed to fetch product: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  },

  getProductsByCategory: async (category: string): Promise<Product[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
      if (!response.ok) {
        console.error(`API Error: ${response.status} - Failed to fetch products for category ${category}`);
        throw new Error(`Failed to fetch products by category: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error);
      throw error;
    }
  },

  // Categories
  getCategories: async (): Promise<Category[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/categories/all`);
      if (!response.ok) {
        console.error(`API Error: ${response.status} - Failed to fetch categories`);
        throw new Error(`Failed to fetch categories: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Health check
  healthCheck: async (): Promise<{ status: string; message: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      if (!response.ok) {
        console.error(`API Error: ${response.status} - Backend health check failed`);
        throw new Error(`Backend not available: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Backend health check error:', error);
      throw error;
    }
  }
};
