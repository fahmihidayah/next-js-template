import AdminBaseLayout from "@/components/admin/layout/AdminBaselayout";
import { createQueryClient } from "@/libs/query";
import { axiosInstance } from "@/libs/rest-data/axios";
import { Card, CardBody, CardHeader, Heading, Text } from "@chakra-ui/react";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { userDataProvider } from "..";
import { useQueryWithUi } from "@/hooks/provider/useQueryWithUi";
import { User } from "@/types/auth/user";

export default function UserDetail(props : any) {

    const user = props.userResponse

    const {data : response, error, status, uiState} = useQueryWithUi<User>({
        restDataProvider : userDataProvider, 
        initalData : user,
        isUseId : true
    })

    return <AdminBaseLayout>
        <Card>
            <CardHeader>
                <Heading size={"md"}>Details</Heading>
            </CardHeader>
            <CardBody>
                <Heading size={"sm"}>First Name</Heading>
                <Text>{response.firstName}</Text>
                <Heading size={"sm"}>Last Name</Heading>
                <Text>{response.lastName}</Text>
                <Heading size={"sm"}>Email</Heading>
                <Text>{response.email}</Text>
            </CardBody>
        </Card>
    </AdminBaseLayout>
}

export async function getServerSideProps(context : GetServerSidePropsContext) {
    const query = context.query;
    const params = context.params;
    const queryClient: QueryClient = await createQueryClient(userDataProvider, "getOne", params, query)
    return {
        props: {
            userResponse: dehydrate(queryClient)
        }
    }
}