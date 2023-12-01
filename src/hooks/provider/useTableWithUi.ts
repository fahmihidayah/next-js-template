import { QueryClient, useQuery } from "@tanstack/react-query"
import { OnError, OnSuccess, RequestConfig } from "."
import { DataProviderConf, RequestOption, RestDataProvider } from "@/libs/provider/rest-data"
import { ColumnDef, Table, getCoreRowModel, useReactTable, SortingState, getSortedRowModel, getFilteredRowModel, PaginationState, Updater } from "@tanstack/react-table"
import { useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/router"
import { Query, convertToQueryParameter, createPathFromQuery, useGlobalQuery } from "@/libs/store/query"

export interface TableConfig<D, C>{
    initalData : any
    columns : Array<ColumnDef<C>>
    queries? : any,
    restDataProvider : RestDataProvider<D>,
    onSuccess? : OnSuccess<D> ,
    onError? : OnError
}


export type PageChangeAction = (page : number) => void;


export interface TableWithUiHook<C> {
    table : Table<C>;
    pageIndex : number;
    pageSize : number;
    pageChangeAction: PageChangeAction;
}


export function useTableWithUi<D,C>({initalData, columns, restDataProvider, onError, onSuccess} : TableConfig<D, C>) : TableWithUiHook<C> { 
    
    const searchParams = useSearchParams();
    
    let queryParams : any = {pageIndex : 1}

    if(searchParams) {
         queryParams = {
            ... Object.fromEntries(searchParams)
        }
    }

    const globalQuery : Query = useGlobalQuery((state) => state.query) ?? {pageIndex : 1, path : ""}
    const setGlobalQuery = useGlobalQuery((state) => state.setQuery)

    if(globalQuery != null) {
        queryParams.page = globalQuery.pageIndex;
    }
    
    const router = useRouter();

    const [{pageIndex, pageSize}, setPagination] = useState<PaginationState>({
        pageIndex : queryParams['page'],
        pageSize : 1
    })

    const pagination = useMemo(() => ({
        pageIndex : pageIndex,
        pageSize : pageSize
    }), [pageIndex, pageSize])

    const [sorting, setSorting] = useState<SortingState>([])

    const queryKey = [restDataProvider.configuration.resource, queryParams] 

    const { status, error, data : listDatas } = useQuery({
        queryKey: queryKey,
        queryFn: async () => {
            const response = await restDataProvider.getPaginateList({
                option : {
                    params : globalQuery ? convertToQueryParameter(globalQuery) : queryParams 
                }
            })
            setPagination({
                pageIndex : response.page,
                pageSize : response.totalPage
            })
            return response.data
        },
        initialData: initalData
    })

    const table : Table<C>= useReactTable({
        data: listDatas,
        columns,
        state : {
            pagination,
            sorting,
        },
        pageCount : pageSize,
        manualPagination: true,
        manualSorting : true,
        onSortingChange : setSorting,  
        // onPaginationChange: (updaterOrValue) => {
        //     console.log(table.getState().pagination, globalQuery)
        // },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel : getFilteredRowModel(),
        debugTable: true
    })

    const pageChangeAction : PageChangeAction = (page : number) => {
        const query :Query = {
            ... globalQuery!,
            pageIndex: page
        }
        const url = createPathFromQuery(query)
        console.log('Pagination component - index.tsx ', query, url)
        setGlobalQuery(query)
        router.push(url)
    }

    useEffect(() => {
        console.log('useTableWithUI - useEffect - sorting value ', sorting)
        const firstSort = sorting[0];
        if(firstSort) {
            const query : Query = {
                ... globalQuery,
                sort : firstSort.desc ? "desc" : "asc",
                orderBy : firstSort.id
            }
            setGlobalQuery(query)
            router.push(createPathFromQuery(query))
        }
        else {
            const query : Query = {
                ... globalQuery,
                sort : undefined,
                orderBy : undefined
            }
            setGlobalQuery(query)
            router.push(createPathFromQuery(query))
        }
       
    }, [sorting])

    return {
        table : table,
        pageIndex : pageIndex,
        pageSize : pageSize,
        pageChangeAction : pageChangeAction
    }

}
