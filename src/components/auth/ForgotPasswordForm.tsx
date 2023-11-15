import { Formik } from 'formik';
import * as Yup from 'yup';
import InputComponent from '../form/input/InputComponent';
import { error } from 'console';
import { Button, useToast } from '@chakra-ui/react';
import { useRequestForm } from '@/hooks/useRequest';
import { ForgotPasswordForm } from '@/types/auth/form';
import { useRouter } from 'next/router';
import { UiState } from '@/types/ui';

const initialValue = {
    email: ''
}

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email')

})


export default function ForgotPasswordForm() {

    const router = useRouter();
    const toast = useToast();

    const { state, action } = useRequestForm<any, ForgotPasswordForm>({
        path: "auth/forgot-password",
        onSuccess: (any) => {
            router.push("/home")
            toast({
                title: "Succes",
                description: "Reset password sent to your email!",
                duration: 2000,
                status: "success",
                isClosable: false,
                position: "top"
            })
        },
        onError: (error) => {

        }
    })

    return <>
        <Formik
            initialValues={{
                email : ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                action(values)
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
                            error={errors.email && touched.email ? errors.email : null}
                        />
                        <Button type="submit" colorScheme="blue" isLoading={isSubmitting && state.state === UiState.PROGRESS} mt={4} w={"100%"}>Submit</Button>
                    </form>
            }

        </Formik>
    </>
}