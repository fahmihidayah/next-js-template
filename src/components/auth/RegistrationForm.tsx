import { Button, HStack, useToast } from "@chakra-ui/react";
import { Formik } from "formik";
import InputComponent from "../form/input/InputComponent";
import * as Yup from 'yup';
import { RegisterForm } from "@/types/auth/form";
import { UiState } from "@/types/ui";
import { User, UserWithToken } from "@/types/auth/user";
import { useRouter } from 'next/router'
import { useMutateWithUi } from "@/hooks/provider/useMutateWithUi";
import { authDataProvider } from "./AuthForm";


const validationSchema = Yup.object().shape({
    firstName: Yup.string().min(5, 'Invalid first name'),
    email: Yup.string().email('Invalid email'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().required('Password is required'),

})

export default function RegistrationForm() {
    const router = useRouter();
    const toast = useToast();

    const {actionWithParams, selectedItem, setSelectedItem, state} = useMutateWithUi<UserWithToken>({
        restDataProvider : authDataProvider,
        onSuccess : (data : UserWithToken) => {
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
        onError : (error : any) => {
            toast({
                title : "Error",
                description : error.message,
                duration : 2000,
                status : "error",
                isClosable : false,
                position : "top"
            })
        }
    })

    // const { state, action } = useRequestForm<RegisterForm, User>({
    //     path: "auth/register",
    //     onSuccess: (response: User) => {
    //         toast({
    //             title : "Success",
    //             description : "Registration Success",
    //             duration : 2000,
    //             status : "success",
    //             isClosable : false,
    //             position : "top"
    //         })
    //         router.push("/home")
    //     },
    //     onError: (error: any) => {

    //     }
    // });

    return <Formik initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }} validationSchema={validationSchema} onSubmit={values => {
        actionWithParams({
            method: "post",
            conf : {
                resource : "auth/register"
            },
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
                    <HStack spacing={"10px"}>
                        <InputComponent
                            label="First Name"
                            type="text"
                            placeholder="First Name"
                            id="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            error={errors.firstName && touched.firstName ? errors.firstName : undefined}
                        />
                        <InputComponent label="Last Name"
                            type="text"
                            placeholder="Last Name"
                            id="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            error={errors.lastName && touched.lastName ? errors.lastName : undefined}
                        />
                    </HStack>
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

                    <InputComponent label="Confirm Password"
                        type="password"
                        placeholder="Confirm password"
                        id="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        error={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : undefined}
                    />

                    <Button type="submit" colorScheme="blue" isLoading={isSubmitting && state.state === UiState.PROGRESS} mt={4} w={"100%"}>Register</Button>
                </form>
            )
        }

    </Formik>
}