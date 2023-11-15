import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { Card, CardBody, CardHeader, Flex, Heading } from "@chakra-ui/react";

export default function ForgotPasswordPage() {
    return <>
        <Flex justify="center">
            <Card mt={"10%"} w={{
               base: "80%",
               md: "40%",
               lg: "30%",
               sm: "80%"
            }}>
                <CardHeader>
                    <Heading size="lg" w="100%" textAlign="center">Forgot Password</Heading>
                </CardHeader>
                <CardBody>
                    <ForgotPasswordForm></ForgotPasswordForm>
                </CardBody>
            </Card>
        </Flex>
    </>
}