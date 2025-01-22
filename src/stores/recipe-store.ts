import { create } from 'zustand';

interface RecipeStore {
    itemIds: number[];
    setItemIds: (itemIds: number[]) => void;
}

const useRecipeStore = create<RecipeStore>((set) => ({
    itemIds: [],
    setItemIds: (itemIds: number[]) => set({ itemIds })
}));

export { useRecipeStore };