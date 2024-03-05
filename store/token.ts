import { create } from "zustand";

interface TokenState {
  token: string;
  saveToken: (newToken: string) => void;
  deleteToken: () => void;
}

export const tokenStore = create<TokenState>((set) => ({
  token: "",
  saveToken: (newToken) => set({ token: newToken }),
  deleteToken: () => set({ token: "" }),
}));
