import AdminBaseLayout from "@/components/admin/layout/AdminBaselayout"
import SimpleTable from "@/components/admin/table"
import ErrorContent from "@/components/error/intex"
import ConfirmationModal from "@/components/modal"
import { useMutateWithUi } from "@/hooks/provider/useMutateWithUi"
import { useTableWithUi } from "@/hooks/provider/useTableWithUi"
import { useCheckAuth } from "@/hooks/useCheckAuth"
import { RestDataProvider } from "@/libs/provider/rest-data"
import { createQueryClient } from "@/libs/query"
import { protectUrl } from "@/libs/utilities/url"
import { Post } from "@/types/blog/post"
import { UiState } from "@/types/ui"
import { Button, Card, CardBody, CardHeader, Heading, useDisclosure } from "@chakra-ui/react"
import { QueryClient, dehydrate } from "@tanstack/react-query"
import { ColumnDef } from "@tanstack/react-table"
import { GetServerSidePropsContext } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMemo } from "react"
import { FiEdit, FiEye, FiTrash } from "react-icons/fi"

export const postDataProvider = new RestDataProvider<Post>({
    resource: "posts"
})

interface PostColumn {
    id: string
    title: string
    content: string
    createdAt: Date
    updatedAt: Date
    action: string
}

export default function ListPosts(props: any) {

    const router = useRouter();

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { state, actionWithParams, selectedItem, setSelectedItem } = useMutateWithUi<Post>({
        restDataProvider: postDataProvider,
        onSuccess: (data: any) => {
            router.reload()
        },
        onError: (error: any) => {

        }
    })

    const columns: ColumnDef<PostColumn>[] = useMemo<ColumnDef<PostColumn>[]>(
        () => [
            {
                id: "id",
                header: "Id",
                accessorFn: (row) => row.id,
                cell: (info) => info.getValue()
            },
            {
                id: "title",
                header: "Title",
                enableColumnFilter: true,
                enableSorting: true,
                accessorFn: (row) => row.title,
                cell: (info) => info.getValue()
            }, {
                id: "content",
                header: "Content",
                enableColumnFilter: true,
                enableSorting: true,
                accessorFn: (row) => row.content.length < 50 ? row.content : row.content.substring(0, 50) + "...",
                cell: (info) => info.getValue()
            },

            {
                id: "action",
                header: "Action",
                accessorFn: (row) => row,
                cell: (info) => <>
                    <Link href={"posts/edit/" + info.getValue<Post>().id}>
                        <Button colorScheme="blue" size={"sm"} me={"3px"}> <FiEdit></FiEdit></Button>
                    </Link>
                    <Link href={"posts/details/" + info.getValue<Post>().id}>
                        <Button colorScheme="green" size={"sm"} me={"3px"}><FiEye></FiEye></Button>
                    </Link>
                    <Button colorScheme="red" size={"sm"} me={"3px"} onClick={() => {
                        const data = info.getValue<Post>()
                        setSelectedItem(data)
                        onOpen()
                    }}> <FiTrash></FiTrash></Button>
                </>
            }
        ], []
    )

    const { table, pageIndex, pageSize, pageChangeAction, result, uiState } = useTableWithUi({
        initalData: props.posts.data ?? props.posts,
        columns: columns,
        queries: props.queries,
        restDataProvider: postDataProvider
    })

    useCheckAuth({
        statusCode: result?.statusCode,
    })
    
    return <>
        <AdminBaseLayout isLoading={state.state === UiState.PROGRESS}>
            <Card>
                {result?.error && <ErrorContent error={result.error} statusCode={result.statusCode}></ErrorContent>}
                {!result?.error && <>
                    <CardHeader>
                        <Heading size={"md"}>Posts</Heading>
                    </CardHeader>
                    <CardBody>
                        <Link href={"posts/create"}>
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
            message={`Do you want to delete this Content ${selectedItem?.title}?`}
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
        nextURL : "/admin/posts",
    })
    if(nextProps) {
        return nextProps;
    }
    const query = context.query;
    const params = context.params;
    const queryClient: QueryClient = await createQueryClient(postDataProvider, "getPaginateList", params, query)
    return {
        props: {
            posts: dehydrate(queryClient),
            queries: query
        }
    }
}