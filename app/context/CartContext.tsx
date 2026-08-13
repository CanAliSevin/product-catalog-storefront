"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface CartItem {
    id: string;
    name: string;
    price: number;
    imageUrl: string | null;
    quantity: number;
}
interface CartContextType {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "quantity">) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    totalCount: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "quantity">) => void;
    removeItem: (id: string) => void;
    totalCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem("cart");
        if (stored) {
            setItems(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items));
    }, [items]);
    function updateQuantity(id: string, quantity: number) {
        if (quantity <= 0) {
            removeItem(id);
            return;
        }
        setItems((prev) =>
            prev.map((i) => (i.id === id ? { ...i, quantity } : i))
        );
    }
    function addItem(item: Omit<CartItem, "quantity">) {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];


        });
    }

    function removeItem(id: string) {
        setItems((prev) => prev.filter((i) => i.id !== id));
    }

    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, totalCount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart, CartProvider içinde kullanılmalı");
    }
    return context;
}