import AdminBaseLayout from "@/components/admin/layout/AdminBaselayout";
import { axiosInstance } from "@/libs/rest-data/axios";
import { Button, Card, CardBody, CardHeader, Heading, useToast } from "@chakra-ui/react";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";


import * as Yup from "yup";
import { ObjectShape } from "yup/lib/object";
import { Field, Form, FormikProps } from "formik";
import InputComponent from "@/components/form/input/InputComponent";
import { useEffect } from "react";
import { FormComponent } from "@/components/form";
import { createQueryClient } from "@/libs/query";
import { useQueryWithUi } from "@/hooks/provider/useQueryWithUi";
import { categoryDataProvider } from "..";
import { Category } from "@/types/category";
import { dataValidationSchema } from "../create";
import { protectUrl } from "@/libs/utilities/url";

export default function CategoryEdit(props: any) {

    const category = props.categoryResponse

    const {data, error, status, uiState} = useQueryWithUi<Category>({
        restDataProvider : categoryDataProvider, 
        initalData : category,
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
                        name : data.name,
                        description : data.description
                    }
                }}
                    method={"patch"}
                    validationSchema={dataValidationSchema}
                    dataProvider={categoryDataProvider}
                    id={data?.id}
                    redirect="/admin/categories"
                    toastTitle="Success"
                    toastDescription="Success Update Category Data" >
                    {
                        ({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting }: FormikProps<any>) => (
                            <form method="patch" onSubmit={handleSubmit}>
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
                                    pt={2}
                                    pb={2}
                                    h={200}
                                    as={"textarea"}
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const nextProps = await protectUrl({
        context : context, 
        nextURL : "/admin/categories/edit/" + context.params?.id,
    })
    if(nextProps) {
        return nextProps;
    }
    const query = context.query;
    const params = context.params;
    const queryClient: QueryClient = await createQueryClient(categoryDataProvider, "getOne", params, query)
    return {
        props: {
            categoryResponse: dehydrate(queryClient)
        }
    }
}