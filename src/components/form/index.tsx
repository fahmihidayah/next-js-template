import { useRequestForm } from "@/hooks/useRequest";
import { UiState } from "@/types/ui";
import { useToast } from "@chakra-ui/react";
import { Formik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { ObjectShape } from "yup/lib/object";
import LoadingIndicator from "../loadingIndicator/LoadingIndicator";

export interface FormComponentProps {
    children: any;
    validationSchema: Yup.ObjectSchema<ObjectShape>
    path: string;
    redirect: string;
    toastTitle: string;
    toastDescription: string;
    initialFn: () => any;
    method?: string | null
}

export function FormComponent<F, D>({
    children,
    initialFn,
    method,
    validationSchema, path, redirect, toastTitle, toastDescription }: FormComponentProps) {
    const router = useRouter();
    const toast = useToast();

    const { state, action } = useRequestForm<F, D>({
        path: path,
        method: method,
        onSuccess: () => {
            toast({
                title: toastTitle,
                description: toastDescription,
                duration: 2000,
                position: 'top',
                status: "success",
                isClosable: true
            })
            router.push(redirect)
        },
        onError: (error: any) => {

        }
    })
    console.log('initial form ', initialFn())
    return <>
        <Formik
            initialValues={
                initialFn()
            }
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                console.log(values)
                action(values)
            }}>
            {
                children
            }
        </Formik>
        {state.state === UiState.PROGRESS && <LoadingIndicator></LoadingIndicator>}
    </>
}
