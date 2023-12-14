import AdminNavbar from "@/components/admin/sidebar/AdminNavbar";
import AuthForm from "@/components/auth/AuthForm";
import Navbar from "@/components/navbar/Navbar";
import { authProvider } from "@/libs/provider/auth";
import { Box, Card, CardBody, Flex, Text } from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { AppProps } from "next/app";
import { useSearchParams } from "next/navigation";


export default function LoginPage(props : any) {
    
        return <>
        <Navbar ></Navbar>
        <Flex justify="center" m={{
            base: "10vh",
            md: "10vh",
            lg: "10vh",
            sm: "10vh"
        }}>
            <Box w={{
                base: "100%",
                md: "50%",
                lg: "40%",
                sm: "100%"

            }}>
                <Card boxShadow="2xl" rounded="lg">
                    <CardBody>
                        <Text fontSize="2xl" mb="20px" w={"100%"} textAlign="center" fontWeight="bold" >Login</Text>
                        <AuthForm></AuthForm>
                    </CardBody>
                </Card>
            </Box>
        </Flex>
    </>
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
    const auth = await authProvider.getIdentity(context);
  
    if (auth) {
      return {
        props: {},
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  
    return {
      props: {},
    };
  };