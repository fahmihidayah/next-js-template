import { RestDataProvider } from "@/libs/provider/rest-data";
import { useQuery } from "@tanstack/react-query";
import { OnError, OnSuccess } from ".";
import { UiState } from "@/types/ui";
import { useState } from "react";
import { useRouter } from "next/router";
import { string } from "yup";
import { getuid } from "process";

export interface QueryConfig<D> {
    restDataProvider : RestDataProvider<D>
    initalData? : any
    isUseId? : boolean 
}

export interface QueryWithUiHook {
    data : any;
    status :  "error" | "success";
    error : Error | null;
    uiState : UiState
}

function getId(id? : string | string[]) : string | null {
    if(id) {
        if(id instanceof Array) {
            return id.join(",")
        }
        return String(id);
    }
    return null
}

export function useQueryWithUi<D>({restDataProvider, isUseId, initalData} : QueryConfig<D>) : QueryWithUiHook {

    const router = useRouter();

    const id = router.query.id

    const [uiState, setUiState] = useState<UiState>(UiState.INITIAL)
    const queryKey : Array<any> = [restDataProvider.configuration.resource]
    if(getId(id)) {
        queryKey.push(getId(id))
    }
    
    const { status, error, data } = useQuery({
        queryKey: queryKey,
        queryFn: async () => {
            setUiState(UiState.PROGRESS)
            let response : any
            if(id && isUseId) {
                response = await restDataProvider.getOne({
                    option : {
                        id : getId(id),
                    }
                })
            }
            else {
                response = await restDataProvider.getMany()
            }
            setUiState(UiState.DONE)
            return response.data
        },
        initialData: initalData,
    })

    return {
        data : data,
        error : error,
        status : status,
        uiState : uiState
    }
}