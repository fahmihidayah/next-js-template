import { UiState } from "@/types/ui";
import { useToast } from "@chakra-ui/react";
import { Formik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { ObjectShape } from "yup/lib/object";
import LoadingIndicator from "../loadingIndicator/LoadingIndicator";
import { useMutateWithUi } from "@/hooks/provider/useMutateWithUi";
import { RestDataProvider } from "@/libs/provider/rest-data";

export interface FormComponentProps<D> {
    children: any;
    method : 'post' | 'put' | 'patch' | 'delete',
    id? : string;
    dataProvider : RestDataProvider<D>
    validationSchema: Yup.ObjectSchema<ObjectShape>
    redirect: string;
    toastTitle: string;
    toastDescription: string;
    initialFn: () => any;
}

export function FormComponent<D>({
    children,
    method,
    id,
    dataProvider,
    initialFn,
    validationSchema,redirect, toastTitle, toastDescription }: FormComponentProps<D>) {
    const router = useRouter();
    const toast = useToast();

    const {selectedItem, setSelectedItem, state, actionWithParams} = useMutateWithUi<D>({
        restDataProvider : dataProvider,
        onSuccess : (data : D) => {
            toast({
                title : toastTitle,
                description : toastDescription,
                duration : 2000,
                isClosable : true,
                position : 'top',
                status : "success",
            })
            router.push(redirect)
        },
        onError : (error : any) => {
        }
    })

    return <>
        <Formik
            initialValues={
                initialFn()
            }
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                actionWithParams({
                    method : method, 
                    id : id,
                    parameter : values
                })
            }}>
            {
                children
            }
        </Formik>
        {state.state === UiState.PROGRESS && <LoadingIndicator></LoadingIndicator>}
    </>
}
