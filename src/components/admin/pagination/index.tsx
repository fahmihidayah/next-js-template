`use client`
import { Flex, Text } from "@chakra-ui/react";
import BoxNumber from "./BoxNumber";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Query, createPathFromPageAndQuery, createPathFromQuery, useGlobalQuery } from "@/libs/store/query";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Table } from "@tanstack/react-table";
import { table } from "console";
import { sigletonQuery } from "@/libs/query/singleton";
import { shallow } from "zustand/shallow";
import { number } from "yup";
import { PageChangeAction } from "@/hooks/provider/useTableWithUi";

interface PaginationProps<D> {
    table : Table<D>
    pageIndex: number;
    pageSize: number;
    maxShow: number;
    pageChangeAction : PageChangeAction;
}


export default function Pagination<D>({ table, pageIndex: current, pageSize: total, maxShow, pageChangeAction }: PaginationProps<D>) {

    const router = useRouter();

    const globalQuery = useGlobalQuery((state) => state.query)

    const setGlobalQuery = useGlobalQuery((state) => state.setQuery)

    const searchParams = useSearchParams()

    const keys = searchParams?.keys();
    if (keys) {
        for (const key of keys) {
            console.log(key)
        }
    }

    let numbers: number[] = []

    const start = current - Math.floor(maxShow / 2);
    const end = current + Math.floor(maxShow / 2);

    let startIndex = (start <= 1) ? 1 : start;
    let endIndex = (end >= total) ? total : end;

    const diff = endIndex - startIndex;

    for (let i = startIndex; i <= endIndex; i++) {
        numbers.push(i)
    }

    console.log('Paginate - index.tsx', numbers.length)

    return <>
        <Flex width={"100%"} justifyContent={"end"}  >
            <BoxNumber onClick={() => {
                pageChangeAction(1)
                // const query :Query = {
                //     ... globalQuery!,
                //     pageIndex: 1
                // }
                // const url = createPathFromQuery(query)
                // console.log('Pagination component - index.tsx ', query, url)
                // setGlobalQuery(query)
                // router.push(url)
            }} text="&larr;" action="" buttonType="start" isActive={false} />
            {startIndex !== 1 && <BoxNumber text="..." action="" buttonType="end" isActive={false} />}
            {numbers.map((number) => (
                <BoxNumber onClick={() => {
                    pageChangeAction(number)
                    // const query :Query = {
                    //     ... globalQuery!,
                    //     pageIndex: number
                    // }
                    // const url = createPathFromQuery(query)
                    // console.log('Pagination component - index.tsx ', query, url)
                    // setGlobalQuery(query)
                    // router.push(url)
                    
                }} text={`${number}`} action="" buttonType="page" isActive={number === current} />

            ))}
            {endIndex !== total && <BoxNumber text="..." action="" buttonType="end" isActive={false} />}
            <BoxNumber onClick={() => {
                pageChangeAction(numbers.length)
                //    const query = {
                //     ... globalQuery!,
                //     pageIndex: numbers.length
                // }
                // const url = createPathFromQuery(query)
                // console.log('Pagination component - index.tsx ', query, url)
                // setGlobalQuery(query)
                // router.push(url)
                
            }} text="&rarr;" action="" buttonType="end" isActive={false} />

        </Flex>
    </>
}