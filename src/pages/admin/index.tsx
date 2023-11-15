import AdminBaseLayout from "@/components/admin/layout/AdminBaselayout";
import { Card, CardBody, CardHeader, Flex, Heading, Text } from "@chakra-ui/react";

export default function AdminIndex() {
    return <AdminBaseLayout>
        <Flex  >
            <Card me={1}>
                <CardHeader>
                    <Heading size={"2xl"}>Dashboard</Heading>
                </CardHeader>
                <CardBody>
                    <Text>Content here</Text>
                </CardBody>
            </Card>
            <Card>
                <CardHeader>
                    <Heading size={"2xl"}>Dashboard</Heading>
                </CardHeader>
                <CardBody>
                    <Text>Content here</Text>
                </CardBody>
            </Card>
        </Flex>
    </AdminBaseLayout>
}