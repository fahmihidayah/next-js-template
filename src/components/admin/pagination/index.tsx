import { Flex, Text } from "@chakra-ui/react";
import BoxNumber from "./BoxNumber";

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
            <BoxNumber text="&larr;" action="" type="start" isActive={false}/>
            {startIndex !== 1 && <BoxNumber text="..." action=""  type="end" isActive={false}/>}
            {numbers.map((number) => (
                <BoxNumber text={`${number}`} action="" type="page" isActive={number === current}/>
            ))}
             {endIndex !== total && <BoxNumber text="..." action=""  type="end" isActive={false}/>}
             <BoxNumber text="&rarr;" action=""  type="end" isActive={false}/>
        </Flex>
    </>
}