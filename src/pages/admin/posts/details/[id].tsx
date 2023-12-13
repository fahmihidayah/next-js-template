import AdminBaseLayout from "@/components/admin/layout/AdminBaselayout";
import { createQueryClient } from "@/libs/query";
import { axiosInstance } from "@/libs/rest-data/axios";
import { Card, CardBody, CardHeader, Heading, Tag, Text } from "@chakra-ui/react";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useQueryWithUi } from "@/hooks/provider/useQueryWithUi";
import { User } from "@/types/auth/user";
import { postDataProvider } from "..";
import { Post } from "@/types/blog/post";
import { protectUrl } from "@/libs/utilities/url";

export default function PostDetail(props : any) {

    const user = props.postResponse

    const {data : response, error, status, uiState} = useQueryWithUi<Post>({
        restDataProvider : postDataProvider, 
        initalData : user,
        isUseId : true
    })

    return <AdminBaseLayout>
        <Card>
            <CardHeader>
                <Heading size={"md"}>Details</Heading>
            </CardHeader>
            <CardBody>
                <Heading size={"sm"}>Title</Heading>
                <Text>{response.title}</Text>
                <br/>
                <Heading size={"sm"}>Category</Heading>
                <Tag colorScheme="blue">{response?.category?.name}</Tag>
                <br/>
                <br/>
                <Heading size={"sm"}>Content</Heading>
                <Text>{response.content}</Text>
            </CardBody>
        </Card>
    </AdminBaseLayout>
}

export async function getServerSideProps(context : GetServerSidePropsContext) {
    const nextProps = await protectUrl({
        context : context, 
        nextURL : "/admin/posts"+ context.params?.id,
    })
    if(nextProps) {
        return nextProps;
    }
    const query = context.query;
    const params = context.params;
    const queryClient: QueryClient = await createQueryClient(postDataProvider, "getOne", params, query)
    return {
        props: {
            postResponse: dehydrate(queryClient)
        }
    }
}