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
import { useRequestForm } from "@/hooks/useRequest";
import { UserForm } from "./create";
import { useRouter } from "next/router";
import useDeleteItem from "@/hooks/useDelete";
import LoadingIndicator from "@/components/loadingIndicator/LoadingIndicator";
import { UiState } from "@/types/ui";


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


    const { isOpen, onOpen, onClose } = useDisclosure()

    const {state, onSelectItem, data, action} = useDeleteItem<User | undefined>({
        path: "users",
        getIdFn: (data: User | undefined) => {
            return data?.id
        }
    })

    const { status, error, data: users } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            return (await axiosInstance.get("users")).data
        },
        initialData: props.users
    })

    const columns = useMemo<ColumnDef<UserColumn>[]>(
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
                    <Link href={"users/details/" + info.getValue()}>
                        <Button colorScheme="green" size={"sm"} me={"3px"}><FiEye></FiEye></Button>
                    </Link>
                    <Button colorScheme="red" size={"sm"} me={"3px"} onClick={() => {
                        const user = info.getValue<User>()
                        onSelectItem(user)
                        onOpen()
                    }}> <FiTrash></FiTrash></Button>
                </>
            }
        ], []
    )

    const table = useReactTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel(),
        debugTable: true
    })


    return <>
        <AdminBaseLayout isLoading={state === UiState.PROGRESS}>
            <Card>
                <CardHeader>
                    <Heading size={"md"}>Users</Heading>
                </CardHeader>
                <CardBody>
                    <Link href={"users/create"}>
                        <Button mb={3} colorScheme="blue" size={"sm"}>Create</Button>
                    </Link>
                    <SimpleTable table={table}></SimpleTable>
                </CardBody>
            </Card>
        </AdminBaseLayout>
        <ConfirmationModal
            onClose={onClose}
            isOpen={isOpen} title={"Confirmation"}
            message={`Do you want to delete this user ${data?.email}?`}
            action={() => { action() }}
        ></ConfirmationModal>
    </>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const queryClient: QueryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['users'],
        queryFn: async () => {
            return (await axiosInstance.get("users")).data
        }
    })
    return {
        props: {
            users: dehydrate(queryClient)
        }
    }
}