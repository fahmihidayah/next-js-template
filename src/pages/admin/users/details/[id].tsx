import AdminBaseLayout from "@/components/admin/layout/AdminBaselayout";
import { axiosInstance } from "@/libs/rest-data/axios";
import { Card, CardBody, CardHeader, Heading, Text } from "@chakra-ui/react";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

export default function UserDetail(props : any) {

    const router = useRouter();

    const {status, error, data} = useQuery({
        queryKey: ['users', router.query.id ],
        queryFn: async () => {
            return (await axiosInstance.get(`users/${router.query.id}`)).data.data
        },
        initialData: props.user
    })

    return <AdminBaseLayout>
        <Card>
            <CardHeader>
                <Heading size={"md"}>Details</Heading>
            </CardHeader>
            <CardBody>
                <Heading size={"sm"}>First Name</Heading>
                <Text>{data.firstName}</Text>
                <Heading size={"sm"}>Last Name</Heading>
                <Text>{data.lastName}</Text>
                <Heading size={"sm"}>Email</Heading>
                <Text>{data.email}</Text>
            </CardBody>
        </Card>
    </AdminBaseLayout>
}

export async function getServerSideProps(context : GetServerSidePropsContext) {
    const queryClient = new QueryClient();
    const {id} = context.query;
    console.log(`user id ${id}`)
    await queryClient.prefetchQuery({
        queryKey : ['user', id],
        queryFn: async () => (await axiosInstance.get(`users/${id}`)).data.data
    })

    return {
        props : {
            user: dehydrate(queryClient)
        }
    }
}