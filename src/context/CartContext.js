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

  const addToCart = useCallback((product, customizations = {}) => {
    const { customSize = '', customColor = '', customPhoto = '', customPhotoName = '' } = customizations;
    const cartId = `${product._id}-${customSize}-${customColor}-${customPhoto}`;
    setItems(prev => {
      const exists = prev.find(i => i.cartId === cartId);
      return exists
        ? prev.map(i => i.cartId === cartId ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { ...product, qty: 1, cartId, customSize, customColor, customPhoto, customPhotoName }];
    });
    showToast(`${product.name} added to cart!`, 'success');
  }, [showToast]);

  const updateQty = useCallback((cartId, qty) => {
    if (qty < 1) {
      setItems(prev => prev.filter(i => i.cartId !== cartId));
    } else {
      setItems(prev => prev.map(i => i.cartId === cartId ? { ...i, qty } : i));
    }
  }, []);

  const removeFromCart = useCallback((cartId) => {
    setItems(prev => prev.filter(i => i.cartId !== cartId));
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
