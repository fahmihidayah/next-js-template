import { AuthForm, RegisterForm } from "@/types/auth/form";
import { User, UserWithToken } from "@/types/auth/user";
import nookies from "nookies";
import { axiosInstance } from "../rest-data/axios";

export type AuthProvider = {
    login(form: AuthForm): Promise<UserWithToken | null>
    setUser(userWithToken : UserWithToken) : Promise<void>
    // register(registerForm : RegisterForm) : Promise<Result<UserWithToken>>
    getIdentity(context: any): Promise<UserWithToken | null>
}

export const authProvider: AuthProvider = {

    login: async (form: AuthForm): Promise<UserWithToken | null> => {
        const response = await axiosInstance.post("auth/login", form);
        if (response.status !== 200) {
            throw new Error(response.data.message)
        }
        const user = response.data;

        if (user) {
            nookies.set(null, "auth", JSON.stringify(user), {
                maxAge: 30 * 24 * 60 * 60,
                path: "/",
            });
            return user;
        }
        else {
            throw new Error(response.data.message)
        }
    },

    setUser : async (userWithToken : UserWithToken) : Promise<void> => {
        nookies.set(null, "auth", JSON.stringify(userWithToken), {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
        });
    },

    getIdentity: async (context: any): Promise<UserWithToken | null> => {
        const auth = nookies.get(context)['auth'];
        if (auth) {
            const parsedUser = JSON.parse(auth);
            return parsedUser;
        }
        return null;
    }
}

export function setUserWithToken(user: UserWithToken) {
    localStorage.setItem("user-with-token", JSON.stringify(user))
}

export function getUserWithToken(): UserWithToken | null {
    if (typeof window !== 'undefined') {
        const jsonUser = localStorage.getItem("user-with-token")
        if (jsonUser) {
            return JSON.parse(jsonUser)
        }
        else {
            return null
        }
    }
    return null

}