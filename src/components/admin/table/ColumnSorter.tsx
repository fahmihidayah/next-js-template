
import { IconButton } from "@chakra-ui/react";
import { AiFillCiCircle } from "react-icons/ai"
import type { Column } from "@tanstack/react-table";
import { HiChevronDown, HiChevronUp, HiSelector } from "react-icons/hi";
import { GoCircle } from "react-icons/go"
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GlobalQuery, useGlobalQuery, Query, createPathFromQuery } from "@/libs/store/query";

export const ColumnSorter: React.FC<{ column: Column<any, any> }> = ({
    column,
}) => {

    const route = useRouter();

    if (!column.getCanSort()) {
        return null;
    }

    const sorted = column.getIsSorted();
    const icon = sorted ? (
        sorted === "asc" ? (
            <HiChevronUp />
        ) : (
            <HiChevronDown />
        )
    ) : (
        <HiSelector />
    );


    
    return (
        <IconButton
            aria-label="Sort"
            size="xs"
            onClick={column.getToggleSortingHandler()}
            icon={ icon }
        >
        </IconButton>
    );
};