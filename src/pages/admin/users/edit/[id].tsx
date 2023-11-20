import AdminBaseLayout from "@/components/admin/layout/AdminBaselayout";
import { axiosInstance } from "@/libs/rest-data/axios";
import { Button, Card, CardBody, CardHeader, Heading, useToast } from "@chakra-ui/react";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { UserForm } from "../create";
import { User } from "@/types/auth/user";

import * as Yup from "yup";
import { ObjectShape } from "yup/lib/object";
import { Field, Form, FormikProps } from "formik";
import InputComponent from "@/components/form/input/InputComponent";
import { useEffect } from "react";
import { FormComponent } from "@/components/form";
import { userDataProvider } from "..";
import { createQueryClient } from "@/libs/query";
import { useQueryWithUi } from "@/hooks/provider/useQueryWithUi";

export const userValidationSchema: Yup.ObjectSchema<ObjectShape> = Yup.object().shape({
    email: Yup.string().email('Invalid email'),
    firstName: Yup.string().min(4),
})



export default function UserEdit(props: any) {

    const user = props.userResponse

    const {data, error, status, uiState} = useQueryWithUi<User>({
        restDataProvider : userDataProvider, 
        initalData : user,
        isUseId : true
    })

    return <AdminBaseLayout>
        <Card>
            <CardHeader>
                <Heading size={"md"}>Edit</Heading>
            </CardHeader>
            <CardBody>
                <FormComponent initialFn={() => {

                    return {
                        email: data.email,
                        firstName: data.firstName,
                        lastName: data.lastName
                    }
                }}
                    method={"patch"}
                    validationSchema={userValidationSchema}
                    dataProvider={userDataProvider}
                    id={data?.id}
                    redirect="/admin/users"
                    toastTitle="Success"
                    toastDescription="Success Update User Data" >
                    {
                        ({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting }: FormikProps<any>) => (
                            <form method="patch" onSubmit={handleSubmit}>
                                <InputComponent label="First Name"
                                    type="text"
                                    placeholder="First Name"
                                    id="firstName"
                                    value={values.firstName}
                                    onChange={handleChange}
                                    error={errors.firstName && touched.firstName ? String(errors.firstName) : undefined}
                                />
                                <InputComponent label="Last Name"
                                    type="text"
                                    placeholder="Last Name"
                                    id="lastName"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    error={errors.lastName && touched.lastName ? String(errors.lastName) : undefined}
                                />
                                <InputComponent label="Email"
                                    type="email"
                                    placeholder="Enter email"
                                    id="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    error={errors.email && touched.email ? String(errors.email) : undefined}
                                />

                                <Button type="submit" colorScheme="blue" mt={4} w={"100%"}>Submit</Button>
                            </form>
                        )
                    }
                </FormComponent>
            </CardBody>
        </Card>
    </AdminBaseLayout>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const query = context.query;
    const params = context.params;
    const queryClient: QueryClient = await createQueryClient(userDataProvider, "getOne", params, query)
    return {
        props: {
            userResponse: dehydrate(queryClient)
        }
    }
}