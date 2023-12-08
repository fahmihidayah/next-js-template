'use client';
import React, { useEffect, useState } from "react";
import {
    Input,
    Menu,
    IconButton,
    MenuButton,
    MenuList,
    VStack,
    HStack,
    filter,
} from "@chakra-ui/react";
import { HiCheck, HiFilter, HiX } from "react-icons/hi"
// import { IconFilter, IconX, IconCheck } from "@tabler/icons";
import type { Column } from "@tanstack/react-table";
import { useGlobalQuery } from "@/libs/store/query";

export const ColumnFilter: React.FC<{ column: Column<any, any> }> = ({
    column,
}) => {

    const globalQuery = useGlobalQuery((state) => state.query);
    const setQuery = useGlobalQuery((state) => state.setQuery);

    const [state, setState] = useState(null as null | { value: any });

    if (!column.getCanFilter()) {
        return null;
    }

    const open = () => {
        let filterValue : string | undefined = undefined;
        globalQuery?.filters?.forEach((filter) => {
            if (filter.attribute === column.id) {
                filterValue = filter.value;
            }
        });
        if(filterValue) {
            setState({ value : filterValue });
        }
        else {
            setState({ value : column.getFilterValue() })
        }
    };

    const close = () => setState(null);

    const change = (value: any) => {
        console.log('ColumnFilter change', value);
        setState({ value })
    };

    const clear = () => {
        column.setFilterValue(undefined);
        close();
    };

    const save = () => {
        if (!state) return;
        column.setFilterValue(state.value);
        close();
    };

    const renderFilterElement = () => {
        const FilterComponent = (column.columnDef?.meta as any)?.filterElement;

        if (!FilterComponent && !!state) {
            return (
                <Input
                    borderRadius="md"
                    size="sm"
                    autoComplete="off"
                    value={state.value}
                    onChange={(e) => change(e.target.value)}
                />
            );
        }

        return (
            <FilterComponent
                value={state?.value}
                onChange={(e: any) => change(e.target.value)}
            />
        );
    };

    return (
        <Menu isOpen={!!state} onClose={close}>
            <MenuButton
                onClick={open}
                as={IconButton}
                aria-label="Options"
                icon={<HiFilter size="16" />}
                variant="ghost"
                size="xs"
            />
            <MenuList p="2">
                {!!state && (
                    <VStack align="flex-start">
                        {renderFilterElement()}
                        <HStack spacing="1">
                            <IconButton
                                aria-label="Clear"
                                size="sm"
                                colorScheme="red"
                                onClick={clear}
                            >
                                <HiX size={18} />
                            </IconButton>
                            <IconButton
                                aria-label="Save"
                                size="sm"
                                onClick={save}
                                colorScheme="green"
                            >
                                <HiCheck size={18} />
                            </IconButton>
                        </HStack>
                    </VStack>
                )}
            </MenuList>
        </Menu>
    );
};