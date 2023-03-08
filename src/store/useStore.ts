import { StoreState } from "../types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import product from "../products.json";
import inventory from "../inventory.json";
const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      products: [],
      cart: [],
      layout: "grid",
      inventory: [],
      setProducts: (products) => set({ products }),
      setInventory: (inventory) => set({ inventory }),
      addToCart(variantId, productId) {
        const { products, cart } = get();
        const product = products.find((product) => product.id === productId);
        const variant = product?.variants.find(
          (variant) => variant.id === variantId
        );
        const cartItem = cart.find(
          (cartItem) =>
            cartItem.variantId === variantId && cartItem.id === productId
        );
        if (variant && product && !cartItem) {
          set({
            cart: [
              ...cart,
              {
                id: productId,
                name: product.name,
                image: product.image,
                variantId: variant.id,
                price: variant.price,
                variantName: variant.name,
                quantity: 1,
              },
            ],
          });
        } else if (cartItem) {
          set({
            cart: cart.map((item) =>
              item.variantId === variantId && item.id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        }
        const inventory = get().inventory;
        const inventoryItem = inventory.find(
          (inventoryItem) => inventoryItem.id === productId
        );
        const inventoryVariant = inventoryItem?.variants.find(
          (inventoryVariant) => inventoryVariant.id === variantId
        );
        if (inventoryVariant) {
          set({
            inventory: inventory.map((item) =>
              item.id === productId
                ? {
                    ...item,
                    variants: item.variants.map((variant) =>
                      variant.id === variantId
                        ? { ...variant, stock: variant.stock - 1 }
                        : variant
                    ),
                  }
                : item
            ),
          });
        }
      },
      removeFromCart(variantId, productId) {
        const { cart } = get();
        const cartItem = cart.find(
          (cartItem) =>
            cartItem.variantId === variantId && cartItem.id === productId
        );
        if (cartItem) {
          set({
            cart: cart
              .map((item) =>
                item.variantId === variantId && item.id === productId
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              )
              .filter((item) => item.quantity > 0),
          });
        }
        const inventory = get().inventory;
        const inventoryItem = inventory.find(
          (inventoryItem) => inventoryItem.id === productId
        );
        const inventoryVariant = inventoryItem?.variants.find(
          (inventoryVariant) => inventoryVariant.id === variantId
        );
        if (inventoryVariant) {
          set({
            inventory: inventory.map((item) =>
              item.id === productId
                ? {
                    ...item,
                    variants: item.variants.map((variant) =>
                      variant.id === variantId
                        ? { ...variant, stock: variant.stock + 1 }
                        : variant
                    ),
                  }
                : item
            ),
          });
        }
      },
      loadData() {
        if (get().inventory.length === 0) {
          set({ inventory });
        }
        if (get().products.length === 0) {
          set({ products: product });
        }
      },
      setLayout(layout) {
        set({ layout });
      },
      reset() {
        set({
          products: product,
          cart: [],
          inventory: inventory,
        });
      },
    }),
    {
      name: "store",
      getStorage: () => localStorage,
    }
  )
);

export default useStore;
