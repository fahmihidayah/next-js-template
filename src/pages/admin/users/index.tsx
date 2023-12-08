import AdminBaseLayout from "@/components/admin/layout/AdminBaselayout";
import { axiosInstance } from "@/libs/rest-data/axios";
import { User } from "@/types/auth/user";
import { Button, Card, CardBody, CardHeader, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useEffect, useMemo, useState } from "react";
import {
    FiEye,
    FiEdit,
    FiTrash
} from 'react-icons/fi'

import {
    ColumnDef,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import SimpleTable from "@/components/admin/table";
import Link from "next/link";
import ConfirmationModal from "@/components/modal";
import { UserForm } from "./create";
import { useRouter } from "next/router";
import LoadingIndicator from "@/components/loadingIndicator/LoadingIndicator";
import { UiState } from "@/types/ui";
import { RestDataProvider } from "@/libs/provider/rest-data";
import { useMutateWithUi } from "@/hooks/provider/useMutateWithUi";
import { createQueryClient } from "@/libs/query";
import { useSearchParams } from "next/navigation";
import { useTableWithUi } from "@/hooks/provider/useTableWithUi";
import { useGlobalQuery } from "@/libs/store/query";

export const userDataProvider = new RestDataProvider<User>({
    resource : "users",
})

interface UserColumn {
    id: string
    email: string
    firstName: string
    lastName: string
    createdAt: Date
    updatedAt: Date
    action: string
}

export default function ListUsers(props: any) {

    const router = useRouter();

    const { isOpen, onOpen, onClose } = useDisclosure()

    const {state, actionWithParams, selectedItem, setSelectedItem} = useMutateWithUi<User>({
        restDataProvider : userDataProvider,
        onSuccess : (data : any) => {
            router.reload()
        },
        onError : (error : any) => {
            
        }
    })

    const columns : ColumnDef<UserColumn>[] = useMemo<ColumnDef<UserColumn>[]>(
        () => [
            {
                id: "id",
                header: "Id",
                accessorFn: (row) => row.id,
                cell: (info) => info.getValue()
            },
            {
                id: "firstName",
                header: "First Name",

                enableColumnFilter: true,
                enableSorting: true,
                accessorFn: (row) => row.firstName,
                cell: (info) => info.getValue()
            },
            {
                id: "lastName",
                header: "Last Name",
                accessorFn: (row) => row.lastName,
                cell: (info) => info.getValue()
            },
            {
                id: "email",
                header: "Email",
                accessorFn: (row) => row.email,
                cell: (info) => info.getValue()
            },
            {
                id: "action",
                header: "Action",
                accessorFn: (row) => row,
                cell: (info) => <>
                    <Link href={"users/edit/" + info.getValue<User>().id}>
                        <Button colorScheme="blue" size={"sm"} me={"3px"}> <FiEdit></FiEdit></Button>
                    </Link>
                    <Link href={"users/details/" + info.getValue<User>().id}>
                        <Button colorScheme="green" size={"sm"} me={"3px"}><FiEye></FiEye></Button>
                    </Link>
                    <Button colorScheme="red" size={"sm"} me={"3px"} onClick={() => {
                        const user = info.getValue<User>()
                        setSelectedItem(user)
                        onOpen()
                    }}> <FiTrash></FiTrash></Button>
                </>
            }
        ], []
    )
    
    const {table, pageIndex, pageSize, pageChangeAction} = useTableWithUi({
        initalData : props.users,
        columns : columns,
        queries : props.queries,
        restDataProvider : userDataProvider
    })

    return <>
        <AdminBaseLayout isLoading={state.state === UiState.PROGRESS}>
            <Card>
                <CardHeader>
                    <Heading size={"md"}>Users</Heading>
                </CardHeader>
                <CardBody>
                    <Link href={"users/create"}>
                        <Button mb={3} colorScheme="blue" size={"sm"}>Create</Button>
                    </Link>
                    <SimpleTable table={table} currentPage={pageIndex} totalPage={pageSize} pageChangeAction={pageChangeAction} ></SimpleTable>
                </CardBody>
            </Card>
        </AdminBaseLayout>
        <ConfirmationModal
            onClose={onClose}
            isOpen={isOpen} title={"Confirmation"}
            message={`Do you want to delete this user ${selectedItem?.email}?`}
            action={() => { actionWithParams({
                method : "delete",
                id : selectedItem?.id,
                parameter : null
            }) }}
        ></ConfirmationModal>
    </>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const query = context.query;
    const params = context.params;
    const queryClient: QueryClient = await createQueryClient(userDataProvider, "getPaginateList", params, query)
    return {
        props: {
            users: dehydrate(queryClient),
            queries : query
        }
    }
}