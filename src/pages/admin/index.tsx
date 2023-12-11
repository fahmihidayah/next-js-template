import AdminBaseLayout from "@/components/admin/layout/AdminBaselayout";
import { Button, Card, CardBody, CardHeader, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";

export default function AdminIndex() {
    return <AdminBaseLayout>

        <SimpleGrid
            columns={{ base: 1, md: 3, lg: 3, xl: 3, "2xl": 3, sm : 1}}
            spacing={5}
            mt={2}
            mb={2}
            p={2}
        >
            <Card>
                <CardBody>
                    <Heading size={"md"}>Users</Heading>
                    <Heading>20</Heading>

                    <Button colorScheme="blue" mt={5} size={"sm"}>View</Button>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <Heading size={"md"}>Categories</Heading>
                    <Heading>4</Heading>
                    <Button colorScheme="blue" mt={5} size={"sm"}>View</Button>
                </CardBody>
            </Card>
            <Card>

                <CardBody>
                    <Heading size={"md"}>Posts</Heading>
                    <Heading>12</Heading>
                    <Button colorScheme="blue" mt={5} size={"sm"} >View</Button>
                </CardBody>
            </Card>
        </SimpleGrid>

    </AdminBaseLayout>
}