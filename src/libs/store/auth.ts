import { UserWithToken } from "@/types/auth/user";
import { create } from "zustand";

export interface UserState {
    user?: UserWithToken | null;
    setUser: (user?: UserWithToken | null) => void;
    clear: () => void;
}

export const useUserStore = create<UserState>()((set) => (
    {
        user: null,
        setUser: (user?: UserWithToken | null) => set(
            (state) => ({ user: user})
        ),
        clear: () => set(
            (state) => ({ user: null })
        )
    }
))
