import { DataProviderConf, RestDataProvider } from "@/libs/provider/rest-data";
import { UiStateWithData } from "@/types/ui";

export interface ActionOption {
    parameter? : any | null
    id? : string | null,
    method : 'post' | 'put' | 'patch' | 'delete',
    conf? : DataProviderConf
}

export interface RequestFormHook<D> {
    state : UiStateWithData<D | null>;
    actionWithParams : (option? : ActionOption | null) => Promise<void | null>
    setSelectedItem : (data : D) => void | null,
    selectedItem : D | null
}

export type OnSuccess<D> = (response : D) => void

export type OnError = (error : any) => void

export type RequestHandler = () => void

export interface RequestConfig<D>{
    restDataProvider : RestDataProvider<D>,
    onSuccess? : OnSuccess<D> ,
    onError? : OnError
}
