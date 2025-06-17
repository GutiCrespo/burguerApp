import React, { createContext, useContext, useState, ReactNode } from "react";

type ProductItem = {
  id: number;
  name: string;
  price: number;
  photo: string;
  information?: string;
  description?: string;
};

type Combo = {
  id: string;
  name: string;
  burguer?: ProductItem;
  batata?: ProductItem;
  drink?: ProductItem;
  totalPrice: number;
};

type CartItem = Combo & {
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (comboToAdd: Combo) => void;
  removeFromCart: (comboId: string) => void;
  increaseQuantity: (comboId: string) => void;
  decreaseQuantity: (comboId: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (comboToAdd: Combo) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === comboToAdd.id
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        return [...prevItems, { ...comboToAdd, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (comboId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== comboId)
    );
  };

  const increaseQuantity = (comboId: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === comboId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (comboId: string) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === comboId
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};
