// src/context/CartContext.js
import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items,    setItems]    = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toasts,   setToasts]   = useState([]);

  const showToast = useCallback((message, type = '') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  const addToCart = useCallback((product) => {
    setItems(prev => {
      const exists = prev.find(i => i._id === product._id);
      return exists
        ? prev.map(i => i._id === product._id ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { ...product, qty: 1 }];
    });
    showToast(`${product.name} added to cart!`, 'success');
  }, [showToast]);

  const updateQty = useCallback((id, qty) => {
    if (qty < 1) {
      setItems(prev => prev.filter(i => i._id !== id));
    } else {
      setItems(prev => prev.map(i => i._id === id ? { ...i, qty } : i));
    }
  }, []);

  const removeFromCart = useCallback((id) => {
    setItems(prev => prev.filter(i => i._id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const totalPrice = items.reduce((s, i) => s + i.price * i.qty, 0);

  // Backward compat aliases
  const cartItems   = items;
  const totalAmount = totalPrice;
  const removeItem  = removeFromCart;

  return (
    <CartContext.Provider value={{
      items, cartItems,
      cartOpen, setCartOpen,
      toasts,
      addToCart, updateQty, removeFromCart, removeItem, clearCart,
      totalItems, totalPrice, totalAmount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
