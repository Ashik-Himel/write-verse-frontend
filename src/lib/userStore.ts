import { create } from "zustand";

interface User {
  available: boolean;
  role: "user" | "admin";
}

interface UserStore {
  user: User | null;
  userLoaded: boolean;
  setUser: (userState: User | null) => void;
  setUserLoaded: (isLoaded: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  userLoaded: false,
  setUser: (userState) =>
    set({
      user: userState,
      userLoaded: true,
    }),
  setUserLoaded: (isLoaded) =>
    set({
      userLoaded: isLoaded,
    }),
}));
