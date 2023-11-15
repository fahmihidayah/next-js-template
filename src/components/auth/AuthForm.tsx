
import { Formik } from "formik";
import * as Yup from 'yup';
import { Box, Checkbox, FormControl, FormLabel, Button, Flex, Link, Card, CardBody, CardHeader, Text, Divider, Container, Input, Center, Heading, useToast } from "@chakra-ui/react";
import InputComponent from "@/components/form/input/InputComponent";
import { m } from "framer-motion";
import { useRequestForm } from "@/hooks/useRequest";
import LoadingIndicator from "@/components/loadingIndicator/LoadingIndicator";
import { UiState, isLoading } from "@/types/ui";
import { useEffect } from "react";
import { AuthForm } from "@/types/auth/form";
import { UserWithToken } from "@/types/auth/user";
import { authProvider, setUserWithToken } from "@/libs/auth/user";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email'),
    password: Yup.string().required('Password is required')
})

export default function AuthForm() {

    const router = useRouter()
    const toast = useToast()

    const { state, action } = useRequestForm<AuthForm, UserWithToken>({
        path: "auth/login",
        onSuccess: (response: UserWithToken) => {
            authProvider.setUser(response)
            toast({
                title : "Success",
                description : "Login success",
                duration : 2000,
                status : "success",
                isClosable : false,
                position : "top"
            })
            router.push("/home")
        },
        onError: (any) => {

        },
    });

    return <>
        <Formik initialValues={{
            email: '',
            password: ''
        }} validationSchema={validationSchema} onSubmit={values => {
            action(values)
        }}>
            {
                ({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form method="post" onSubmit={handleSubmit}>
                        <InputComponent label="Email"
                            type="email"
                            placeholder="Enter email"
                            id="email"
                            value={values.email}
                            onChange={handleChange}
                            error={errors.email && touched.email ? errors.email : undefined}
                        />
                        <InputComponent label="Password"
                            type="password"
                            placeholder="Enter password"
                            id="password"
                            value={values.password}
                            onChange={handleChange}
                            error={errors.password && touched.password ? errors.password : undefined}
                        />

                        <Button type="submit" colorScheme="blue" isLoading={isSubmitting && state.state === UiState.PROGRESS} mt={4} w={"100%"}>Submit</Button>
                    </form>
                )
            }
        </Formik>
    </>
}