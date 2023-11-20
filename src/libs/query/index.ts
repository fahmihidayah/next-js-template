import { QueryClient } from "@tanstack/react-query";

import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { DataProviderConf, RequestOption, RestDataProvider } from "../provider/rest-data";
import { GetStaticPropsContext } from "next";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: 1000 * 60 * 60 * 24, // 24 hours
        }
    }
})

export async function createQueryClient<D>(restDataProvider: RestDataProvider<D>,
    method: 'getOne' | 'getPaginateList' | 'getMany',
    params?: any,
    query?: any,
    resource?: string,
) {
    const id = query?.id
    const queryKey = [restDataProvider.configuration.resource]
    if(id) {
        queryKey.push(id)
    }
    const queryClient: QueryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: queryKey,
        queryFn: async () => {
            const response = await restDataProvider[method]({
                configuration: resource ? {
                    resource: resource
                } : undefined,
                option: {
                    id: id,
                    params: query
                }
            })
            return response;
        }
        
    })
    return queryClient
}