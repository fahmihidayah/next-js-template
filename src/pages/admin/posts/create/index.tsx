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
import { postDataProvider } from "..";
import { useQueryWithUi } from "@/hooks/provider/useQueryWithUi";
import { categoryDataProvider } from "../../categories";
import { Category } from "@/types/category";

export const dataValidationSchema: Yup.ObjectSchema<ObjectShape> = Yup.object().shape({
    title: Yup.string().min(4),
    category_id: Yup.string().required(),
    content: Yup.string().min(4)
})

export interface PostForm {
    title: string;
    category_id: string;
    content: string;
}


export default function CreatePost() {

    const { data, error, status, uiState } = useQueryWithUi({
        restDataProvider: categoryDataProvider
    })

    console.log(data)

    return <AdminBaseLayout>
        <Card>
            <CardHeader>
                <Heading size={"md"}>Create</Heading>
            </CardHeader>
            <CardBody>
                <FormComponent initialFn={() => {
                    return {
                        title: "",
                        category_id: "",
                        content: ""
                    }
                }}
                    validationSchema={dataValidationSchema}
                    dataProvider={postDataProvider}
                    method="post"
                    redirect="/admin/posts"
                    toastTitle="Success"
                    toastDescription="Success Save Post" >
                    {
                        ({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting }: FormikProps<any>) => (
                            <form method="post" onSubmit={handleSubmit}>
                                <InputComponent label="Title"
                                    type="text"
                                    placeholder="Title"
                                    id="title"
                                    value={values.title}
                                    onChange={handleChange}
                                    error={errors.title && touched.title ? String(errors.title) : undefined} />
                                <InputComponent label="Category"
                                    placeholder="Category"
                                    id="category_id"
                                    value={values.category_id}
                                    onChange={handleChange}
                                    options={data?.map((category: Category) => {
                                        return {
                                            value: category.id,
                                            label: category.name
                                        }
                                    })}
                                    error={errors.categoryId && touched.categoryId ? String(errors.categoryId) : undefined} />
                                <InputComponent label="Content"
                                    type="text"
                                    placeholder="Content"
                                    id="content"
                                    value={values.content}
                                    onChange={handleChange}
                                    error={errors.content && touched.content ? String(errors.content) : undefined} height={200} as={"textarea"} p={5}/>

                                <Button type="submit" colorScheme="blue" mt={4} w={"100%"}>Submit</Button>
                            </form>
                        )
                    }

                </FormComponent>
            </CardBody>
        </Card>

    </AdminBaseLayout>
}