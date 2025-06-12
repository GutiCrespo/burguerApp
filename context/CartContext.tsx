// context/CartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

// Tipagem para um item individual (ex: hamburguer, batata, bebida)
type ProductItem = {
  // Renomeado de 'Item' para 'ProductItem' para clareza
  id: number;
  name: string;
  price: number;
  photo: string;
  information?: string;
  description?: string;
};

// Tipagem para um combo
type Combo = {
  id: string; // ID único para o combo
  name: string; // Nome do combo
  burguer?: ProductItem; // <--- AGORA OPCIONAL
  batata?: ProductItem; // <--- AGORA OPCIONAL
  drink?: ProductItem; // <--- AGORA OPCIONAL
  totalPrice: number;
};

// Tipagem para um item DENTRO do carrinho (inclui a quantidade)
type CartItem = Combo & {
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[]; // O carrinho agora armazena CartItem[]
  addToCart: (comboToAdd: Combo) => void;
  // Opcional: Implementar remover e atualizar quantidade
  removeFromCart: (comboId: string) => void;
  increaseQuantity: (comboId: string) => void;
  decreaseQuantity: (comboId: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (comboToAdd: Combo) => {
    setCartItems((prevItems) => {
      // Verifica se o combo já existe no carrinho
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === comboToAdd.id // Compara pelo ID único do combo
      );

      if (existingItemIndex > -1) {
        // Se existe, incrementa a quantidade
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // Se não existe, adiciona o novo combo com quantidade 1
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
    setCartItems(
      (prevItems) =>
        prevItems
          .map((item) =>
            item.id === comboId
              ? { ...item, quantity: Math.max(1, item.quantity - 1) } // Garante que a quantidade mínima é 1
              : item
          )
          .filter((item) => item.quantity > 0) // Remove o item se a quantidade chegar a 0
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
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
