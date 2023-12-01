import { create } from "zustand";

export interface Keyword {
    attribute : string;
    value : string;
}

export function createPathFromPageAndQuery(page : number, query? : Query | null) : string {
    return `?page=${page}&sortOrder=${query?.sort}&orderBy=${query?.orderBy}`
}
 
export function createPathFromQuery(query? : Query | null) : string {
    if(query?.sort) {
        return `?page=${query?.pageIndex ?? 1}&sortOrder=${query?.sort}&orderBy=${query?.orderBy}`
    }
    else {
        return `?page=${query?.pageIndex ?? 1}`
    }
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
    keywords? : Array<Keyword>;

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