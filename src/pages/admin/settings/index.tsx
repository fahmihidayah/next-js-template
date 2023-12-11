import AdminBaseLayout from "@/components/admin/layout/AdminBaselayout";
import InputComponent from "@/components/form/input/InputComponent";
import { Button, Card, CardBody, CardHeader, Container, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";

export default function Settings() {
    return <AdminBaseLayout>
        <Card w={"100%"}>
            <CardHeader>
                <Flex justifyContent={"space-between"}>

                <Heading size={"md"}>Settings</Heading>
                <Button colorScheme="blue" size={"sm"}>Save</Button>
                </Flex>
            </CardHeader>
            <CardBody>
                
                <Grid templateColumns={"repeat(2, 1fr)"} gap={3}>
                
                    <GridItem>
                    <Heading mb={5} size={"sm"}>About</Heading>
                        <InputComponent label="Website Name"
                            type="text"
                            placeholder=""
                            id="name"
                            value={""}
                            onChange={() => { }}
                            error={""} />
                        <InputComponent label="Description"
                            type="text"
                            placeholder=""
                            id="description"
                            value={""}
                            p={5}
                            height={100}
                            onChange={() => { }}
                            error={""} as={"textarea"} />
                            
                            
                    </GridItem>
                    <GridItem>
                    <Heading mb={5} size={"sm"}>Info</Heading>
                    <InputComponent label="Email"
                            type="email"
                            placeholder=""
                            id="description"
                            value={""}
                            onChange={() => { }}
                            error={""} />
                            <InputComponent label="Phone"
                            type="email"
                            placeholder=""
                            id="description"
                            value={""}
                            onChange={() => { }}
                            error={""} />
                    </GridItem>
                </Grid>
            </CardBody>
        </Card>
    </AdminBaseLayout>
}