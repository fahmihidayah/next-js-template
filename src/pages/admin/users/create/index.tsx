import AdminBaseLayout from "@/components/admin/layout/AdminBaselayout";
import { FormComponent } from "@/components/form";
import InputComponent from "@/components/form/input/InputComponent";
import LoadingIndicator from "@/components/loadingIndicator/LoadingIndicator";
import { User } from "@/types/auth/user";
import { UiState } from "@/types/ui";
import { Button, Card, CardBody, CardHeader, Heading, useToast } from "@chakra-ui/react";
import { Field, Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import * as Yup from "yup";
import { ObjectShape } from "yup/lib/object";
import { userDataProvider } from "..";

export const userValidationSchema: Yup.ObjectSchema<ObjectShape> = Yup.object().shape({
    email: Yup.string().email('Invalid email'),
    firstName: Yup.string().min(4),
    password: Yup.string().required('Password is required')
})

export interface UserForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}


export default function CreateUser() {

    return <AdminBaseLayout>
        <Card>
            <CardHeader>
                <Heading size={"md"}>Create</Heading>
            </CardHeader>
            <CardBody>
                <FormComponent initialFn={() => {
                    return {
                        email: "",
                        firstName: "",
                        lastName: "",
                        password: ""
                    }
                }}
                    validationSchema={userValidationSchema}
                    dataProvider={ userDataProvider }
                    method="post"
                    redirect="/admin/users"
                    toastTitle="Success"
                    toastDescription="Success Save User" >
                    {
                        ({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting }: FormikProps<any>) => (
                            <form method="post" onSubmit={handleSubmit}>
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
                                <InputComponent label="Password"
                                    type="password"
                                    placeholder="Enter password"
                                    id="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    error={errors.password && touched.password ? String(errors.password) : undefined}
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