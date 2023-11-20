import { Formik } from 'formik';
import * as Yup from 'yup';
import InputComponent from '../form/input/InputComponent';
import { error } from 'console';
import { Button, useToast } from '@chakra-ui/react';
import { ForgotPasswordForm } from '@/types/auth/form';
import { useRouter } from 'next/router';
import { UiState } from '@/types/ui';
import { useMutateWithUi } from '@/hooks/provider/useMutateWithUi';
import { UserWithToken } from '@/types/auth/user';
import { authDataProvider } from './AuthForm';

const initialValue = {
    email: ''
}

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email')

})


export default function ForgotPasswordForm() {

    const router = useRouter();
    const toast = useToast();

    const {actionWithParams, selectedItem, setSelectedItem, state} = useMutateWithUi<UserWithToken>({
        restDataProvider : authDataProvider, 
        onSuccess : (data : UserWithToken) => {
            toast({
                title : "Success",
                description : "Reset password link sent to server",
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

    // const { state, action } = useRequestForm<any, ForgotPasswordForm>({
    //     path: "auth/forgot-password",
    //     onSuccess: (any) => {
    //         router.push("/home")
    //         toast({
    //             title: "Succes",
    //             description: "Reset password sent to your email!",
    //             duration: 2000,
    //             status: "success",
    //             isClosable: false,
    //             position: "top"
    //         })
    //     },
    //     onError: (error) => {

    //     }
    // })

    return <>
        <Formik
            initialValues={{
                email : ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                actionWithParams({
                    method : "post", 
                    conf : {
                        resource : "auth/forgot-password"
                    },
                    parameter : values
                })
            }}
        >
            {
                ({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) =>
                    <form method='post' onSubmit={handleSubmit}>
                        <InputComponent label="Email"
                            type="email"
                            placeholder="Enter email"
                            id="email"
                            value={values.email}
                            onChange={handleChange}
                            error={errors.email && touched.email ? errors.email : undefined}
                        />
                        <Button type="submit" colorScheme="blue" isLoading={isSubmitting && state.state === UiState.PROGRESS} mt={4} w={"100%"}>Submit</Button>
                    </form>
            }

        </Formik>
    </>
}