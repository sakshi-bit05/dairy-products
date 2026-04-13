import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product, defaultProducts } from "@/data/products";

interface ProductContextType {
  products: Product[];
  addProduct: (p: Omit<Product, "id">) => void;
  updateProduct: (id: string, p: Omit<Product, "id">) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem("dairy_products");
    return saved ? JSON.parse(saved) : defaultProducts;
  });

  const save = (p: Product[]) => {
    setProducts(p);
    localStorage.setItem("dairy_products", JSON.stringify(p));
  };

  const addProduct = (p: Omit<Product, "id">) => {
    const newP = { ...p, id: Date.now().toString() } as Product;
    save([...products, newP]);
  };

  const updateProduct = (id: string, p: Omit<Product, "id">) => {
    save(products.map((x) => (x.id === id ? { ...p, id } as Product : x)));
  };

  const deleteProduct = (id: string) => {
    save(products.filter((x) => x.id !== id));
  };

  const getProduct = (id: string) => products.find((x) => x.id === id);

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, getProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be inside ProductProvider");
  return ctx;
};
