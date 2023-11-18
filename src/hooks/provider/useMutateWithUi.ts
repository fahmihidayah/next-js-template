
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { ActionOption, RequestConfig, RequestFormHook } from ".";
import { UiState } from "@/types/ui";

export function useMutateWithUi<D>({restDataProvider, onSuccess, onError} : RequestConfig<D>) : RequestFormHook<D> {
    const toast = useToast()

    const [state, setState] = useState({
        state : UiState.INITIAL,
        data : null,
        errorMessage : ""
    })

    const [item, setItem] = useState<D|null>(null)

    const mutate = useMutation({
        mutationFn : async (actionOption? : ActionOption | null) => {
            let data : any;
            if(actionOption?.method === 'post') {
                data = await restDataProvider.create(null, {
                    params : actionOption.parameter
                })
            }
            else if(actionOption?.method === 'put' || actionOption?.method === 'patch') {
                data = await restDataProvider.update(null, {
                    params : actionOption.parameter,
                    id : actionOption.id
                })
            }
            else {
                data = await restDataProvider.delete(null, {
                    id : actionOption?.id
                })
            }
           
            return data.data;
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
            onError?.(error)
            setState({ ... state, state : UiState.ERROR, errorMessage : error.message})
        },
        onSuccess: (response) => {
            onSuccess?.(response)
            setState({ ... state, state : UiState.DONE, errorMessage : ""})
        }
    })


    const action =  async (actionOption? : ActionOption | null) => {
        setState({ ... state, state : UiState.PROGRESS})
        mutate.mutate(actionOption)
    }

    return {
        state : state,
        actionWithParams : action,
        setSelectedItem : setItem,
        selectedItem : item
    }
}