import { useState } from "react";
import { useRequestForm } from "./useRequest";
import { useRouter } from "next/router";
import { UiState } from "@/types/ui";


export type GetIdFn<T> = (data : T | undefined) => string | undefined;
export type GetObjectFn<T> = (data : T | undefined) => string;

export type OnSelectItem<T> = (data : T | undefined) => void

export interface UseDeleteHook<T> {
    state : UiState
    onSelectItem : OnSelectItem<T>
    data : T | undefined
    action : () => void
}

export interface UseDeleteParameter<T> {
    path : string;
    getIdFn : GetIdFn<T>;
    
}

export default function useDeleteItem<T>({path, getIdFn} : UseDeleteParameter<T>) : UseDeleteHook<T> {
    const router = useRouter();

    const [selectItem, setSelecteItem] = useState<T>();

    const {state, action} = useRequestForm<null, T>({
        path: `${path}/${getIdFn(selectItem)}`,
        method : "delete",
        onSuccess : (data) => {
            router.reload()
        },
        onError : (any) => {

        }
    })

    const onSelectItem : OnSelectItem<T> = (data : T | undefined) => {
        setSelecteItem(data)
    }

    return {
        state : state.state,
        onSelectItem : onSelectItem,
        data : selectItem,
        action : () => {
            action(null)
        }
    }
}