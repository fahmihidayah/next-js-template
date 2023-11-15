import { Box, Button, Container, Flex, Heading, useToast } from "@chakra-ui/react";
import Link from "next/link";
import EndMenu from "./EndMenu";
import { authProvider, getUserWithToken } from "@/libs/auth/user";
import LoggedInEndMenu from "./LoggedInEndMenu";
import { UserWithToken } from "@/types/auth/user";
import { useEffect, useState } from "react";
import nookies, { parseCookies } from "nookies";
import {useAuth} from "@/hooks/useAuth";
import { useRouter } from "next/router";

export default function Navbar() {
    const {user, logoutAction} = useAuth();

    const route = useRouter();

    const toast = useToast();

    return <Box bg="white" borderBottom={1} borderColor={"gray.200"} borderStyle={"solid"}>
        <Container maxW="container.xl" p={2}>
            <Flex justifyContent="space-between">
                <Flex alignItems="center">
                    <Heading size="md" >Apps</Heading>
                </Flex>
                <Flex >
                    {!user && <EndMenu></EndMenu>}
                    {user && <LoggedInEndMenu action={() => {
                        logoutAction()
                        toast({
                            title : "Success",
                            description : "Success Logging out",
                            status : "success",
                            duration : 2000,
                            isClosable : true,
                            position : 'top'
                        })
                        route.push("/home")
                    }}></LoggedInEndMenu>}
                </Flex>
            </Flex>
        </Container>
    </Box>
}


