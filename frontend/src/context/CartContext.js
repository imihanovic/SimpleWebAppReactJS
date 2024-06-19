import React, { createContext, useReducer, useEffect } from "react";

export const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state, action.payload];
    case "REMOVE_FROM_CART":
      const indexToRemove = state.findIndex(
        (item) => item._id === action.payload._id
      );
      if (indexToRemove !== -1) {
        return [
          ...state.slice(0, indexToRemove),
          ...state.slice(indexToRemove + 1),
        ];
      }
      return state;
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], (initial) => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : initial;
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (product) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: product });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
