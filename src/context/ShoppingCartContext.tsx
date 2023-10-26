import { ReactNode, createContext, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface ShoppingCartProvider {
  children: ReactNode;
}

interface ShoppingCartContext {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCartQuantity: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
}

interface CartItem {
  id: number;
  quantity: number;
}

export const ShoppingCartContext = createContext({} as ShoppingCartContext);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

//provider will render shopping cart
//will give us the values we need
export const ShoppingCartProvider = ({ children }: ShoppingCartProvider) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );
  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  // for each cart item we take the total quantity and the item
  // we add the quantity of the current item + total quantity in the cart
  // default to start at 0
  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const increaseCartQuantity = (id: number) => {
    setCartItems((currentItems) => {
      const itemNotInCart = currentItems.find((item) => item.id === id) == null;
      if (itemNotInCart) {
        //return all currentItems and add a new item to the cart
        return [...currentItems, { id, quantity: 1 }];
      } else {
        //it if exits, increment quantity by one
        return currentItems.map((item) => {
          if (item.id === id) {
            //keep everything as is but +1 quantity
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseCartQuantity = (id: number) => {
    setCartItems((currentItems) => {
      //this will return a new list of all items
      //whichever one we pass the id of we will remove it from the list of items
      const idNotInCart =
        currentItems.find((item) => item.id === id)?.quantity === 1;
      if (idNotInCart) {
        //remove the item from the list of items
        return currentItems.filter((item) => item.id !== id);
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            //keep everything as is but -1 quantity
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeFromCartQuantity = (id: number) => {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id);
    });
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        openCart,
        closeCart,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCartQuantity,
        cartQuantity,
        cartItems,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
};
