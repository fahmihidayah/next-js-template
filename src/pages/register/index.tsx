
import { Formik } from "formik";
import * as Yup from 'yup';
import { Box, Checkbox, FormControl, FormLabel, Button, Flex, Link, Card, CardBody, CardHeader, Text, Divider, Container, Input, Center, Heading, Spacer, HStack } from "@chakra-ui/react";
import InputComponent from "@/components/form/input/InputComponent";
import { m } from "framer-motion";
import RegistrationForm from "@/components/auth/RegistrationForm";
import Navbar from "@/components/navbar/Navbar";

const validationSchema = Yup.object().shape({
    firstName: Yup.string().min(5, 'Invalid first name'),
    email: Yup.string().email('Invalid email'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().required('Password is required')
})

export default function RegistrationPage() {
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
                <CardHeader>
                    <Text fontSize="3xl" w={"100%"} textAlign="center" fontWeight="bold" >Register</Text>
                </CardHeader>
                <CardBody>
                    <RegistrationForm></RegistrationForm>
                </CardBody>
            </Card>
        </Box>
    </Flex>
    </>
}
