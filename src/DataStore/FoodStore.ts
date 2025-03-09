// src/DataStore/FoodStore.ts
import { create } from "zustand";

export interface FoodItem {
  id: string;
  food: string;
  price: number;
  taste: string;
  review: string;
}

export interface Store {
  items: FoodItem[];
  create: (newItem: FoodItem) => void;
  update: (updatedItem: FoodItem) => void;
  remove: (id: string) => void;
  payload: FoodItem | null;
  setPayload: (item: FoodItem) => void;
}

export const useFoodStore = create<Store>((set) => ({
  items: [
    {
      id: "1",
      food: "치킨",
      price: 15000,
      taste: "매우 맛있음",
      review: "정말 맛있는 치킨!",
    },
    {
      id: "2",
      food: "피자",
      price: 18000,
      taste: "평범",
      review: "피자는 늘 맛있다.",
    },
  ],
  create: (newItem) => set((state) => ({ items: [...state.items, newItem] })),
  update: (updatedItem) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      ),
    })),
  remove: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  payload: null,
  setPayload: (item) => set(() => ({ payload: item })),
}));
