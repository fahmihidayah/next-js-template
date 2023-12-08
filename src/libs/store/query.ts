import { filter } from "@chakra-ui/react";
import { create } from "zustand";

export interface Filter {
    attribute : string;
    value : string;
}

export function createPathFromPageAndQuery(page : number, query? : Query | null) : string {
    return `?page=${page}&sortOrder=${query?.sort}&orderBy=${query?.orderBy}`
}

export function isPathChanged(path : string, query : Query) : boolean {
    return path != query.path;
}

export function createPathFilter(filters : Array<Filter>) : string {
    return filters.map((filter) => `&${filter.attribute}=${filter.value}`).join("")
}
 
export function createPathFromQuery(query? : Query | null) : string {
    let path = `?page=${query?.pageIndex ?? 1}`;
    if(query?.sort) {
        path =  `${path}&sortOrder=${query?.sort}&orderBy=${query?.orderBy}`;
    }
    
    if(query?.filters) {
        path = `${path}${createPathFilter(query.filters)}`
    }

    return path;
}

export function convertToQueryParameter(query : Query) {
    return {
        page : query.pageIndex
    }
}

export interface Query {
    path : string;
    pageIndex : number;
    sort? : string | false;
    orderBy? : string;
    filters? : Array<Filter>;

}

export interface GlobalQuery {
    query? : Query | null;
    setQuery : (query?: Query | null) => void;
    setPath : (path : string) => void;
}

export const useGlobalQuery = create<GlobalQuery>()((set) => ({
    query : null,
    setPath : (path : string) => set((state) => ({
        query : {
            path : path,
            pageIndex : 1
        }
    })),
    setQuery : (query? : Query | null) => set((state) => ({
        query : query
    }))
}))