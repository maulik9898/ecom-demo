import { Image } from '@mantine/core';
import { Inventory, Variant } from './types.d';
export interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    variants: Variant[];
}

export interface Variant {
    id: number;
    name: string;
    price: number;
    limit: number;
}

export interface StoreState {
    products: Product[];
    cart: CartItem[];
    layout: string;
    inventory: Inventory[];
    setProducts: (products: Product[]) => void;
    setInventory: (inventory: Inventory[]) => void;
    addToCart: (variantId: number, productId: number) => void;
    removeFromCart: (variantId: number, productId: number) => void;
    loadData: () => void;
    setLayout: (layout: string) => void;
    reset: () => void;
}

export interface Inventory {
    id: number;
    variants: InventoryVariants[];
}

export interface InventoryVariants {
    id: number;
    stock: number;
} 

export interface CartItem {
    id: number;
    name: string;
    image: string;
    variantId: number;
    price: number;
    variantName: string;
    quantity: number;
}





