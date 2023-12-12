'use client'
import { Box, Button, Container, Flex, Heading, useDisclosure, useToast } from "@chakra-ui/react";
import Link from "next/link";
import EndMenu from "./EndMenu";
import { authProvider, getUserWithToken } from "@/libs/provider/auth";
import LoggedInEndMenu from "./LoggedInEndMenu";
import { UserWithToken } from "@/types/auth/user";
import { useEffect, useState } from "react";
import nookies, { parseCookies } from "nookies";
import {useAuth} from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { EndMenuWithUser } from "../admin/sidebar/AdminNavbar";

export default function Navbar() {
    const {user, logoutAction} = useAuth();

    const { isOpen, onOpen: onOpenDisclosure, onClose: onCloseDisclosure } = useDisclosure()
    const route = useRouter();

    const toast = useToast();

    return <Box bg="white" borderBottom={1} borderColor={"gray.200"} borderStyle={"solid"}>
        <Container maxW="container.xl">
            <Flex justifyContent="space-between">
                <Flex alignItems="center">
                    <Heading size="md" >Apps</Heading>
                </Flex>
                {!user && <EndMenu></EndMenu>}
                    {user && <EndMenuWithUser></EndMenuWithUser>}
            </Flex>
        </Container>
    </Box>
}


