import { AuthForm } from "@/types/auth/form"
import { UserWithToken } from "@/types/auth/user"
import { UiState, UiStateWithData } from "@/types/ui"
import { setUserWithToken } from "@/libs/auth/user";
import { axiosInstance } from "@/libs/rest-data/axios";
import { useToast } from "@chakra-ui/react";
import { useMutation, useMutationState } from "@tanstack/react-query";
import { useState } from "react";

export interface RequestFormHook<F> {
    state : UiStateWithData<UserWithToken | null>;
    action : (form : F) => void
}

export type OnSuccess<T> = (response : T) => void

export type OnError = (error : any) => void

export type RequestHandler = () => void

export interface RequestConfig<R>{
    path : string,
    method? : string | null,
    onSuccess : OnSuccess<R>,
    onError : OnError
}

export function useRequestForm<F, R>(config : RequestConfig<R>) : RequestFormHook<F> {

    const toast = useToast()

    const [state, setState] = useState({
        state : UiState.INITIAL,
        data : null,
        errorMessage : ""
    })

    const mutate = useMutation({
        mutationFn : async (form? : F | null) => {
            let response;
            if(config.method === 'put') {
                response = (await axiosInstance.put(config.path, form)).data;
            }
            else if(config.method === 'patch') {
                response = (await axiosInstance.patch(config.path, form)).data;
            }
            else if(config.method === 'delete') {
                response = (await axiosInstance.delete(config.path)).data;
            }
            else {
                response = (await axiosInstance.post(config.path, form)).data;
            }
            return response;
        },
        onError : (error) => {
            
            toast({
                title: "Error",
                description : error.message,
                duration : 1000,
                status : 'error',
                isClosable : false,
                position : "top",

            })
            config.onError(error)
            setState({ ... state, state : UiState.ERROR, errorMessage : error.message})
        },
        onSuccess: (response) => {
            config.onSuccess(response)
            setState({ ... state, state : UiState.DONE, errorMessage : ""})
        }
    })


    const action =  async (form?: F | null) => {
        setState({ ... state, state : UiState.PROGRESS})
        mutate.mutate(form)
    }

    return {
        state : state,
        action : action
    }

}

export const useRegister = () => {

}