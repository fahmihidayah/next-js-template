import { Flex, Heading } from "@chakra-ui/react";
import React from "react";

export interface ErrorProps {
    error?: string;
    statusCode?: number;
}

export default function ErrorContent({ error, statusCode }: ErrorProps) {
    return <>
        <Flex justifyContent={"center"} alignItems={"center"} height={"300"} flexDirection={"column"}>
            <Heading size={"lg"}>{statusCode}</Heading>
            <Heading size={"md"}>{error}</Heading>
        </Flex>

    </>
}