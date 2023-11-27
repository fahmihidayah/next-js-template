import { Flex, Text } from "@chakra-ui/react";
import BoxNumber from "./BoxNumber";
import Link from "next/link";

interface PaginationProps {
    current: number;
    total: number;
    maxShow: number;
}


export default function Pagination({ current, total, maxShow }: PaginationProps) {
    
    let numbers : number[] = []

    const start = current - Math.floor(maxShow / 2);
    const end = current + Math.floor(maxShow / 2);

    let startIndex = (start <= 1) ? 1 : start;
    let endIndex = (end >= total) ? total : end;

    const diff = endIndex - startIndex;

    for (let i = startIndex; i <= endIndex; i++) {
        numbers.push(i)
      }
      

    return <>
        <Flex width={"100%"} justifyContent={"end"}  >
            <Link href={`?page=1`}>
                <BoxNumber text="&larr;" action="" type="start" isActive={false}/>
            </Link>
            {startIndex !== 1 && <BoxNumber text="..." action=""  type="end" isActive={false}/>}
            {numbers.map((number) => (
                <Link href={`?page=${number}`}>
                    <BoxNumber text={`${number}`} action="" type="page" isActive={number === current}/>
                </Link>
            ))}
             {endIndex !== total && <BoxNumber text="..." action=""  type="end" isActive={false}/>}
             <Link href={`?page=${numbers.length}`}>
                <BoxNumber text="&rarr;" action=""  type="end" isActive={false}/>
             </Link>
             
        </Flex>
    </>
}