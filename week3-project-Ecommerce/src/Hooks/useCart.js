import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set) => ({
      userdata: [],
      shippingCost: 0,
      finalTotalPrice: 0,
      tax: 0,
      discount: 0,
      discountAmount: 0,
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.userdata.find(
            (cartItem) => cartItem.id === item.id
          );
          if (existingItem) {
            return {
              userdata: state.userdata.map((cartItem) =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              ),
            };
          }
          return {
            userdata: [...state.userdata, { ...item, quantity: 1 }],
          };
        }),
      removeFromCart: (id) =>
        set((state) => ({
          userdata: state.userdata.filter((item) => item.id !== id),
        })),
      removeAllCartItems: () => set({ userdata: [] }),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          userdata: state.userdata.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),
      updateCheckoutData: (
        shippingCost,
        finalTotalPrice,
        tax,
        discount,
        discountAmount
      ) =>
        set(() => ({
          shippingCost,
          finalTotalPrice,
          tax,
          discount,
          discountAmount,
        })),
    }),
    {
      name: "User-Cart-Store",
    }
  )
);

export default useCartStore;
