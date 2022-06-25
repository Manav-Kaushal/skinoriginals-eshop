import {
  CartContextInterface,
  CartItemInterface,
  CartProviderInterface,
} from "@interfaces/CartInterfaces";
import { createContext, useContext, useState } from "react";

const CartContext = createContext({} as CartContextInterface);

export function CartContextProvider({ children }: CartProviderInterface) {
  const [cartItems, setCartItems] = useState<CartItemInterface[]>([]);

  const cartQty = cartItems.reduce((qty, item) => item.qty + qty, 0);

  function getItemQty(id: number) {
    return cartItems.find((item) => item.id === id)?.qty || 0;
  }

  function increaseItemQty(id: number) {
    setCartItems((currItems: any) => {
      if (currItems.find((item: any) => item.id === id) == null) {
        return [...currItems, { id, qty: 1 }];
      } else {
        return currItems.map((item: any) => {
          if (item.id === id) {
            return { ...item, qty: item.qty + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseItemQty(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.qty === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, qty: item.qty - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: number) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  return (
    <CartContext.Provider
      value={{
        getItemQty,
        increaseItemQty,
        decreaseItemQty,
        removeFromCart,
        cartItems,
        cartQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useShoppingCart() {
  return useContext(CartContext);
}
