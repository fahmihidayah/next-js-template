import AdminBaseLayout from "@/components/admin/layout/AdminBaselayout";
import { createQueryClient } from "@/libs/query";
import { axiosInstance } from "@/libs/rest-data/axios";
import { Card, CardBody, CardHeader, Heading, Text } from "@chakra-ui/react";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useQueryWithUi } from "@/hooks/provider/useQueryWithUi";
import { User } from "@/types/auth/user";
import { categoryDataProvider } from "..";
import { Category } from "@/types/category";
import { protectUrl } from "@/libs/utilities/url";

export default function CategoryDetail(props : any) {

    const category = props.categoryResponse

    const {data : response, error, status, uiState} = useQueryWithUi<Category>({
        restDataProvider : categoryDataProvider, 
        initalData : category,
        isUseId : true
    })

    return <AdminBaseLayout>
        <Card>
            <CardHeader>
                <Heading size={"md"}>Details</Heading>
            </CardHeader>
            <CardBody>
                <Heading size={"sm"}>Name</Heading>
                <Text>{response.name}</Text>
                <br/>
                <Heading size={"sm"}>Description</Heading>
                <Text>{response.description}</Text>
            </CardBody>
        </Card>
    </AdminBaseLayout>
}

export async function getServerSideProps(context : GetServerSidePropsContext) {
    const nextProps = await protectUrl({
        context : context, 
        nextURL : "/admin/categories/details/" + context.params?.id,
    })
    if(nextProps) {
        return nextProps;
    }
    const query = context.query;
    const params = context.params;
    const queryClient: QueryClient = await createQueryClient(categoryDataProvider, "getOne", params, query)
    return {
        props: {
            categoryResponse: dehydrate(queryClient)
        }
    }
}