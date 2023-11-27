import { Button, Flex } from "@chakra-ui/react";
import Link from "next/link";

export default function EndMenu() {
    return <>
        <Flex  pt={2} pb={2}>
        <Link href="login">
            <Button me="8px" size={"sm"} colorScheme="blue">
                Login
            </Button>
        </Link>
        <Link href="register">
            <Button colorScheme="green" size={"sm"}>
                Register
            </Button>
        </Link>
        </Flex>
    </>
}