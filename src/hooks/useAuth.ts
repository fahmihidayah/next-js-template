import { UserWithToken } from "@/types/auth/user";
import { useEffect, useState } from "react";
import nookies, { destroyCookie, parseCookies } from "nookies";
import { useMutationState } from "@tanstack/react-query";
import { UiState, UiStateWithData } from "@/types/ui";
import { useUserStore } from "@/libs/store/auth";

export interface AuthHook {
    user? : UserWithToken | null
    logoutAction : () => void

}

export function useAuth() : AuthHook {
    const user = useUserStore((state) => state.user)

    const setUser = useUserStore((state) => state.setUser)

    const clearUser = useUserStore((state) => state.clear);

    const action = async () => {
        
        destroyCookie(null, "auth", {
            path : "/",
            sameSite : 'strict',
        })
        clearUser()
    }

    useEffect(() => {
        const userJson = parseCookies()['auth']
        if(userJson) {
            setUser(JSON.parse(userJson))
        }
        
    }, [])

    return {
        user : user,
        logoutAction : action
    }
}