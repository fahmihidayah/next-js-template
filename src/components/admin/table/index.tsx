import { Box, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { ColumnDef, ColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table as TanTable } from "@tanstack/react-table"
import Pagination from "../pagination";
import { ColumnSorter } from "./ColumnSorter";
import { PageChangeAction } from "@/hooks/provider/useTableWithUi";
import { ColumnFilter } from "./ColumnFilter";

export interface SimpleTableProps<D> {
    table: TanTable<D>,
    currentPage: number,
    totalPage: number,
    pageChangeAction : PageChangeAction
}

export default function SimpleTable<D>({ table, currentPage, totalPage, pageChangeAction }: SimpleTableProps<D>) {

    return <>
        <TableContainer borderWidth={"1px"} borderColor={"gray.100"} rounded={"md"} >
            <Table variant={'striped'}>
                <Thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <Th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}

                                    <ColumnSorter column={header.column} />
                                    <ColumnFilter column={header.column} />
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody>
                    {table.getRowModel().rows.map(row => (
                        <Tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <Td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
        <Box mt={4} >
            <Pagination table={table} pageIndex={currentPage} maxShow={5} pageSize={totalPage} pageChangeAction={pageChangeAction}></Pagination>
        </Box>
    </>
}