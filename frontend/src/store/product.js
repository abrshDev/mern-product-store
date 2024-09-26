import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "please provide all fields." };
    }
    const res = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    const data = await res.json();
    console.log(data);
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "products created successfully" };
  },
  fetchProducts: async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    set({ products: data.data });
  },
  deleteProducts: async (pid) => {
    const res = await fetch(`http://localhost:5000/api/products/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);
    if (!data.success) return { success: false, message: data.success };

    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    return { success: true, message: data.message };
  },
  updateProducts: async (pid, updateProduct) => {
    const res = await fetch(`http://localhost:5000/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateProduct),
    });

    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    set((state) => ({
      products: state.products.map((product) =>
        String(product._id) === String(pid)
          ? { ...product, ...data.data }
          : product
      ),
    }));
    return { success: true, message: data.message };
  },
}));
