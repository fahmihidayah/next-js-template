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
import { categoryDataProvider } from "..";

export const dataValidationSchema: Yup.ObjectSchema<ObjectShape> = Yup.object().shape({
    name: Yup.string().min(4),
    description: Yup.string().min(4),
})

export interface CategoryForm {
    name: string;
    description: string;
}


export default function CreateCategory() {

    return <AdminBaseLayout>
        <Card>
            <CardHeader>
                <Heading size={"md"}>Create</Heading>
            </CardHeader>
            <CardBody>
                <FormComponent initialFn={() => {
                    return {
                        name: "",
                        description: ""
                    }
                }}
                    validationSchema={dataValidationSchema}
                    dataProvider={ categoryDataProvider }
                    method="post"
                    redirect="/admin/categories"
                    toastTitle="Success"
                    toastDescription="Success Save Category" >
                    {
                        ({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting }: FormikProps<any>) => (
                            <form method="post" onSubmit={handleSubmit}>
                                <InputComponent label="Name"
                                    type="text"
                                    placeholder="Name"
                                    id="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    error={errors.name && touched.name ? String(errors.name) : undefined} />
                                <InputComponent label="Description"
                                    type="text"
                                    placeholder="Description"
                                    id="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    error={errors.description && touched.description ? String(errors.description) : undefined} />

                                <Button type="submit" colorScheme="blue" mt={4} w={"100%"}>Submit</Button>
                            </form>
                        )
                    }

                </FormComponent>
            </CardBody>
        </Card>

    </AdminBaseLayout>
}