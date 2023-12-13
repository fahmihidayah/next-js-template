import { useEffect } from "react"
import { useAuth } from "./useAuth";
import { useRouter } from "next/router";
import { LOGIN_URL } from "@/libs/configuration/url";
import { useToast } from "@chakra-ui/react";

export interface CheckAuthHook {

}

export interface CheckAuthHookParams {
    statusCode? : number
}

export function useCheckAuth(   
    { statusCode } : CheckAuthHookParams
) : CheckAuthHook {
    const {user, logoutAction} = useAuth();

    const router = useRouter();

    const toast = useToast();
    useEffect(() => {
        if (statusCode === 401) {
            logoutAction()
            if(!toast.isActive("unauthorized")) {
                toast({
                    id: "unauthorized",
                    title: "Unauthorized",
                    description: "Your session has expired. Please login again.",
                    position: "top",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
            }
            
            router.push(`/${LOGIN_URL}`)
        }
    }, [statusCode])

    return {

    }
}