import AuthForm from "@/components/auth/AuthForm";
import Navbar from "@/components/navbar/Navbar";
import { authProvider } from "@/libs/auth/user";
import { Box, Card, CardBody, Flex, Text } from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { AppProps } from "next/app";


export default function LoginPage() {
    return <>
        <Navbar></Navbar>
        <Flex justify="center" m={{
            base: "10vh",
            md: "10vh",
            lg: "10vh",
            sm: "10vh"
        }}>
            <Box w={{
                base: "100%",
                md: "50%",
                lg: "40%",
                sm: "100%"

            }}>
                <Card boxShadow="2xl" rounded="lg">
                    <CardBody>
                        <Text fontSize="2xl" mb="20px" w={"100%"} textAlign="center" fontWeight="bold" >Login</Text>
                        <AuthForm></AuthForm>
                    </CardBody>
                </Card>
            </Box>
        </Flex>
    </>
}
