import { QueryClient, useQuery } from "@tanstack/react-query"
import { OnError, OnSuccess, RequestConfig } from "."
import { DataProviderConf, RequestOption, RestDataProvider } from "@/libs/provider/rest-data"
import { ColumnDef, Table, getCoreRowModel, useReactTable, SortingState, getSortedRowModel, getFilteredRowModel, PaginationState, Updater, FiltersTableState, ColumnFiltersState } from "@tanstack/react-table"
import { useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/router"
import { Filter, Query, convertToQueryParameter, createPathFromQuery, isPathChanged, useGlobalQuery } from "@/libs/store/query"
import { filter } from "@chakra-ui/react"

export interface TableConfig<D, C> {
    initalData: any
    columns: Array<ColumnDef<C>>
    queries?: any,
    restDataProvider: RestDataProvider<D>,
    onSuccess?: OnSuccess<D>,
    onError?: OnError
}

export type PageChangeAction = (page: number) => void;


export interface TableWithUiHook<C> {
    table: Table<C>;
    pageIndex: number;
    pageSize: number;
    pageChangeAction: PageChangeAction;
}


export function useTableWithUi<D, C>({ initalData, columns, restDataProvider, onError, onSuccess }: TableConfig<D, C>): TableWithUiHook<C> {

    const searchParams = useSearchParams();

    const router = useRouter();

    let queryParams: any = { pageIndex: 1 }

    if (searchParams) {
        queryParams = {
            ...Object.fromEntries(searchParams)
        }
    }

    const globalQuery: Query = useGlobalQuery((state) => state.query) ?? { pageIndex: 1, path: "" }
    const setGlobalQuery = useGlobalQuery((state) => state.setQuery)

    if (globalQuery != null) {
        queryParams.page = globalQuery.pageIndex;
    }

    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: queryParams['page'],
        pageSize: 1
    })

    const pagination = useMemo(() => ({
        pageIndex: pageIndex,
        pageSize: pageSize
    }), [pageIndex, pageSize])

    const [sorting, setSorting] = useState<SortingState>([])

    const [columnFiltersState, setColumnFiltersState] = useState<ColumnFiltersState>([])

    const queryKey = [restDataProvider.configuration.resource, queryParams]

    const { status, error, data: listDatas } = useQuery({
        queryKey: queryKey,
        queryFn: async () => {
            const response = await restDataProvider.getPaginateList({
                option: {
                    params: globalQuery ? convertToQueryParameter(globalQuery) : queryParams
                }
            })
            setPagination({
                pageIndex: response.page,
                pageSize: response.totalPage
            })
            return response.data
        },
        initialData: initalData
    })

    const table: Table<C> = useReactTable({
        data: listDatas,
        columns,
        state: {
            pagination,
            sorting,
        },
        pageCount: pageSize,
        manualPagination: true,
        manualSorting: true,
        manualFiltering: true,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFiltersState,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        debugTable: true
    })

    const pageChangeAction: PageChangeAction = (page: number) => {
        const query: Query = {
            ...globalQuery!,
            pageIndex: page
        }
        const url = createPathFromQuery(query)
        setGlobalQuery(query)
        router.push(url)
    }

    useEffect(() => {

        const relativePath = router.asPath.split("?")[0];
        const isChanged = isPathChanged(relativePath, globalQuery);
        console.log("isChanged", isChanged);
        if (isChanged) {
            const query: Query = {
                ...globalQuery,
                path: relativePath
            }
            setGlobalQuery(query)
            router.push(createPathFromQuery(query))
        }
        else {
            const firstSort = sorting[0];
            const filters = columnFiltersState.map((e) => {
                return {
                    attribute: e.id,
                    value: String(e.value)
                }
            })
    
            if (firstSort) {
                const query: Query = {
                    ...globalQuery,
                    path: relativePath,
                    sort: firstSort.desc ? "desc" : "asc",
                    filters : filters,
                    orderBy: firstSort.id
                }
                setGlobalQuery(query)
                router.push(createPathFromQuery(query))
            }
            else {
                const query: Query = {
                    ...globalQuery,
                    path: relativePath,
                    filters : filters,
                    sort: undefined,
                    orderBy: undefined
                }
                setGlobalQuery(query)
                router.push(createPathFromQuery(query))
            }
        }
        

    }, [sorting, columnFiltersState])

    return {
        table: table,
        pageIndex: pageIndex,
        pageSize: pageSize,
        pageChangeAction: pageChangeAction
    }

}
