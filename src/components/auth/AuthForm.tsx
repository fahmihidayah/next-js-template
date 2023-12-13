
import { Formik } from "formik";
import * as Yup from 'yup';
import { Box, Checkbox, FormControl, FormLabel, Button, Flex, Link, Card, CardBody, CardHeader, Text, Divider, Container, Input, Center, Heading, useToast } from "@chakra-ui/react";
import InputComponent from "@/components/form/input/InputComponent";
import { m } from "framer-motion";
import LoadingIndicator from "@/components/loadingIndicator/LoadingIndicator";
import { UiState, isLoading } from "@/types/ui";
import { useEffect } from "react";
import { AuthForm } from "@/types/auth/form";
import { User, UserWithToken } from "@/types/auth/user";
import { authProvider } from "@/libs/provider/auth";
import { redirect, useRouter } from "next/navigation";
import { useMutateWithUi } from "@/hooks/provider/useMutateWithUi";
import { userDataProvider } from "@/pages/admin/users";
import { RestDataProvider } from "@/libs/provider/rest-data";
import { useSearchParams } from "next/dist/client/components/navigation";

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email'),
    password: Yup.string().required('Password is required')
})

export const authDataProvider = new RestDataProvider<UserWithToken>({
    resource : "auth"
})

export default function AuthForm() {
    const search = useSearchParams();
    const to = search?.get("to") ?? "home";
    const router = useRouter()
    const toast = useToast()

    const {actionWithParams, selectedItem, setSelectedItem, state} = useMutateWithUi<UserWithToken>({
        restDataProvider : authDataProvider,
        onSuccess : (data : UserWithToken) => {
            authProvider.setUser(data)
            toast({
                title : "Success",
                description : "Login success",
                duration : 2000,
                status : "success",
                isClosable : false,
                position : "top"
            })
            router.push(to)
        },
    })

    // const { state, action } = useRequestForm<AuthForm, UserWithToken>({
    //     path: "auth/login",
    //     onSuccess: (response: UserWithToken) => {
    //         authProvider.setUser(response)
    //         toast({
    //             title : "Success",
    //             description : "Login success",
    //             duration : 2000,
    //             status : "success",
    //             isClosable : false,
    //             position : "top"
    //         })
    //         router.push("/home")
    //     },
    //     onError: (any) => {

    //     },
    // });

    return <>
        <Formik initialValues={{
            email: '',
            password: ''
        }} validationSchema={validationSchema} onSubmit={values => {
            actionWithParams({
                conf : {
                    resource : "auth/sign-in"
                },
                method : "post",
                parameter : values
            })
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