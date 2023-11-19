import { QueryClient, useQuery } from "@tanstack/react-query"
import { OnError, OnSuccess, RequestConfig } from "."
import { DataProviderConf, RequestOption, RestDataProvider } from "@/libs/provider/rest-data"
import { ColumnDef, Table, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

interface PageMeta {
    current : number;
    total : number;
}

export interface QueryConfig<D, C>{
    initalData : any
    columns : Array<ColumnDef<C>>
    restDataProvider : RestDataProvider<D>,
    onSuccess? : OnSuccess<D> ,
    onError? : OnError
}

export interface TableWithUiHook<C> {
    table : Table<C>,
    currentPage : number,
    totalPage : number
}


export function useTableWithUi<D,C>({initalData, columns, restDataProvider, onError, onSuccess, } : QueryConfig<D, C>) : TableWithUiHook<C> { 

    const searchParams = useSearchParams();

    const [pageMeta, setPageMeta] = useState<PageMeta>({
        current : 1,
        total : 1
    })

    const page = searchParams?.get('page') ? searchParams?.get('page') : 1

    const queryKey = [restDataProvider.configuration.resource, page] 

    const { status, error, data : listDatas } = useQuery({
        queryKey: queryKey,
        queryFn: async () => {
            const response = await restDataProvider.getPaginateList(undefined, {
                params : {
                    page : page
                }
            })
            setPageMeta({
                current : response.page,
                total : response.totalPage
            })
            return response.data
        },
        initialData: initalData
    })

    const table : Table<C>= useReactTable({
        data: listDatas,
        columns,
        getCoreRowModel: getCoreRowModel(),
        debugTable: true
    })

    return {
        table : table,
        currentPage : pageMeta.current,
        totalPage : pageMeta.total
    }

}
