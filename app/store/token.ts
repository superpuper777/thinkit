import { create } from "zustand";
// import { getToken } from "../actions";

interface TokenState {
  token: string;
  saveToken: (newToken: string) => void;
  deleteToken: () => void;
  // fetch: () => void;
}

export const tokenStore = create<TokenState>((set) => ({
  token: "",
  saveToken: (newToken) => set({ token: newToken }),
  deleteToken: () => set({ token: "" }),
}));

// fetch: async () => {
//   const response = await getToken();
//   console.log(response, ">response");
//   set({ token: await response.token });
// },
