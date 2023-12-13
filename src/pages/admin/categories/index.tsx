import AdminBaseLayout from "@/components/admin/layout/AdminBaselayout"
import SimpleTable from "@/components/admin/table"
import ErrorContent from "@/components/error/intex"
import ConfirmationModal from "@/components/modal"
import { useMutateWithUi } from "@/hooks/provider/useMutateWithUi"
import { useTableWithUi } from "@/hooks/provider/useTableWithUi"
import { useAuth } from "@/hooks/useAuth"
import { useCheckAuth } from "@/hooks/useCheckAuth"
import { LOGIN_URL } from "@/libs/configuration/url"
import { authProvider } from "@/libs/provider/auth"
import { RestDataProvider } from "@/libs/provider/rest-data"
import { createQueryClient } from "@/libs/query"
import { protectUrl } from "@/libs/utilities/url"
import { Category } from "@/types/category"
import { UiState } from "@/types/ui"
import { Button, Card, CardBody, CardHeader, Heading, Text, useDisclosure } from "@chakra-ui/react"
import { QueryClient, dehydrate } from "@tanstack/react-query"
import { ColumnDef } from "@tanstack/react-table"
import { GetServerSidePropsContext } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useMemo } from "react"
import { FiEdit, FiEye, FiTrash } from "react-icons/fi"

export const categoryDataProvider = new RestDataProvider<Category>({
    resource: "categories"
})

interface CategoryColumn {
    id: string
    name: string
    description: string
    createdAt: Date
    updatedAt: Date
    action: string
}

export default function ListCategories(props: any) {

    const router = useRouter();

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { state, actionWithParams, selectedItem, setSelectedItem } = useMutateWithUi<Category>({
        restDataProvider: categoryDataProvider,
        onSuccess: (data: any) => {
            router.reload()
        },
        onError: (error: any) => {

        }
    })

    const columns: ColumnDef<CategoryColumn>[] = useMemo<ColumnDef<CategoryColumn>[]>(
        () => [
            {
                id: "id",
                header: "Id",
                accessorFn: (row) => row.id,
                cell: (info) => info.getValue()
            },
            {
                id: "name",
                header: "Name",
                enableColumnFilter: true,
                enableSorting: true,
                accessorFn: (row) => row.name,
                cell: (info) => info.getValue()
            }, {
                id: "description",
                header: "Description",
                enableColumnFilter: true,
                enableSorting: true,
                accessorFn: (row) => row.description,
                cell: (info) => info.getValue()
            },

            {
                id: "action",
                header: "Action",
                accessorFn: (row) => row,
                cell: (info) => <>
                    <Link href={"categories/edit/" + info.getValue<Category>().id}>
                        <Button colorScheme="blue" size={"sm"} me={"3px"}> <FiEdit></FiEdit></Button>
                    </Link>
                    <Link href={"categories/details/" + info.getValue<Category>().id}>
                        <Button colorScheme="green" size={"sm"} me={"3px"}><FiEye></FiEye></Button>
                    </Link>
                    <Button colorScheme="red" size={"sm"} me={"3px"} onClick={() => {
                        const data = info.getValue<Category>()
                        setSelectedItem(data)
                        onOpen()
                    }}> <FiTrash></FiTrash></Button>
                </>
            }
        ], []
    )

    const { table, pageIndex, pageSize, pageChangeAction, result, uiState } = useTableWithUi({
        initalData: props.categories,
        columns: columns,
        queries: props.queries,
        restDataProvider: categoryDataProvider
    })

    useCheckAuth({
        statusCode: result?.statusCode,
    })

    return <>
        <AdminBaseLayout isLoading={state.state === UiState.PROGRESS}>
            <Card>
                {result?.error && <ErrorContent error={result.error} statusCode={result.statusCode}></ErrorContent> }
                {!result?.error && <>
                    <CardHeader>
                        <Heading size={"md"}>Categories</Heading>
                    </CardHeader>
                    <CardBody>
                        <Link href={"categories/create"}>
                            <Button mb={3} colorScheme="blue" size={"sm"}>Create</Button>
                        </Link>
                        <SimpleTable table={table} currentPage={pageIndex} totalPage={pageSize} pageChangeAction={pageChangeAction} ></SimpleTable>
                    </CardBody>
                </>}

            </Card>
        </AdminBaseLayout>
        <ConfirmationModal
            onClose={onClose}
            isOpen={isOpen} title={"Confirmation"}
            message={`Do you want to delete this Category ${selectedItem?.name}?`}
            action={() => {
                actionWithParams({
                    method: "delete",
                    id: String(selectedItem?.id),
                    parameter: null
                })
            }}
        ></ConfirmationModal>
    </>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const nextProps = await protectUrl({
        context : context, 
        nextURL : "/admin/categories",
    })
    if(nextProps) {
        return nextProps;
    }
    const query = context.query;
    const params = context.params;
    const queryClient: QueryClient = await createQueryClient(categoryDataProvider, "getPaginateList", params, query)
    return {
        props: {
            categories: dehydrate(queryClient),
            queries: query
        }
    }
}