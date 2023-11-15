import { Button } from "@chakra-ui/react";
import Link from "next/link";

export default function EndMenu() {
    return <>
        <Link href="login">
            <Button me="8px" colorScheme="blue">
                Login
            </Button>
        </Link>
        <Link href="register">
            <Button colorScheme="green">
                Register
            </Button>
        </Link>
    </>
}