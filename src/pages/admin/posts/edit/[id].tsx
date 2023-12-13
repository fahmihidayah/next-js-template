import AdminBaseLayout from "@/components/admin/layout/AdminBaselayout";
import { createQueryClient } from "@/libs/query";
import { axiosInstance } from "@/libs/rest-data/axios";
import { Button, Card, CardBody, CardHeader, Heading, Tag, Text } from "@chakra-ui/react";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useQueryWithUi } from "@/hooks/provider/useQueryWithUi";
import { User } from "@/types/auth/user";
import { postDataProvider } from "..";
import { Post } from "@/types/blog/post";
import InputComponent from "@/components/form/input/InputComponent";
import { FormComponent } from "@/components/form";
import { dataValidationSchema } from "../create";
import { FormikProps } from "formik";
import { categoryDataProvider } from "../../categories";
import { Category } from "@/types/category";
import { protectUrl } from "@/libs/utilities/url";

export default function PostDetail(props : any) {

    const user = props.postResponse

    const {data : response, error, status, uiState} = useQueryWithUi<Post>({
        restDataProvider : postDataProvider, 
        initalData : user,
        isUseId : true
    })

    const { data, error : categoryError, status : categoryStatus, uiState : categoryUiState} = useQueryWithUi({
        restDataProvider: categoryDataProvider
    })

    return <AdminBaseLayout>
        <Card>
            <CardHeader>
                <Heading size={"md"}>Edit</Heading>
            </CardHeader>
            <CardBody>
                <FormComponent initialFn={() => {

                    return {
                        title: response.title,
                        category_id: response.category_id,
                        content: response.content
                    }
                }}
                    method={"patch"}
                    validationSchema={dataValidationSchema}
                    dataProvider={postDataProvider}
                    id={response.id}
                    redirect="/admin/posts"
                    toastTitle="Success"
                    toastDescription="Success Update Post" >
                    {
                        ({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting }: FormikProps<any>) => (
                            <form method="patch" onSubmit={handleSubmit}>
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
                                    error={errors.category_id && touched.category_id ? String(errors.category_id) : undefined} />
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

export async function getServerSideProps(context : GetServerSidePropsContext) {
    const nextProps = await protectUrl({
        context : context, 
        nextURL : "/admin/posts" + context.params?.id,
    })
    if(nextProps) {
        return nextProps;
    }
    const query = context.query;
    const params = context.params;
    const queryClient: QueryClient = await createQueryClient(postDataProvider, "getOne", params, query)
    return {
        props: {
            postResponse: dehydrate(queryClient)
        }
    }
}